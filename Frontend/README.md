# Sri Lanka Tourism Marketplace (Frontend)

This is a production-grade React frontend for a comprehensive Sri Lanka tourism marketplace. It allows users to browse and book vehicles, stays, tours, restaurants, and jewelry. The application is built with a mobile-first approach and a clean, modern UI.

## Features

- **Multi-Category Marketplace**: Vehicles, Stays, Tours, Restaurants, Jewelry.
- **Search & Filtering**: Filter by price, category, rating, capacity, and more.
- **Role-Based Dashboards**:
  - **Guest**: Profile, bookings history, reviews.
  - **Provider**: Manage listings, bookings calendar, payouts.
  - **Admin**: Platform overview, provider verification, revenue monitoring.
- **Authentication**: Role-based login/register (Guest, Provider, Admin) with mock auth.
- **Booking Flow**: Check availability, guest details, and mock payment.
- **Responsive Design**: Optimized for all devices using Tailwind CSS.
- **Data Mocking**: Complete mock data integration for listings and bookings.

## Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand (Auth & Global State)
- **Data Fetching**: TanStack React Query v5
- **Routing**: React Router DOM v6/v7
- **Forms**: React Hook Form + Zod
- **Networking**: Axios
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1.  Clone the repository (if not already local).
2.  Navigate to the `Frontend` directory:
    ```bash
    cd Frontend
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Credentials for Testing

Use the following email patterns to test different roles (password: `password123`):

- **Guest**: `guest@example.com` (or any valid email)
- **Provider**: `provider@example.com`
- **Admin**: `admin@example.com`

## Project Structure

- `src/api`: Axios client and mock API functions.
- `src/components`:
  - `ui`: Reusable atomic components (Button, Card, Input, etc.).
  - `layout`: AppLayout, DashboardLayout, Navbar, Footer.
  - `features`: Domain-specific components (ListingCard, FiltersSidebar).
- `src/mocks`: Mock data for listings and users.
- `src/pages`: Key route pages grouped by domain.
- `src/stores`: Zustand state stores.
- `src/types`: TypeScript definitions.

## Backend Integration

The frontend is configured to use mock data by default. To connect to a real backend:
1.  Update `VITE_API_BASE_URL` in `.env`.
2.  Modify `src/api/` files to remove `delay()` and mock returns, ensuring endpoints match the Django REST API.
