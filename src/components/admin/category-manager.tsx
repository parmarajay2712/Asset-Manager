"use client";

import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import {
  addNewCategoryAction,
  deleteCategoryAction,
  getAllCategoriesAction,
} from "@/actions/admin-actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { toast } from "sonner";

type Category = {
  id: number;
  name: string;
  createdAt: Date;
};

interface CategoryManagerProps {
  categories: Category[];
}

function CategoryManager({
  categories: initialCategories,
}: CategoryManagerProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchCategories = async () => {
    const fresh = await getAllCategoriesAction();
    setCategories(fresh);
  };

  const handleAddNewCategory = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsAdding(true);
    try {
      const formData = new FormData();
      formData.append("name", newCategoryName);
      const result = await addNewCategoryAction(formData);

      if (result.success) {
        setNewCategoryName("");
        await fetchCategories();
        toast.success(result.message || "Category added");
      } else {
        toast.error(result.message || "Failed to add category");
      }
    } catch (e) {
      console.error("Failed to add category:", e);
      toast.error("Failed to add category");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteCategory = async (currentCategoryIdToDelete: number) => {
    setDeletingId(currentCategoryIdToDelete);
    try {
      const result = await deleteCategoryAction(currentCategoryIdToDelete);

      if (result.success) {
        setCategories(
          categories.filter((c) => c.id !== currentCategoryIdToDelete)
        );
        toast.success(result.message || "Category deleted");
      } else {
        toast.error(result.message || "Failed to delete category");
      }
    } catch (e) {
      console.error("Failed to delete category:", e);
      toast.error("Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleAddNewCategory} className="space-y-4 bg-black/30 p-6 rounded-xl border border-white/5">
        <div className="space-y-3">
          <Label htmlFor="categoryName" className="text-white/70">New Category</Label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              id="categoryName"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g. Photography, UI Kits..."
              required
              minLength={2}
              maxLength={50}
              className="bg-black/50 border-white/10 text-white placeholder:text-white/30 h-11 focus:border-white/50 focus:ring-1 focus:ring-white/50 rounded-lg"
            />
            <Button
              type="submit"
              className="bg-white text-black hover:bg-white/90 h-11 px-6 rounded-lg font-semibold shrink-0"
              disabled={isAdding}
            >
              {isAdding ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Category
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
      
      <div>
        <h3 className="text-lg font-medium mb-4 text-white">Active Categories</h3>
        {categories.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-black/20">
            <p className="text-white/50">No categories added yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <Table>
              <TableHeader className="bg-black/50">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/50 h-12">Name</TableHead>
                  <TableHead className="text-white/50 h-12">Created</TableHead>
                  <TableHead className="w-[100px] text-white/50 text-right h-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium text-white">{category.name}</TableCell>
                    <TableCell className="text-white/50">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => handleDeleteCategory(category.id)}
                        variant="ghost"
                        size="icon"
                        disabled={deletingId === category.id}
                        className="text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg h-9 w-9"
                        title="Delete category"
                      >
                        {deletingId === category.id ? (
                          <Loader2 className="h-4 w-4 animate-spin text-white/30" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryManager;
