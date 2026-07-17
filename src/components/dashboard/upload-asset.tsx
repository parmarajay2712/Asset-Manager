"use client";

import { Plus, Upload, Loader2, AlertCircle, X, Image as ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { uploadAssetAction } from "@/actions/dashboard-actions";
import { toast } from "sonner";
import { Alert, AlertDescription } from "../ui/alert";

type Category = {
  id: number;
  name: string;
  createdAt: Date;
};

type FormState = {
  title: string;
  description: string;
  categoryId: string;
  file: File | null;
};

type CloudinarySignature = {
  signature: string;
  timestamp: number;
  apiKey: string;
  folder: string;
};

interface UploadDialogProps {
  categories: Category[];
}

function UploadAsset({ categories }: UploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgressStatus, setUploadProgressStatus] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>({
    title: "",
    description: "",
    categoryId: "",
    file: null,
  });

  const hasCategories = categories && categories.length > 0;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      if (error.code === "file-too-large") {
        toast.error("File is too large. Max size is 10MB.");
      } else if (error.code === "file-invalid-type") {
        toast.error("Invalid file type. Only JPG, PNG, WEBP, and GIF are allowed.");
      } else {
        toast.error(error.message);
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFormState((prev) => ({ ...prev, file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/gif': ['.gif']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    disabled: !hasCategories || isUploading,
  });

  const handleClearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormState((prev) => ({ ...prev, file: null }));
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormState((prev) => ({ ...prev, categoryId: value }));
  };



  async function getCloudinarySignature(): Promise<CloudinarySignature> {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const response = await fetch("/api/cloudinary/signature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timestamp }),
    });

    if (!response.ok) {
      throw new Error("Failed to create cloudinary signature");
    }

    return response.json();
  }

  const handleAssetUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUploading(true);
    setUploadProgressStatus(0);
    setUploadError(null);
    try {
      const { signature, apiKey, timestamp, folder } =
        await getCloudinarySignature();

      const cloudinaryData = new FormData();
      cloudinaryData.append("file", formState.file as File);
      cloudinaryData.append("api_key", apiKey);
      cloudinaryData.append("timestamp", timestamp.toString());
      cloudinaryData.append("signature", signature);
      cloudinaryData.append("folder", folder);

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgressStatus(progress);
        }
      };

      const cloudinaryPromise = new Promise<{
        secure_url: string;
      }>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } else {
            reject(new Error("Upload to cloudinary failed"));
          }
        };

        xhr.onerror = () => reject(new Error("Upload to cloudinary failed"));
      });

      xhr.send(cloudinaryData);

      const cloudinaryResponse = await cloudinaryPromise;

      const formData = new FormData();
      formData.append("title", formState.title);
      formData.append("description", formState.description);
      formData.append("categoryId", formState.categoryId);
      formData.append("fileUrl", cloudinaryResponse.secure_url);
      formData.append("thumbnailUrl", cloudinaryResponse.secure_url);

      const result = await uploadAssetAction(formData);
      if (result.success) {
        setOpen(false);
        setFormState({
          title: "",
          description: "",
          categoryId: "",
          file: null,
        });
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        toast.success("Asset uploaded successfully! It will be reviewed by an admin.");
      } else {
        setUploadError(result.error || "Upload failed. Please try again.");
        toast.error(result.error || "Failed to upload asset");
      }
    } catch (e) {
      console.error("Upload error:", e);
      const errorMessage = "Upload failed. Please try again.";
      setUploadError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
      setUploadProgressStatus(0);
    }
  };



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white hover:bg-white/90 text-black font-semibold rounded-full px-6 transition-transform active:scale-95 shadow-lg shadow-white/5">
          <Plus className="mr-2 w-4 h-4" />
          Upload Asset
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-[#111]/80 backdrop-blur-3xl border border-white/10 shadow-2xl p-0 text-white gap-0 rounded-2xl">
        <DialogHeader className="p-6 pb-2 border-b border-white/5">
          <DialogTitle className="text-xl font-bold tracking-tight text-white">Upload New Asset</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          {!hasCategories && (
            <Alert variant="destructive" className="mb-4 bg-red-500/10 border-red-500/20 text-red-400">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No categories have been created yet. An admin needs to create at least one category before you can upload assets.
              </AlertDescription>
            </Alert>
          )}

          <form id="upload-form" onSubmit={handleAssetUpload} className="space-y-6">
            <div className="space-y-4">
              {/* Asset Dropzone */}
              <div className="space-y-2">
                <Label className="text-white/70">Asset File</Label>
                {!formState.file ? (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl h-48 flex items-center justify-center text-center cursor-pointer transition-all duration-300
                      ${!hasCategories ? "opacity-50 cursor-not-allowed bg-[#0a0a0a]" : ""}
                      ${isDragActive ? "border-white bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-[1.02]" : "border-white/20 bg-black/50 hover:border-white/50"}
                    `}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center justify-center space-y-3 text-white/50">
                      <div className="p-3 bg-white/5 rounded-full border border-white/10 group-hover:bg-white/10 transition-colors">
                        <Upload className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-sm font-medium">
                        <span className="text-white">Click to upload</span> or drag and drop
                      </div>
                      <p className="text-xs text-white/30">
                        JPG, PNG, WEBP, or GIF (max. 10MB)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative border border-white/10 rounded-xl overflow-hidden bg-black/50 group h-48">
                    <div className="p-2 absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 rounded-full shadow-lg bg-red-500/80 hover:bg-red-500 backdrop-blur-md border border-white/20"
                        onClick={handleClearFile}
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {previewUrl && (
                      <div className="relative h-full w-full flex items-center justify-center bg-black/50">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/80 backdrop-blur-md border-t border-white/10 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded text-white border border-white/5">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {formState.file.name}
                        </p>
                        <p className="text-xs text-white/50">
                          {(formState.file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-white/70">Title</Label>
                <Input
                  value={formState.title}
                  onChange={handleInputChange}
                  id="title"
                  name="title"
                  placeholder="E.g., Dark Mode Dashboard UI"
                  required
                  disabled={!hasCategories || isUploading}
                  className="bg-black/50 border-white/10 text-white placeholder:text-white/30 focus:border-white/50 focus:ring-1 focus:ring-white/50 rounded-lg h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-white/70">Category</Label>
                <Select
                  onValueChange={handleCategoryChange}
                  value={formState.categoryId}
                  disabled={!hasCategories || isUploading}
                  required
                >
                  <SelectTrigger className="bg-black/50 border-white/10 text-white focus:border-white/50 focus:ring-1 focus:ring-white/50 rounded-lg h-11">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111] border-[#1f1f1f] text-white">
                    {hasCategories ? (
                      categories.map((c) => (
                         <SelectItem key={c.id} value={c.id.toString()} className="focus:bg-white/10 focus:text-white cursor-pointer">
                          {c.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-sm text-white/50 text-center">
                        No categories available
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white/70">Description (Optional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide details about the asset..."
                  value={formState.description}
                  onChange={handleInputChange}
                  disabled={!hasCategories || isUploading}
                  className="bg-black/50 border-white/10 text-white placeholder:text-white/30 focus:border-white/50 focus:ring-1 focus:ring-white/50 rounded-lg resize-none min-h-[100px]"
                />
              </div>

              {uploadError && (
                <p className="text-red-400 text-sm">{uploadError}</p>
              )}
            </div>
          </form>
        </div>

        {/* Progress Bar (Thin line at bottom of modal) */}
        <div className="relative h-1 w-full bg-white/5">
          {isUploading && uploadProgressStatus > 0 && (
            <div
              className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              style={{ width: `${uploadProgressStatus}%` }}
            />
          )}
        </div>

        <DialogFooter className="p-6 pt-4 border-t border-white/5 bg-black/20">
          <Button 
            type="submit" 
            form="upload-form"
            disabled={isUploading || !hasCategories}
            className="w-full bg-white text-black hover:bg-white/90 h-11 rounded-lg font-semibold transition-transform active:scale-[0.98]"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Uploading... {uploadProgressStatus}%
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Publish Asset
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadAsset;
