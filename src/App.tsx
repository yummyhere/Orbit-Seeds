/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoDisclaimerBanner } from './components/DemoDisclaimerBanner';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Catalog } from './pages/Catalog';
import { ProductDetails } from './pages/ProductDetails';
import { RD } from './pages/RD';
import { Contact } from './pages/Contact';
import { DealerApp } from './pages/DealerApp';
import { ERPDashboard } from './pages/ERPDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-[#252E27]">
      <DemoDisclaimerBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Corporate Website Experience */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/catalog"
          element={
            <MainLayout>
              <Catalog />
            </MainLayout>
          }
        />
        <Route
          path="/catalog/:id"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />
        <Route
          path="/rd"
          element={
            <MainLayout>
              <RD />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />

        {/* Mobile-First Dealer Booking Experience */}
        <Route
          path="/dealer"
          element={
            <div>
              <DemoDisclaimerBanner />
              <DealerApp />
            </div>
          }
        />

        {/* Desktop Operations ERP & Lot Tracking Experience */}
        <Route
          path="/erp"
          element={
            <div>
              <DemoDisclaimerBanner />
              <ERPDashboard />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
