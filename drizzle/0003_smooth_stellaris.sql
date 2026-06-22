ALTER TABLE "invoice" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "payment" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "purchase" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "invoice" CASCADE;--> statement-breakpoint
DROP TABLE "payment" CASCADE;--> statement-breakpoint
DROP TABLE "purchase" CASCADE;--> statement-breakpoint
CREATE INDEX "asset_is_approved_idx" ON "asset" USING btree ("is_approved");--> statement-breakpoint
CREATE INDEX "asset_user_id_idx" ON "asset" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "asset_category_id_idx" ON "asset" USING btree ("category_id");