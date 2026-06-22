"use server";

import { db } from "@/lib/db";
import { asset, category, user } from "@/lib/db/schema";
import { count, desc, eq, sql } from "drizzle-orm";

export async function getDashboardMetrics() {
  const [totalAssets] = await db.select({ count: count() }).from(asset);
  const [totalUsers] = await db.select({ count: count() }).from(user);
  const [pendingApprovals] = await db
    .select({ count: count() })
    .from(asset)
    .where(eq(asset.isApproved, "pending"));
  const [approvedAssets] = await db
    .select({ count: count() })
    .from(asset)
    .where(eq(asset.isApproved, "approved"));

  return {
    totalAssets: totalAssets.count,
    totalUsers: totalUsers.count,
    pendingApprovals: pendingApprovals.count,
    approvedAssets: approvedAssets.count,
  };
}

export async function getUploadsPerDay() {
  const result = await db
    .select({
      date: sql<string>`to_char(DATE_TRUNC('day', ${asset.createdAt}), 'YYYY-MM-DD')`,
      count: sql<number>`count(*)::int`,
    })
    .from(asset)
    .where(sql`${asset.createdAt} >= NOW() - INTERVAL '30 days'`)
    .groupBy(sql`DATE_TRUNC('day', ${asset.createdAt})`)
    .orderBy(sql`DATE_TRUNC('day', ${asset.createdAt}) ASC`);

  return result;
}

export async function getAssetsByCategory() {
  const result = await db
    .select({
      name: category.name,
      value: sql<number>`count(${asset.id})::int`,
    })
    .from(asset)
    .innerJoin(category, eq(asset.categoryId, category.id))
    .groupBy(category.name);

  return result;
}

export async function getApprovalBreakdown() {
  const result = await db
    .select({
      name: asset.isApproved,
      value: sql<number>`count(*)::int`,
    })
    .from(asset)
    .groupBy(asset.isApproved);

  return result;
}

export async function getRecentActivity() {
  const result = await db
    .select({
      id: asset.id,
      title: asset.title,
      status: asset.isApproved,
      createdAt: asset.createdAt,
      userName: user.name,
    })
    .from(asset)
    .innerJoin(user, eq(asset.userId, user.id))
    .orderBy(desc(asset.createdAt))
    .limit(10);

  return result;
}
