import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { Tour } from './pages/Tour';
import { RoundTour } from './pages/RoundTour';
import { DestinationsPage } from './pages/DestinationsPage';
import { ListingsPage } from './pages/listings/ListingsPage';
import { ListingDetail } from './pages/listings/ListingDetail';
import { CustomizeTourPage } from './pages/CustomizeTourPage';
import { HelpCenter } from './pages/support/HelpCenter';
import { Terms } from './pages/support/Terms';
import { Privacy } from './pages/support/Privacy';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { CheckoutPage } from './pages/CheckoutPage';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './components/layout/AdminLayout';
import { Dashboard as AdminDashboard } from './pages/admin/Dashboard';
import { AdminBookings } from './pages/admin/Bookings';
import { AdminListings } from './pages/admin/Listings';
import { AdminCalendar } from './pages/admin/Calendar';
import { AdminSettings } from './pages/admin/Settings';

function App() {
  return (
    <Routes>
      {/* Admin Portal (Hidden) */}
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="calendar" element={<AdminCalendar />} />
        <Route path="listings" element={<AdminListings />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Public Routes */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/destinations" element={<DestinationsPage />} />

        <Route path="/vehicles" element={<ListingsPage type="VEHICLE" title="Rent a Vehicle" subtitle="Find the perfect ride for your journey" />} />
        <Route path="/vehicles/:id" element={<ListingDetail />} />

        <Route path="/stays" element={<ListingsPage type="STAY" title="Stays & Villas" subtitle="Relax in comfort" />} />
        <Route path="/stays/:id" element={<ListingDetail />} />

        <Route path="/tours" element={<Tour />} />
        <Route path="/round-tours" element={<RoundTour />} />
        <Route path="/tours/:id" element={<ListingDetail />} />

        <Route path="/search" element={<ListingsPage title="Search Results" />} />

        <Route path="/checkout/:type/:id" element={<CheckoutPage />} />

        <Route path="/custom-tour" element={<CustomizeTourPage />} />

        {/* Support Routes */}
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Redirects/Fallbacks */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;
