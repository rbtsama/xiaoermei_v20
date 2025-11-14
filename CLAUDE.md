# Remix + TypeScript ERP Project - Setup Guide

## Table of Contents

### Part 1: Project Setup
- [Overview](#overview)
- [Quick Setup](#quick-setup)
- [Configuration](#configuration)

### Part 2: Architecture
- [Core Principles](#core-principles)
- [Remix Routing](#remix-routing)
- [Module Structure](#module-structure)
- [Import Patterns](#import-patterns)

### Part 3: Building a Module
- [Development Order](#development-order)
- [Step-by-Step Guide](#step-by-step-guide)

### Quick Reference
- [Key Principles](#key-principles)
- [Remix Patterns](#remix-patterns)
- [Workflow](#workflow)
- [Folder Permission Rules](#folder-permission-rules)
- [Troubleshooting](#troubleshooting)
- [Standards](#standards)

---

## Overview

Build a complete Remix + TypeScript ERP application with modular architecture.

**Core Stack:**
- **Remix** (^2.15.0) + **Vite** - Full-stack React framework
- **TypeScript** (~5.6.0) - Type-safe development
- **shadcn/ui** + **Tailwind CSS** (^3.4.17) - UI components and styling
- **Utilities**: Day.js, Lodash, Lucide React (icons)

**⚠️ IMPORTANT: Remix v2 + Vite Integration**

Remix v2.15.0 uses **Vite as its bundler**. You MUST configure both:
- `tsconfig.json` - For TypeScript type checking
- `vite.config.ts` - For runtime module resolution (path aliases + routes)
- Missing Vite config = "Cannot find module" errors

---

# Part 1: Project Setup

## Quick Setup

```bash
# 1. Create project
npx create-remix@latest your-project-name
cd your-project-name

# 2. Install dependencies
npm install clsx tailwind-merge lucide-react dayjs lodash class-variance-authority
npm install -D tailwindcss postcss autoprefixer @types/node @types/lodash tailwindcss-animate

# 3. Initialize UI
npx tailwindcss init -p
npx shadcn@latest init  # Select: Default, Slate, CSS variables

# 4. Install common UI components
npx shadcn@latest add button card table input label select

# 5. Create folder structure
cd app && mkdir -p pages utils styles components layouts && cd ..
```

## Configuration

### 1. `vite.config.ts` (CRITICAL - Required for runtime)
```typescript
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "routes/_index.tsx", { index: true });
          route("/phone-management", "routes/phone-management/_index.tsx", { index: true });
          route("/phone-management/:phone", "routes/phone-management/$phone.tsx");
          // Add your module routes here
        });
      },
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
});
```

### 2. `tailwind.config.ts`
```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... add other colors as needed
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

### 3. `app/styles/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --radius: 0.5rem;
    /* Add other CSS variables as needed */
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* Add dark theme variables */
  }
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
}
```

### 4. `app/root.tsx`
```typescript
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import "./styles/globals.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
```

### 5. `app/lib/utils.ts`
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 6. Directory Structure
```
app/
├── routes/          ← ✅ YOU MODIFY: Your route files (nested by module)
├── pages/           ← ✅ YOU MODIFY: Your modules (all module code)
├── components/ui/   ← ⚠️  shadcn/ui ONLY: npx shadcn@latest add <name>
├── lib/utils.ts     ← ⚠️  UI utilities only (cn helper)
├── styles/          ← ⚠️  MODIFY IF NECESSARY: Global styles
├── layouts/         ← ❌ RESERVED: Do not modify
├── utils/           ← ❌ RESERVED: Do not modify (global utilities)
└── root.tsx         ← ❌ RESERVED: Do not modify
```

---

# Part 2: Architecture

## Core Principles

1. **Module Independence**: Each module owns ALL its code (components, hooks, utils, stores)
2. **Primary Work Areas**: `app/pages/` and `app/routes/` only
3. **Type Check, Don't Run**: Use `npm run typecheck` (no need to run the app)
4. **Server-Side Loading**: Use Remix loaders for data fetching
5. **Progressive Enhancement**: Forms work without JavaScript
6. **Component Size**: < 300 lines (soft), < 500 lines (hard)

## Remix Routing

**Nested Folder Structure (Recommended):**
```
app/routes/
├── _index.tsx                  → /
├── phone-management/
│   ├── _index.tsx              → /phone-management
│   └── $phone.tsx              → /phone-management/:phone
└── your-module/
    ├── _index.tsx              → /your-module
    ├── $id.tsx                 → /your-module/:id
    └── create.tsx              → /your-module/create
```

**Conventions:**
- Folders organize routes by module
- `$` = Dynamic parameter (e.g., `$id.tsx` → `:id` in URL)
- `_index` = Index route
- **MUST** define routes in `vite.config.ts` routes() function

**Why nested folders?** Better organization, easier maintenance, scalability, team collaboration.

## Module Structure

```
app/pages/YourModule/
├── types/
│   └── yourModule.types.ts      # TypeScript definitions
├── services/
│   ├── mocks/                   # Mock data (always used by frontend)
│   │   ├── yourModule.mock.ts
│   │   └── index.ts
│   └── yourModule.service.ts    # Service layer (uses mocks only)
├── components/                  # Module components
│   ├── YourModuleFilters.tsx
│   └── YourModuleTable.tsx
├── hooks/                       # Optional: module hooks
├── stores/                      # Optional: module state
├── utils/                       # Optional: module utilities
└── YourModulePage.tsx           # Main page component
```

## Import Patterns

**Two separate systems resolve `~/` alias:**
1. **TypeScript** (`tsconfig.json`) - Type checking only
2. **Vite** (`vite.config.ts`) - Runtime module resolution

**Rules:**
- **Within module**: Use relative paths (`./services/yourModule.service`)
- **In routes**: Use absolute paths (`~/pages/YourModule/YourModulePage`)
- **Never include file extensions** (`.tsx`, `.ts`)

---

# Part 3: Building a Module

## Development Order

1. **Types** → Define data structures
2. **Mocks** → Create mock data (always used by frontend)
3. **Service** → Create service using mocks
4. **Route** → Loader/action functions
5. **Components** → UI implementation
6. **Type Check** → `npm run typecheck`

**🚨 IMPORTANT:**
- Frontend engineers always use mocks only
- Work in `app/pages/` and `app/routes/` only

## Step-by-Step Guide

### 1. Create Module Structure

```bash
mkdir -p app/pages/YourModule/{types,components,hooks,stores,services/mocks}
```

### 2. Define Types

**`app/pages/YourModule/types/yourModule.types.ts`:**
```typescript
export interface YourModuleItem {
  id: string
  name: string
  status: 'active' | 'inactive'
  created_at: string
}

export interface YourModuleFilterParams {
  search?: string
  status?: string
}
```

### 3. Create Mock Data

**`app/pages/YourModule/services/mocks/yourModule.mock.ts`:**
```typescript
import type { YourModuleItem } from '../../types/yourModule.types'

export const mockYourModuleData: YourModuleItem[] = [
  { id: '1', name: 'Acme Corp', status: 'active', created_at: '01/15/25 10:30:00' },
  { id: '2', name: 'TechStart Inc', status: 'active', created_at: '01/16/25 14:20:00' },
]
```

**`app/pages/YourModule/services/mocks/index.ts`:**
```typescript
export { mockYourModuleData } from './yourModule.mock'
```

### 4. Create Service

**`app/pages/YourModule/services/yourModule.service.ts`:**
```typescript
import type { YourModuleItem, YourModuleFilterParams } from '../types/yourModule.types'
import { mockYourModuleData } from './mocks'

class YourModuleService {
  private mockData = [...mockYourModuleData]

  async getList(params?: YourModuleFilterParams): Promise<YourModuleItem[]> {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
    let filtered = [...this.mockData]

    if (params?.search) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(params.search!.toLowerCase())
      )
    }
    if (params?.status) {
      filtered = filtered.filter(item => item.status === params.status)
    }

    return filtered
  }

  async getById(id: string): Promise<YourModuleItem | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.mockData.find(item => item.id === id) || null
  }

  async create(data: Partial<YourModuleItem>): Promise<YourModuleItem> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newItem: YourModuleItem = {
      id: String(this.mockData.length + 1),
      ...data as YourModuleItem,
      created_at: new Date().toISOString(),
    }
    this.mockData.push(newItem)
    return newItem
  }
}

export default new YourModuleService()
```

### 5. Create Route

**First, create folder and add to `vite.config.ts`:**
```bash
mkdir app/routes/your-module
```

**In `vite.config.ts`:**
```typescript
route("/your-module", "routes/your-module/_index.tsx", { index: true });
```

**`app/routes/your-module/_index.tsx`:**
```typescript
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import YourModulePage from "~/pages/YourModule/YourModulePage";
import YourModuleService from "~/pages/YourModule/services/yourModule.service";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") || undefined;

  try {
    const items = await YourModuleService.getList({ search });
    return json({ items, error: null });
  } catch (error) {
    return json({ items: [], error: "Failed to load items" }, { status: 500 });
  }
}

export default function YourModuleRoute() {
  const { items, error } = useLoaderData<typeof loader>();
  return <YourModulePage items={items} error={error} />;
}
```

### 6. Create Page Component

**`app/pages/YourModule/YourModulePage.tsx`:**
```typescript
import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { YourModuleItem } from './types/yourModule.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'

interface YourModulePageProps {
  items: YourModuleItem[]
  error: string | null
}

export default function YourModulePage({ items, error }: YourModulePageProps) {
  const [searchValue, setSearchValue] = useState('')
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  if (error) return <div className="text-destructive">Error: {error}</div>

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Module</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="get" className="mb-4 flex gap-2">
            <Input
              name="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </Form>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
```

### 7. Create Form Route (Optional)

**In `vite.config.ts`:**
```typescript
route("/your-module/create", "routes/your-module/create.tsx");
```

**`app/routes/your-module/create.tsx`:**
```typescript
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import YourModuleService from "~/pages/YourModule/services/yourModule.service";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");

  const errors: Record<string, string> = {};
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.name = "Name is required";
  }
  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  try {
    await YourModuleService.create({ name, status: 'active' });
    return redirect("/your-module");
  } catch (error) {
    return json({ errors: { general: "Failed to create" } }, { status: 500 });
  }
}

export default function CreateYourModuleRoute() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Item</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                className={actionData?.errors?.name ? "border-destructive" : ""}
              />
              {actionData?.errors?.name && (
                <p className="text-sm text-destructive">{actionData.errors.name}</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
```

### 8. Type Check

```bash
npm run typecheck
```

---

# Quick Reference

## Key Principles

**✅ Always:**
- Types → Mocks → Service → Routes → Components
- Frontend engineers use mock data only
- Mock data in `services/mocks/` with realistic business scenarios
- Use Remix loaders/actions, Form component
- Components < 300 lines (soft), < 500 lines (hard)
- Install shadcn/ui: `npx shadcn@latest add <component-name>`
- Validate with `npm run typecheck`

**❌ Never:**
- Modify `app/components/`, `app/layouts/`, `app/utils/`, `app/root.tsx`
- Put module code outside `app/pages/{YourModule}/`
- Fetch data with `useEffect`
- Create components > 500 lines
- Forget Vite config (causes "Cannot find module" errors)
- Forget route definitions in `vite.config.ts`
- Add file extensions to imports

## Remix Patterns

**Loader:**
```typescript
export async function loader({ request, params }: LoaderFunctionArgs) {
  const data = await YourService.getData();
  return json({ data });
}
```

**Action:**
```typescript
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  await YourService.create(formData);
  return redirect("/success");
}
```

**Component:**
```typescript
export default function YourRoute() {
  const { data } = useLoaderData<typeof loader>();
  return <YourPage data={data} />;
}
```

## Workflow

1. `mkdir -p app/pages/NewModule/{types,components,services/mocks}`
2. Define types
3. Create mocks (realistic data)
4. Create service (uses mocks)
5. `mkdir app/routes/new-module` + add to `vite.config.ts`
6. Build components
7. `npm run typecheck`

## Folder Permission Rules

**✅ Modify:**
- `app/pages/{YourModule}/` - ALL your module code
- `app/routes/{your-module}/` - Your route files
- `vite.config.ts` - Add route definitions

**⚠️ Modify if needed:**
- `app/styles/` - Global styles only

**⚠️ shadcn/ui only:**
- `app/components/ui/` - Via `npx shadcn@latest add`
- `app/lib/utils.ts` - cn() helper

**❌ Never modify:**
- `app/layouts/`, `app/utils/`, `app/root.tsx`

## Troubleshooting

### "Cannot find module '~/pages/...'"
- `npm run typecheck` passes ✅ but `npm run dev` fails ❌
- **Fix**: Add to `vite.config.ts`:
```typescript
resolve: {
  alias: { "~": path.resolve(__dirname, "./app") }
}
```

### "No routes matched location"
- **Fix**: Add route to `vite.config.ts` routes() function

### Import errors
- **Fix**: Remove `.tsx`/`.ts` extensions from imports

### Debugging Checklist
1. ✅ `tsconfig.json` has `"paths": { "~/*": ["./app/*"] }`
2. ✅ `vite.config.ts` has `resolve.alias` AND `routes()` function
3. ✅ No file extensions in imports
4. ✅ Route definitions match actual files

---

## Standards

### Communication
- **Language**: 中文 (Chinese) for explanations, keep technical terms in English
- **Time Zone**: Pacific Time (PST/PDT)
- **Date Format**: `MM/DD/YY HH:mm:ss`

### Mock Data
- Reflect real business scenarios
- Use meaningful names (e.g., "Acme Corp", not "Test 1")
- Use realistic recent dates
- Include edge cases (empty states, long text)
- Store independently in `services/mocks/`

### Development Environment
- **Frontend Port**: 3000 (fixed, non-negotiable)
- **Backend Port**: 5000 (if applicable)
- Stop conflicting processes, never use random ports

**For this project:**
```json
// package.json
"scripts": {
  "dev": "remix vite:dev --port 3000"
}
```

**Kill port conflicts:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

---

## Resources

- **shadcn/ui**: https://ui.shadcn.com
- **Remix**: https://remix.run/docs
- **Tailwind**: https://tailwindcss.com
