# Goat Adventures App - Design Spec

## Overview
Booking and admin app for Goat Rental adventures (starting with Yacht). Customers browse adventures, submit booking requests (no online payment). Admin manages adventures and reservations with login-protected panel including statistics.

## Tech Stack
- Next.js 14 (App Router) + Tailwind CSS
- Prisma + SQLite
- TanStack Query (React Query) for server state
- TanStack Table (React Table) for admin tables
- React Hook Form + Zod for forms/validation
- NextAuth.js (credentials provider) for admin auth

## Database Schema

### User (admin)
- id, email, passwordHash, name, createdAt

### Adventure
- id, title, slug, description, scheduleJson (JSON array of timeline items)
- adultPrice (Float), childPrice (Float), childFreeNote (String)
- imageUrl, youtubeUrl, isActive (Boolean), createdAt, updatedAt

### Booking
- id, adventureId (FK → Adventure)
- customerName, customerEmail, customerPhone
- date (DateTime), adults (Int), children (Int)
- message (optional text), status (enum: NEW, CONFIRMED, REJECTED, COMPLETED)
- totalPrice (Float), createdAt

## Public Pages

### `/` — Adventures listing
- Hero section with Goat Adventures branding
- Cards grid showing active adventures (image, title, price, short description)
- Dark navy background (#0a1628), gold accents (#d4a853), green buttons (#2d5a3d)

### `/adventures/[slug]` — Adventure detail
- Hero image + YouTube embed
- Day schedule timeline (same layout as current goatrental.cz/adventures)
- Price list section (adult price with discount, children free note)
- Booking form at bottom: name, email, phone, date, adults count, children count, message
- Submit saves to DB with status NEW

## Admin Pages (protected by NextAuth)

### `/admin` — Login page
- Email + password login

### `/admin/dashboard` — Statistics
- Total bookings, revenue, this month's bookings
- Recent bookings list

### `/admin/adventures` — Adventures CRUD
- Table with all adventures (TanStack Table)
- Create/edit form (React Hook Form): title, slug, description, schedule, prices, image URL, YouTube URL, active toggle

### `/admin/bookings` — Bookings management
- Filterable table (by status, date, adventure)
- Status change: NEW → CONFIRMED → COMPLETED or REJECTED
- View booking details

## Design System
- Background: #0a1628 → #132238 gradient
- Gold accent: #d4a853
- Green buttons: #2d5a3d
- Serif font for headings, sans-serif for body
- Card-based layouts with subtle borders
- Admin: same color palette, clean sidebar layout
