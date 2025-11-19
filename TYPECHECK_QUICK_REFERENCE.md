# TypeScript Type Errors - Quick Reference Guide

## TL;DR: Error Summary

| Metric | Value |
|--------|-------|
| **Total Errors** | 70 |
| **Critical Errors** | 2 |
| **High Priority** | 28 |
| **Medium Priority** | 40 |
| **Est. Fix Time** | 2-3 hours |
| **Modules Affected** | 12 |

---

## Error Categories at a Glance

### 1. Type Import as Value (8 errors) - CRITICAL
**File**: `app/pages/SharedTypes/order.service.ts`
```typescript
// ❌ WRONG
import type { UserRole } from './order.types'
if (user.role === UserRole.HOTEL_ADMIN) { }  // Error!

// ✅ CORRECT
import { UserRole } from './order.types'
if (user.role === UserRole.HOTEL_ADMIN) { }
```
**Fix Time**: 5 minutes

---

### 2. Incomplete Interfaces (15 errors) - CRITICAL
**File**: `app/pages/HotelBackend/types/hotel-backend.types.ts`

**RoomType Missing Properties**:
```
✗ storeId         ✗ weekendPrice
✗ storeName       ✗ holidayPrice
✗ maxGuests       ✗ availableCount
✗ bedType         ✗ totalCount
                  ✗ status
```

**Fix Time**: 30-45 minutes

---

### 3. Enum Values Missing (7 errors) - HIGH

**AccountRole** (missing OPERATOR, CUSTOMER_SERVICE):
```typescript
// Current: only SUPER_ADMIN, ADMIN, USER
// Needed:  + OPERATOR, CUSTOMER_SERVICE
```

**CouponStatus** (wrong reference INACTIVE):
```typescript
// Current: DRAFT, ACTIVE, ENDED
// Used:    INACTIVE (doesn't exist!)
```

**PointsChangeType** (missing 4 values in usage):
```typescript
// Enum has: ORDER_COMPLETE, REDEEM, REFUND, RETURN, EXPIRE, MANUAL_ADJUST
// Code uses: ORDER_EARN (❌), ORDER_REDEEM (❌), + 2 missing
```

**RefundStatus** (incomplete label mapping):
```typescript
// Has 5 values but only mapped 3 in labels
```

**Fix Time**: 15-20 minutes per enum

---

### 4. Permission Object Types (8 errors) - HIGH

**File**: `app/pages/AccountManagement/AccountListPage.tsx`

```typescript
// ❌ Type mismatch in permission handling
const permissions: Record<string, PermissionConfig>
// PermissionConfig = { canView: boolean; canEdit: boolean }

// But code treats it as:
permissions[menuId]?.canView || false  // ✅ This part is OK
// Wrong setter signature for setState
```

**Fix Time**: 15 minutes

---

### 5. Store Interface Missing Properties (3 errors) - HIGH

```typescript
// Missing from Store interface:
✗ images[]    // Has logo, coverImage, newsImages but not images
✗ manager     // Not defined
✗ openedAt    // Has openedYear (string) but code expects openedAt
```

**Fix Time**: 10 minutes

---

### 6. String Literals vs Enum Values (2 errors) - HIGH

**File**: `app/pages/AccountManagement/AccountListPage.tsx` (lines 174, 181)

```typescript
// ❌ WRONG
setFilterStatus("active")     // String literal
setFilterStatus("disabled")

// ✅ CORRECT
setFilterStatus(AccountStatus.ACTIVE)
setFilterStatus(AccountStatus.DISABLED)
```

**Fix Time**: 5 minutes

---

### 7. Route Data Type Mismatches (12 errors) - MEDIUM

**Pattern across multiple route files**:

```typescript
// Problem: json() returns JsonifyObject<T> | null[]
return json({ items: [] })

// But component expects: T[]
// Getting: Type 'null[] | JsonifyObject<T>[]' is not assignable to 'T[]'
```

**Affected Files** (11 total):
- account/list.tsx
- coupon/config.tsx
- hotel-backend/business.* (multiple)
- hotel/*.tsx (multiple)
- member/level-config.tsx
- order/list.tsx

**Fix Time**: 30 minutes (batch fix)

---

### 8. Component Prop Mismatches (3 errors) - MEDIUM

- `RuleConfigPage`: prop name mismatch
- `UserAccountPage`: prop names don't match interface
- `BusinessService.getOverview()`: method doesn't exist

**Fix Time**: 15 minutes

---

### 9. Mock Data Type Validation (4 errors) - HIGH

**File**: `app/pages/HotelBackend/services/mocks/hotel-backend.mock.ts`

Mock objects have properties not in interface:
```typescript
{ storeId: '1', ... }  // storeId not in RoomType interface
```

**Fix Time**: Resolves when RoomType interface is extended

---

### 10. Missing Optional Properties (1 error) - MEDIUM

**File**: `app/pages/HotelManagement/JoinApplicationPage.tsx`

```typescript
// JoinApplication missing: notes property
```

---

## Fix Priority Sequence

### Phase 1: Critical (5 minutes)
1. Fix UserRole import in order.service.ts

### Phase 2: High-Impact (1.5 hours)
2. Extend RoomType interface (30 min) ⭐ UNBLOCKS OTHERS
3. Fix all enum value mismatches (30 min)
4. Extend AccountRole enum (10 min)
5. Fix permission types (15 min)

### Phase 3: Medium Priority (45 minutes)
6. Fix route data type mismatches (30 min)
7. Fix component props (10 min)
8. Fix string literals to enums (5 min)

---

## File-by-File Error Map

### AccountManagement
- `account.types.ts`: Add OPERATOR, CUSTOMER_SERVICE to enum
- `AccountListPage.tsx`:
  - Fix role labels record (add new enum values)
  - Fix string literals (line 174, 181)
  - Fix permission type handling

### HotelBackend
- `hotel-backend.types.ts`:
  - Extend RoomType (add 9 properties)
  - Extend Store (add 3 properties)
- `RoomTypesPage.tsx`: Will auto-fix when interface updated
- `StoresPage.tsx`: Will auto-fix when interface updated
- `services/mocks/hotel-backend.mock.ts`: Will auto-fix

### CouponSystem
- `CouponConfigPage.tsx`: Replace INACTIVE → DRAFT/ENDED

### PointsSystem
- `points.types.ts`: Already correct
- `UserAccountPage.tsx`: Update enum references (2 duplicate sections)

### OrderManagement
- `RefundManagementPage.tsx`: Add REFUNDING, REFUNDED to labels

### SharedTypes
- `order.service.ts`: Change `import type` to `import` for UserRole

### Multiple Route Files
- Fix JsonifyObject union types in json() returns (11 files)

---

## How to Apply Fixes

### Quickest Path (70 → 0 errors in 2 hours)

```bash
# 1. Fix critical import (5 min)
# Edit: app/pages/SharedTypes/order.service.ts - line 11

# 2. Extend interfaces (30 min)
# Edit: app/pages/HotelBackend/types/hotel-backend.types.ts
# Add properties to RoomType and Store

# 3. Fix enums (20 min)
# AccountRole: add 2 values
# CouponStatus: update label references
# PointsChangeType: update references
# RefundStatus: add label entries

# 4. Fix permissions (15 min)
# Edit: app/pages/AccountManagement/AccountListPage.tsx

# 5. Fix route types (30 min)
# Batch update json() returns across 11 route files

# 6. Run typecheck
npm run typecheck  # Should show 0 errors
```

---

## Common Patterns to Fix

### Pattern 1: Enum Value Missing from Record
```typescript
// Before
const labels: Record<MyEnum, string> = {
  [MyEnum.OPTION_A]: 'A',
  // Missing: MyEnum.OPTION_B, MyEnum.OPTION_C
}

// After
const labels: Record<MyEnum, string> = {
  [MyEnum.OPTION_A]: 'A',
  [MyEnum.OPTION_B]: 'B',
  [MyEnum.OPTION_C]: 'C'
}
```

### Pattern 2: Type-only Import Used as Value
```typescript
// Before
import type { MyEnum } from './types'
if (value === MyEnum.OPTION) { }  // Error!

// After
import { MyEnum } from './types'
if (value === MyEnum.OPTION) { }  // OK
```

### Pattern 3: JsonifyObject Union Type
```typescript
// Before
const data = await json({ items: [] })
// Returns: JsonifyObject<T> | null[]

// After - Option A: Ensure non-null
return json({ items: result || [], error: null })

// After - Option B: Type guard in component
const { items = [] } = useLoaderData<typeof loader>()
```

### Pattern 4: Missing Interface Properties
```typescript
// Before
interface MyType {
  id: string
  name: string
  // Missing: createdAt, status
}

// After
interface MyType {
  id: string
  name: string
  createdAt: string
  status: 'active' | 'inactive'
}
```

---

## Validation Checklist

After applying fixes:

- [ ] `npm run typecheck` returns 0 errors
- [ ] No red squiggly lines in editor
- [ ] All enum values are mapped in Records
- [ ] All interface properties are defined
- [ ] No type-only imports used as values
- [ ] Route loaders return proper types
- [ ] Component props match interface definitions

---

## Risk Matrix

| Fix | Risk | Impact | Priority |
|-----|------|--------|----------|
| UserRole import | 🟢 Low | 🔴 High | CRITICAL |
| RoomType extension | 🟡 Medium | 🔴 High | CRITICAL |
| Enum values | 🟢 Low | 🟡 Medium | HIGH |
| Permission types | 🟡 Medium | 🟡 Medium | HIGH |
| Route types | 🟡 Medium | 🟡 Medium | MEDIUM |

---

## Notes

- All errors are **fixable** - no architectural issues
- Fixes are **backward compatible** (no breaking changes)
- Most fixes are **low-risk** (syntax/type corrections)
- No runtime logic changes needed
- Safe to fix incrementally

---

## Related Documentation

- Full analysis: `TYPECHECK_ANALYSIS_REPORT.md`
- Project setup: `CLAUDE.md`
- Type definitions: Check specific `types/*.ts` files in each module
