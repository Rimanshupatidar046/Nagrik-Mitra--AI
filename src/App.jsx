import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import Toast from './components/Toast';

// Layouts
import MainLayout from './layouts/MainLayout';
import OfficerLayout from './layouts/OfficerLayout';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Citizen Dashboard & Services Pages
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Apply from './pages/Apply';
import Assistant from './pages/Assistant';
import Eligibility from './pages/Eligibility';
import Documents from './pages/Documents';
import Applications from './pages/Applications';
import ApplicationDetail from './pages/ApplicationDetail';
import Grievances from './pages/Grievances';
import Profile from './pages/Profile';

// Officer Pages
import OfficerDashboard from './pages/OfficerDashboard';
import OfficerApplications from './pages/OfficerApplications';
import OfficerGrievances from './pages/OfficerGrievances';
import OfficerApplicationDetail from './pages/OfficerApplicationDetail';

// Error Page
import NotFound from './pages/NotFound';

export const App = () => {
  return (
    <LanguageProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<Home />} />

            {/* Standalone Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Citizen Routes wrapped in MainLayout with Sidebar */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/apply/:serviceId" element={<Apply />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/eligibility" element={<Eligibility />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/:id" element={<ApplicationDetail />} />
              <Route path="/grievances" element={<Grievances />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Officer Portal Routes wrapped in OfficerLayout */}
            <Route path="/officer" element={<OfficerLayout />}>
              <Route index element={<OfficerDashboard />} />
              <Route path="applications" element={<OfficerApplications />} />
              <Route path="grievances" element={<OfficerGrievances />} />
              <Route path="application/:id" element={<OfficerApplicationDetail />} />
            </Route>

            {/* Fallback 404 Route */}
            <Route path="*" element={<MainLayout />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>

          {/* Global Toast Container */}
          <Toast />
        </BrowserRouter>
      </ToastProvider>
    </LanguageProvider>
  );
};

export default App;
