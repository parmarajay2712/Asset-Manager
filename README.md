![header](https://capsule-render.vercel.app/api?type=waving&color=0:0a0a0a,50:1a1a1a,100:111111&height=220&section=header&text=Asset%20Manager&fontSize=60&fontColor=ffffff&fontAlignY=38&desc=Digital%20Asset%20Management%20Platform%20for%20Creators%20and%20Admins&descAlignY=58&descSize=18&animation=fadeIn)

<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=A78BFA&center=true&vCenter=true&width=650&lines=Google+OAuth+Sign-In;Drag+and+Drop+Upload;Admin+Approval+Workflow;Public+Gallery+with+Trending;Server+Actions+No+REST+APIs)](https://git.io/typing-svg)

<br/>

![Next.js](https://img.shields.io/badge/Next.js-15.1.8-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

![Drizzle](https://img.shields.io/badge/Drizzle_ORM-0.43.1-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![better-auth](https://img.shields.io/badge/better--auth-1.2.8-000000?style=for-the-badge)
![Cloudinary](https://img.shields.io/badge/Cloudinary-2.6.1-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-A78BFA?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-22c55e?style=for-the-badge)
![PRs](https://img.shields.io/badge/PRs-Welcome-F97316?style=for-the-badge)

<br/>

**[Live Demo](#-live-demo)** &nbsp;·&nbsp; **[API Reference](#-api-routes--server-actions)** &nbsp;·&nbsp; **[Report Bug](https://github.com/parmarajay2712/asset-manager/issues)** &nbsp;·&nbsp; **[Request Feature](https://github.com/parmarajay2712/asset-manager/issues)**

</div>

---

## Table of Contents

| # | Section |
|---|---------|
| 1 | [Overview](#overview) |
| 2 | [Screenshots](#screenshots) |
| 3 | [Features](#features) |
| 4 | [Tech Stack](#tech-stack) |
| 5 | [How It Works](#how-it-works) |
| 6 | [Project Structure](#project-structure) |
| 7 | [Getting Started](#getting-started) |
| 8 | [Environment Variables](#environment-variables) |
| 9 | [Database Schema](#database-schema) |
| 10 | [Authentication and Roles](#authentication-and-roles) |
| 11 | [API Routes and Server Actions](#api-routes-and-server-actions) |
| 12 | [Design System](#design-system) |
| 13 | [Deployment](#deployment) |
| 14 | [Roadmap](#roadmap) |
| 15 | [Contributing](#contributing) |
| 16 | [License](#license) |

---

## Screenshots

<div align="center">

**Landing Page**

![Landing Page](./Screen%20Shot/Landing%20page.png)

<br/>

**Public Gallery**

![Gallery](./Screen%20Shot/Public%20Gallery.png)

<br/>

**Admin Analytics Dashboard**

![Admin Dashboard](./Screen%20Shot/Admin%20Analytics%20Dashboard.png)

<br/>

| Upload Flow | Asset Detail Page |
|:-:|:-:|
| ![Upload Flow](./Screen%20Shot/Upload%20Flow.png) | ![Asset Detail](./Screen%20Shot/Asset%20Detail%20Page.png) |
| Creator Profile | Approval Queue |
| ![Creator Profile](./Screen%20Shot/Creator%20Profile.png) | ![Approval Queue](./Screen%20Shot/Approval%20Queue.png) |

</div>

---

## Overview

<div align="center">

```
================================================================================
   Asset Manager is a full-stack digital asset management system
   built with Next.js 15, React Server Components, and Server Actions.

   - Google OAuth sign-in with role-based access control
   - Admin approval pipeline before assets go public
   - Signed Cloudinary uploads - direct browser-to-CDN
   - Zero REST API boilerplate - Server Actions for every mutation
================================================================================
```

</div>

> **A full-stack digital asset management platform for creators and administrators.** Users sign in with Google, upload images through an admin approval queue, and once approved, those assets appear in a public gallery where anyone can browse, filter, and download them for free.

### Why This Project?

| Common Pain Points | Asset Manager |
|:----------------------|:-----------------|
| Unmoderated uploads flood the platform | Admin approval queue - pending to approved/rejected |
| REST API boilerplate for every mutation | Server Actions handle all data mutations natively |
| Files routed through your own server | Signed Cloudinary uploads - direct browser-to-CDN |
| No visibility into platform health | Full analytics dashboard with Recharts |
| Filters lost on page refresh | URL searchParams - every filter is shareable and bookmarkable |
| Generic light-mode dashboards | Forced dark mode, glassmorphism, Linear/Vercel-inspired design |

### Built For

```
Creators who want to upload, organize, and share digital assets
Administrators who moderate content and manage categories
Developers learning Next.js 15 App Router with Server Actions
Teams building internal or public asset/media libraries
```

---

## Features

<details open>
<summary><h3>User-Facing Features</h3></summary>

| Feature | Where | How It Works |
|---------|-------|---------------|
| **Google OAuth Sign-In** | `/login` | One-click Google login via better-auth |
| **Drag & Drop Upload** | `/dashboard/assets` | react-dropzone zone - validates type (JPG/PNG/WEBP/GIF) and size (<=10MB), instant preview |
| **Upload Progress Bar** | Upload modal | Tracks XHR upload progress directly to Cloudinary |
| **My Assets Dashboard** | `/dashboard/assets` | Grid of all uploads with status badges (Pending/Approved/Rejected) |
| **Public Gallery** | `/gallery` | Masonry grid of approved assets with hover overlays (creator, views, category) |
| **Category Filter Tabs** | `/gallery?category=X` | Vercel-style tab bar filters assets by category |
| **Sort (Recent/Popular)** | `/gallery?sort=popular` | Dropdown sorts by createdAt or viewCount |
| **Trending Section** | `/gallery` (no filter) | Horizontal scroll row of top 6 most-viewed assets |
| **Asset Detail Page** | `/gallery/[id]` | Editorial layout - blurred background, high-res image, description, view count, download |
| **View Tracking** | `/gallery/[id]` | Each page load increments viewCount (fire-and-forget server action) |
| **Formatted View Counts** | Detail + gallery | 1234 -> 1.2k, 1234567 -> 1.2m via formatViewCount() |
| **Free Download** | `/gallery/[id]` | Cloudinary's fl_attachment transformation forces browser download |
| **Creator Profile** | `/creator/[userId]` | Creator name, avatar, total approved assets, total views, masonry grid |
| **Session-Aware Landing** | `/` | "Go to Dashboard" if signed in, "Sign in with Google" if not |

</details>

<details>
<summary><h3>Admin-Only Features</h3></summary>

| Feature | Where | How It Works |
|---------|-------|---------------|
| **Analytics Dashboard** | `/admin` | 4 metric cards + 3 Recharts charts + recent activity table |
| **Metric Cards** | `/admin` | Total Assets, Total Users, Pending Approvals, Approved Assets |
| **Uploads Per Day Chart** | `/admin` | Bar chart - daily uploads for the last 30 days |
| **Assets by Category Chart** | `/admin` | Pie chart showing category distribution |
| **Approval Breakdown Chart** | `/admin` | Horizontal bar chart - Approved vs Rejected vs Pending |
| **Recent Activity Table** | `/admin` | Last 10 uploads - title, uploader, date, status badge |
| **Approval Queue** | `/admin/asset-approval` | Cards with image preview + Approve/Reject buttons |
| **Category Management** | `/admin/settings` | Create categories (Zod validation, duplicate check), delete existing |
| **Platform Stats** | `/admin/settings` | Total Users and Total Assets counts |

</details>

<details>
<summary><h3>Technical Features</h3></summary>

| Feature | Implementation |
|---------|-----------------|
| **Server Components** | All pages are RSC by default - data fetching happens server-side |
| **Server Actions** | All mutations (uploadAssetAction, approveAssetAction, etc.) are "use server" - zero REST boilerplate |
| **Signed Uploads** | Server generates a Cloudinary signature, client uploads directly to the CDN |
| **Middleware Auth** | middleware.ts checks for a better-auth session cookie on /dashboard/* and /admin/* |
| **Role-Based Layouts** | Admin layout enforces role === "admin"; user layout redirects admins to /admin/asset-approval |
| **URL State Management** | Gallery filters, pagination, and sort all live in searchParams - shareable and bookmarkable |
| **Zod Validation** | Asset uploads and category creation validated with Zod schemas |
| **Database Indexes** | asset table indexed on isApproved, userId, and categoryId |
| **Turbopack** | Dev server runs with --turbopack for fast rebuilds |
| **Forced Dark Mode** | html className="dark" + dark design tokens in globals.css |

</details>

---

## Tech Stack

<div align="center">

### Framework and Language
![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

### Database and ORM
![PostgreSQL](https://img.shields.io/badge/Neon_PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat-square&logo=drizzle&logoColor=black)

### Auth and Storage
![better-auth](https://img.shields.io/badge/better--auth-000000?style=flat-square)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)

### UI and Styling
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=flat-square&logo=radixui)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer)

### Forms and Data
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square)
![Recharts](https://img.shields.io/badge/Recharts-FF4154?style=flat-square)
![react-dropzone](https://img.shields.io/badge/react--dropzone-4ADE80?style=flat-square)

</div>

| Category | Package | Version | Purpose |
|----------|---------|---------|---------|
| **Framework** | next | 15.1.8 | App Router, RSC, Server Actions, Turbopack |
| | react / react-dom | ^19.0.0 | UI and DOM rendering |
| | typescript | ^5 | Type-safe development |
| **Database** | drizzle-orm | ^0.43.1 | Type-safe ORM for PostgreSQL |
| | drizzle-kit | ^0.31.1 | Schema migrations, drizzle-kit push |
| | pg | ^8.16.0 | PostgreSQL client (node-postgres) |
| **Auth** | better-auth | ^1.2.8 | Google OAuth, sessions, role-based access |
| **Storage** | cloudinary | ^2.6.1 | Server-side SDK - signature generation |
| **Styling** | tailwindcss | ^3.4.1 | Utility-first CSS |
| | tailwindcss-animate | ^1.0.7 | Animation utilities for shadcn/ui |
| **UI Primitives** | @radix-ui/react-avatar | ^1.1.10 | Avatar primitive |
| | @radix-ui/react-dialog | ^1.1.17 | Dialog/modal (Sheet, Upload modal) |
| | @radix-ui/react-dropdown-menu | ^2.1.15 | Dropdown menu |
| | @radix-ui/react-select | ^2.2.5 | Select dropdown |
| | @radix-ui/react-switch | ^1.2.5 | Toggle switch |
| **Utilities** | class-variance-authority | ^0.7.1 | shadcn/ui component variants |
| | clsx / tailwind-merge | latest | Conditional and merged classnames |
| **Animation** | framer-motion | ^12.40.0 | Landing page animations |
| **Charts** | recharts | ^3.8.1 | Admin analytics (Bar, Pie) |
| **Upload UX** | react-dropzone | ^15.0.0 | Drag-and-drop file zone |
| **Validation** | zod | ^3.25.42 | Runtime schema validation |
| **Misc** | date-fns | ^4.1.0 | Relative time formatting |
| | sonner | ^2.0.3 | Toast notifications |
| | lucide-react | ^0.511.0 | Icon library |
| | uuid | ^11.1.0 | Asset ID generation |

---

## How It Works

### System Architecture

```
                    +-------------------------------+
                    |       Client Browser           |
                    |  Next.js 15 App Router - RSC   |
                    +---------------+-----------------+
                                    |
                +-------------------v-------------------+
                |       Next.js Server (Vercel)          |
                |  Server Components - Server Actions    |
                |     Middleware - better-auth            |
                +------+--------------------+-------------+
                       |                    |
        +--------------v--+      +----------v-------------+
        |  Neon PostgreSQL |      |   Cloudinary CDN        |
        |   (via Drizzle)  |      |  Signed direct uploads  |
        |  user, session   |      |  Images, Transforms     |
        |  asset, category |      +-------------------------+
        +------------------+
```

### Upload Flow

```
  +----------+    +----------------+    +------------------+    +-----------+
  |  User    |--->|  Drag and drop |--->|  Request signed  |--->|  Direct   |
  |  signs   |    |  + validate    |    |  Cloudinary       |    |  upload   |
  |  in      |    |  file locally  |    |  signature        |    |  to CDN   |
  +----------+    +----------------+    +------------------+    +-----+-----+
                                                                       |
                  +-----------------------------------------------------v----+
                  |  uploadAssetAction() -> insert asset, isApproved="pending"|
                  +-------------------------------------------------------------+
```

### Approval Flow

```
  Admin opens /admin/asset-approval
      |
      v
  getPendingAssetsAction() - SELECT WHERE is_approved = 'pending'
      |
      +--> Approve  -->  UPDATE is_approved = 'approved' --> visible in /gallery
      |
      +--> Reject   -->  UPDATE is_approved = 'rejected' --> hidden from gallery
```

### Authentication Flow

```
  User clicks "Continue with Google"
      |
      v
  signIn.social({ provider: "google" }) - better-auth client
      |
      v
  Google OAuth consent -> redirect to /api/auth/[...all] callback
      |
      v
  better-auth creates/updates user, account, session records
      |
      +--> New user -> role: "user" (default)
      |
      +--> Session cookie set in browser
                |
                v
           Middleware checks cookie on /dashboard/* and /admin/*
                |
                v
           Layout-level + Server Action-level role checks enforce access
```

---

## Project Structure

```
asset-manager/
|-- drizzle/                        # Generated migration files
|-- drizzle.config.ts               # Drizzle Kit config (schema path, DB URL)
|-- next.config.ts                  # Whitelists res.cloudinary.com for next/image
|-- package.json
|-- tailwind.config.ts
|-- tsconfig.json
|-- .env                            # Not committed
|-- .env.example                    # Template for env vars
|
+-- src/
    |-- middleware.ts                # Route protection (auth cookie check)
    |
    |-- actions/                    # All Server Actions
    |   |-- admin-actions.ts        # Approve, reject, categories, counts
    |   |-- analytics-actions.ts    # Dashboard metrics + chart data
    |   +-- dashboard-actions.ts    # Upload, gallery queries, view tracking
    |
    |-- app/                        # Next.js App Router
    |   |-- layout.tsx              # Root layout - fonts, dark mode, Header
    |   |-- globals.css             # Dark mode tokens + glass utilities
    |   |-- page.tsx                # Landing page (Framer Motion hero)
    |   |
    |   |-- login/
    |   |   +-- page.tsx            # Google OAuth login page
    |   |
    |   |-- gallery/
    |   |   |-- page.tsx            # Public gallery - masonry, trending, filters
    |   |   +-- [id]/
    |   |       +-- page.tsx        # Asset detail - image, info, download
    |   |
    |   |-- creator/
    |   |   +-- [userId]/
    |   |       +-- page.tsx        # Creator profile page
    |   |
    |   |-- dashboard/
    |   |   |-- layout.tsx          # Auth guard -> SidebarLayout
    |   |   +-- assets/
    |   |       +-- page.tsx        # User's asset grid + upload modal
    |   |
    |   |-- admin/
    |   |   |-- layout.tsx          # Admin guard -> SidebarLayout
    |   |   |-- page.tsx            # Analytics dashboard
    |   |   |-- asset-approval/
    |   |   |   +-- page.tsx        # Approval queue
    |   |   +-- settings/
    |   |       +-- page.tsx        # Category management
    |   |
    |   +-- api/
    |       |-- auth/[...all]/
    |       |   +-- route.ts        # better-auth handler
    |       +-- cloudinary/signature/
    |           +-- route.ts        # Signed upload token
    |
    |-- components/
    |   |-- admin/
    |   |   |-- analytics-dashboard.tsx
    |   |   |-- asset-approval-client.tsx
    |   |   +-- category-manager.tsx
    |   |-- auth/
    |   |   +-- login-button.tsx
    |   |-- dashboard/
    |   |   |-- asset-grid.tsx
    |   |   +-- upload-asset.tsx
    |   |-- layout/
    |   |   |-- header.tsx          # Public header - glass, mobile Sheet
    |   |   +-- sidebar-layout.tsx  # Dashboard/admin sidebar
    |   +-- ui/                     # shadcn/ui primitives
    |
    +-- lib/
        |-- auth.ts                 # better-auth server config
        |-- auth-client.ts          # better-auth client hooks
        |-- utils.ts                # cn() + formatViewCount()
        +-- db/
            |-- index.ts            # pg Pool + drizzle() instance
            +-- schema.ts           # All table definitions + relations
```

---

## Getting Started

### Prerequisites

```bash
node        >= 18.0.0
npm / pnpm
PostgreSQL  - Neon (https://neon.tech) recommended, free tier
Cloudinary  - free tier account
Google Cloud Console project - for OAuth credentials
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/parmarajay2712/asset-manager.git
cd asset-manager

# 2. Install dependencies
npm install

# 3. Copy the environment variables template
cp .env.example .env
# Fill in your values - see Environment Variables section below

# 4. Push the database schema
npx drizzle-kit push

# 5. Start the development server (with Turbopack)
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev --turbopack` | Development server with Turbopack |
| `build` | `next build` | Production build |
| `start` | `next start` | Start production server |
| `lint` | `next lint` | ESLint check |

---

## Environment Variables

```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require

# Authentication (better-auth)
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Cloudinary (Server-side)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=asset-manager-uploads

# Cloudinary (Client-side)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

| Variable | Used In | Required | Purpose |
|----------|---------|:--------:|---------|
| `DATABASE_URL` | lib/db/index.ts, drizzle.config.ts | Yes | Neon PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | better-auth internal | Yes | Signs session tokens and cookies |
| `BETTER_AUTH_URL` | better-auth internal | Yes | Base URL for OAuth redirects |
| `GOOGLE_CLIENT_ID` | lib/auth.ts | Yes | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | lib/auth.ts | Yes | Google OAuth client secret |
| `CLOUDINARY_CLOUD_NAME` | api/cloudinary/signature/route.ts | Yes | Cloudinary cloud name (server SDK) |
| `CLOUDINARY_API_KEY` | signature route | Yes | Returned to client for upload |
| `CLOUDINARY_API_SECRET` | signature route | Yes | Used to generate upload signatures |
| `CLOUDINARY_FOLDER` | signature route | No | Upload destination folder (default: asset-manager-uploads) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | components/dashboard/upload-asset.tsx | Yes | Exposed to client for direct upload URL |

> **Never commit your `.env` file.** Use `.env.example` as the template only.

---

## Database Schema

All tables are defined in `src/lib/db/schema.ts` using Drizzle ORM.

<details open>
<summary><strong>user</strong></summary>

| Column | Type | Description |
|--------|------|-------------|
| `id` | text PK | Generated by better-auth |
| `name` | text NOT NULL | Display name from Google |
| `email` | text UNIQUE NOT NULL | Email from Google |
| `email_verified` | boolean | Verification status |
| `image` | text NULL | Google profile picture URL |
| `role` | text NULL | "user" or "admin" |
| `banned` | boolean NULL | Ban status |
| `ban_reason` | text NULL | Reason for ban |
| `ban_expires` | timestamp NULL | Ban expiry |
| `created_at` / `updated_at` | timestamp | Timestamps |

</details>

<details>
<summary><strong>session</strong></summary>

| Column | Type | Description |
|--------|------|-------------|
| `id` | text PK | Session ID |
| `token` | text UNIQUE | Session token (cookie) |
| `expires_at` | timestamp | Expiry |
| `ip_address` / `user_agent` | text NULL | Client info |
| `user_id` | text FK to user.id | Owner (CASCADE delete) |
| `impersonated_by` | text NULL | Admin impersonation |

</details>

<details>
<summary><strong>account</strong></summary>

| Column | Type | Description |
|--------|------|-------------|
| `id` | text PK | Account ID |
| `account_id` | text | Provider-specific account ID |
| `provider_id` | text | "google" |
| `user_id` | text FK to user.id | Owner (CASCADE delete) |
| `access_token` / `refresh_token` / `id_token` | text NULL | OAuth tokens |
| `scope` | text NULL | OAuth scopes |

</details>

<details>
<summary><strong>category</strong></summary>

| Column | Type | Description |
|--------|------|-------------|
| `id` | serial PK | Auto-incrementing ID |
| `name` | text UNIQUE NOT NULL | e.g. "Photography", "UI Kits" |
| `created_at` | timestamp | Creation date |

</details>

<details>
<summary><strong>asset</strong></summary>

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid PK | Random UUID |
| `title` | text NOT NULL | Asset title |
| `description` | text NULL | Asset description |
| `file_url` | text NOT NULL | Cloudinary URL |
| `thumbnail_url` | text NULL | Cloudinary thumbnail URL |
| `is_approved` | text enum | pending / approved / rejected (default: pending) |
| `user_id` | text FK to user.id | Uploader (CASCADE delete) |
| `category_id` | integer FK to category.id NULL | Category |
| `view_count` | integer NOT NULL default 0 | Detail page views |
| `created_at` / `updated_at` | timestamp | Timestamps |

**Indexes:** asset_is_approved_idx, asset_user_id_idx, asset_category_id_idx

</details>

### Relations

```
user      has many        sessions, accounts, assets
session   belongs to one   user
account   belongs to one   user
category  has many         assets
asset     belongs to one   user, belongs to one category
```

---

## Authentication and Roles

Authentication is handled by **better-auth** - configured in `lib/auth.ts` with a drizzleAdapter, the Google social provider, the admin plugin (adminRoles: ["admin"], defaultRole: "user"), and nextCookies().

### Roles

| Role | How Assigned | Access Level |
|------|---------------|--------------|
| `user` | Automatically on first Google sign-in | Upload, dashboard, gallery, download |
| `admin` | Manual SQL update | Everything above + full admin panel |

### Making a User an Admin

```sql
UPDATE "user" SET role = 'admin' WHERE email = 'your-email@gmail.com';
```

### Route Protection - 3 Layers

| Layer | File | Behavior |
|-------|------|----------|
| 1. Middleware | middleware.ts | No better-auth cookie on /dashboard/* or /admin/* -> redirect to / |
| 2. Layout checks | admin/layout.tsx, dashboard/layout.tsx | Server-side auth.api.getSession() + role enforcement |
| 3. Server Action checks | Every admin action | Calls auth.api.getSession(), verifies role === "admin" before executing |

### Session Reading

- **Server:** `auth.api.getSession({ headers: await headers() })`
- **Client:** `useSession()` hook from auth-client.ts

---

## API Routes and Server Actions

### REST API Routes

| Method | Endpoint | Auth | Description |
|:------:|----------|:----:|-------------|
| GET / POST | `/api/auth/[...all]` | No | better-auth catch-all - login, logout, session, OAuth callbacks |
| POST | `/api/cloudinary/signature` | Yes (User) | Generates signed Cloudinary upload token |

> All other data operations use **Next.js Server Actions** - no additional REST endpoints needed.

<details>
<summary><strong>Dashboard Actions (dashboard-actions.ts)</strong></summary>

| Action | Auth | Purpose |
|--------|:----:|---------|
| `uploadAssetAction` | User | Validates + inserts new asset with status pending |
| `getUserAssetsAction` | - | Fetches all assets for a given userId |
| `getCategoriesAction` | - | Fetches all categories for dropdowns |
| `getPublicAssetsAction` | - | Fetches approved assets with filters, sort, pagination |
| `getPublicAssetsCountAction` | - | Counts approved assets for pagination |
| `getAssetByIdAction` | - | Fetches single asset with JOINs to category and user |
| `getCreatorProfileAction` | - | Fetches user info + their approved assets |
| `incrementViewCountAction` | - | viewCount + 1 on asset (fire-and-forget) |
| `getTrendingAssetsAction` | - | Top 6 approved assets by viewCount |

</details>

<details>
<summary><strong>Admin Actions (admin-actions.ts)</strong></summary>

| Action | Auth | Purpose |
|--------|:----:|---------|
| `approveAssetAction` | Admin | Sets isApproved = "approved" |
| `rejectAssetAction` | Admin | Sets isApproved = "rejected" |
| `getPendingAssetsAction` | Admin | Fetches all pending assets with uploader name |
| `addNewCategoryAction` | Admin | Validates + inserts new category (checks duplicates) |
| `deleteCategoryAction` | Admin | Deletes category by ID |
| `getAllCategoriesAction` | Admin | Fetches all categories ordered by name |
| `getTotalUsersCountAction` | Admin | Total user count |
| `getTotalAssetsCountAction` | Admin | Total asset count |

</details>

<details>
<summary><strong>Analytics Actions (analytics-actions.ts)</strong></summary>

| Action | Purpose |
|--------|---------|
| `getDashboardMetrics` | Total assets, users, pending, approved counts |
| `getUploadsPerDay` | Uploads grouped by day for last 30 days |
| `getAssetsByCategory` | Asset count grouped by category |
| `getApprovalBreakdown` | Count by approval status |
| `getRecentActivity` | Last 10 uploads with user name |

</details>

---

## Design System

| Token | Value |
|-------|-------|
| Background | #0a0a0a (near black) |
| Surface cards | #111111 |
| Borders | #1f1f1f (subtle) |
| Primary accent | White |
| Muted text | white/50 (50% opacity) |
| Success | Emerald-500 |
| Error | Red-500 |
| Warning | Amber-500 |
| Font | Geist Sans + Geist Mono (via next/font/google) |

**Glassmorphism:** A `.glass` utility class in globals.css provides frosted overlays used in the upload modal and public header.

**Navigation architecture:** Public routes (/, /gallery, /creator/[userId]) use a glass-styled global Header with a mobile Sheet menu. Private routes (/dashboard/*, /admin/*) hide the header entirely and use a fixed SidebarLayout (desktop) or hamburger Sheet drawer (mobile), auto-detected via usePathname().

---

## Deployment

### Deploy to Vercel

1. Push your code to a GitHub repository
2. Import the project into Vercel
3. Add all environment variables in Vercel project settings
4. Update BETTER_AUTH_URL to your production URL
5. Update Google OAuth redirect URIs in Google Cloud Console for your production domain
6. Deploy - Vercel builds and deploys automatically

### Deployment Notes

- **Neon PostgreSQL** is serverless and integrates seamlessly with Vercel's edge functions
- **Cloudinary free tier**: 25GB storage, 25GB bandwidth/month
- Turbopack is used in development; production builds use standard webpack
- All images are served via Cloudinary's global CDN - next.config.ts whitelists res.cloudinary.com

---

## Roadmap

**Shipped**
- [x] Google OAuth authentication with role-based access
- [x] Drag-and-drop file upload with Cloudinary
- [x] Admin approval queue (approve/reject assets)
- [x] Public gallery with category filters and pagination
- [x] Sort by recent or popular (view count)
- [x] Trending section with top viewed assets
- [x] View count tracking on asset detail pages
- [x] Creator profile pages with approved assets
- [x] Admin analytics dashboard with Recharts
- [x] Category management (CRUD)
- [x] Responsive sidebar navigation with mobile sheet menu
- [x] Premium dark mode UI (Linear/Vercel inspired)
- [x] Framer Motion landing page animations

**Planned**
- [ ] Full-text search across asset titles and descriptions
- [ ] Bulk approve/reject in admin queue
- [ ] Asset tags (multiple tags per asset)
- [ ] User notifications on approval/rejection
- [ ] Asset collections / favorites
- [ ] Download count tracking
- [ ] Rate limiting on uploads and API routes
- [ ] Automated image moderation via Cloudinary AI
- [ ] Multi-file upload support
- [ ] Email notifications via Resend
- [ ] CI/CD pipeline with GitHub Actions

---

## Live Demo

[**Live Demo**](https://your-deployment-url.vercel.app)

Source code: [github.com/parmarajay2712/asset-manager](https://github.com/parmarajay2712/asset-manager)

---

## Contributing

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m "feat: add amazing feature"

# 4. Push and open a Pull Request
git push origin feature/amazing-feature
```

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js recommended rules
- Server Actions for all mutations - avoid creating REST endpoints
- Zod schemas for all form validation
- Drizzle ORM for all database queries - no raw SQL in application code

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for full terms.

---

![footer](https://capsule-render.vercel.app/api?type=waving&color=0:111111,50:1a1a1a,100:0a0a0a&height=120&section=footer)

<div align="center">

**Built with Next.js, TypeScript, and PostgreSQL**

[![GitHub](https://img.shields.io/badge/GitHub-parmarajay2712-181717?style=flat-square&logo=github)](https://github.com/parmarajay2712)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ajayparmar27-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/ajayparmar27)

<br/>

**Star this repo if it helped you - it means a lot!**

</div>