import {
  getAllCategoriesAction,
  getTotalAssetsCountAction,
  getTotalUsersCountAction,
} from "@/actions/admin-actions";
import CategoryManager from "@/components/admin/category-manager";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, FileImage } from "lucide-react";

async function SettingsPage() {
  const [categories, userCount, assetsCount] = await Promise.all([
    getAllCategoriesAction(),
    getTotalUsersCountAction(),
    getTotalAssetsCountAction(),
  ]);

  return (
    <div className="container py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Platform Settings</h1>
        <p className="text-white/50 mt-2">Manage categories and view high-level platform statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-[#111] border-[#1f1f1f]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium text-white/70">
              <Users className="mr-2 h-4 w-4 text-white/40" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{userCount}</p>
            <p className="text-xs text-white/40 mt-1">All registered accounts</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#111] border-[#1f1f1f]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium text-white/70">
              <FileImage className="mr-2 h-4 w-4 text-white/40" />
              Total Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{assetsCount}</p>
            <p className="text-xs text-white/40 mt-1">All uploaded assets</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#111] border-[#1f1f1f]">
        <CardHeader className="border-b border-white/5 pb-6">
          <CardTitle className="text-xl text-white">Category Management</CardTitle>
          <CardDescription className="text-white/50">
            Create, edit, or delete the categories that creators can assign to their assets.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <CategoryManager categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}

export default SettingsPage;
