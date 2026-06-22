"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { asset, category, user } from "@/lib/db/schema";
import { and, eq, sql, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

const AssetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  categoryId: z.number().positive("Please select a category"),
  fileUrl: z.string().url("Invalid file url"),
  thumbnailUrl: z.string().url("Invalid file url").optional(),
});

export async function getCategoriesAction() {
  try {
    return db.select().from(category);
  } catch (e) {
    console.error("Failed to fetch categories:", e);
    return [];
  }
}

export async function uploadAssetAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("You must be logged in to upload asset");
  }

  try {
    const validateFields = AssetSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      categoryId: Number(formData.get("categoryId")),
      fileUrl: formData.get("fileUrl"),
      thumbnailUrl: formData.get("thumbnailUrl") || formData.get("fileUrl"),
    });

    await db.insert(asset).values({
      title: validateFields.title,
      description: validateFields.description,
      fileUrl: validateFields.fileUrl,
      thumbnailUrl: validateFields.thumbnailUrl,
      isApproved: "pending",
      userId: session.user.id,
      categoryId: validateFields.categoryId,
    });

    revalidatePath("/dashboard/assets");
    return {
      success: true,
    };
  } catch (e) {
    console.error("Failed to upload asset:", e);
    return {
      success: false,
      error: "Failed to upload asset",
    };
  }
}

export async function getUserAssetsAction(userId: string) {
  try {
    return await db
      .select()
      .from(asset)
      .where(eq(asset.userId, userId))
      .orderBy(asset.createdAt);
  } catch (e) {
    console.error("Failed to fetch user assets:", e);
    return [];
  }
}

export async function getPublicAssetsAction(
  categoryId?: number,
  page = 1,
  limit = 12,
  sort: "recent" | "popular" = "recent"
) {
  try {
    const offset = (page - 1) * limit;

    let conditions = and(eq(asset.isApproved, "approved"));

    if (categoryId) {
      conditions = and(conditions, eq(asset.categoryId, categoryId));
    }

    const query = db
      .select({
        asset: asset,
        categoryName: category.name,
        userName: user.name,
      })
      .from(asset)
      .leftJoin(category, eq(asset.categoryId, category.id))
      .leftJoin(user, eq(asset.userId, user.id))
      .where(conditions)
      .limit(limit)
      .offset(offset);

    if (sort === "popular") {
      return await query.orderBy(desc(asset.viewCount));
    } else {
      return await query.orderBy(desc(asset.createdAt));
    }
  } catch (e) {
    console.error("Failed to fetch public assets:", e);
    return [];
  }
}

export async function getPublicAssetsCountAction(categoryId?: number) {
  try {
    let conditions = and(eq(asset.isApproved, "approved"));

    if (categoryId) {
      conditions = and(conditions, eq(asset.categoryId, categoryId));
    }

    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(asset)
      .where(conditions);

    return result[0]?.count || 0;
  } catch (e) {
    console.error("Failed to count public assets:", e);
    return 0;
  }
}

export async function getAssetByIdAction(assetId: string) {
  try {
    const [result] = await db
      .select({
        asset: asset,
        categoryName: category.name,
        userName: user.name,
        userImage: user.image,
        userId: user.id,
      })
      .from(asset)
      .leftJoin(category, eq(asset.categoryId, category.id))
      .leftJoin(user, eq(asset.userId, user.id))
      .where(eq(asset.id, assetId));

    return result;
  } catch (e) {
    console.error("Failed to fetch asset:", e);
    return null;
  }
}

export async function getCreatorProfileAction(userId: string) {
  try {
    const [creatorInfo] = await db
      .select({ name: user.name, image: user.image })
      .from(user)
      .where(eq(user.id, userId));

    if (!creatorInfo) return null;

    const approvedAssets = await db
      .select({
        asset: asset,
        categoryName: category.name,
        userName: user.name,
      })
      .from(asset)
      .leftJoin(category, eq(asset.categoryId, category.id))
      .innerJoin(user, eq(asset.userId, user.id))
      .where(and(eq(asset.userId, userId), eq(asset.isApproved, "approved")))
      .orderBy(desc(asset.createdAt));

    return {
      creator: creatorInfo,
      assets: approvedAssets,
    };
  } catch (e) {
    console.error("Failed to fetch creator profile:", e);
    return null;
  }
}

export async function incrementViewCountAction(assetId: string) {
  try {
    await db
      .update(asset)
      .set({ viewCount: sql`${asset.viewCount} + 1` })
      .where(eq(asset.id, assetId));
  } catch (e) {
    console.error("Failed to increment view count:", e);
  }
}

export async function getTrendingAssetsAction() {
  try {
    return await db
      .select({
        asset: asset,
        categoryName: category.name,
        userName: user.name,
      })
      .from(asset)
      .leftJoin(category, eq(asset.categoryId, category.id))
      .leftJoin(user, eq(asset.userId, user.id))
      .where(eq(asset.isApproved, "approved"))
      .orderBy(desc(asset.viewCount))
      .limit(6);
  } catch (e) {
    console.error("Failed to fetch trending assets:", e);
    return [];
  }
}
