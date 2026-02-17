import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet, createHashHistory } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './pages/LandingPage';
import LeaseListingsPage from './pages/LeaseListingsPage';
import LeaseDetailsPage from './pages/LeaseDetailsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfileSetupModal from './components/auth/ProfileSetupModal';

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <>
      <AppLayout>
        <Outlet />
      </AppLayout>
      <ProfileSetupModal />
    </>
  ),
});

// Define routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const listingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/listings',
  component: LeaseListingsPage,
});

const listingDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/listings/$listingId',
  component: LeaseDetailsPage,
});

const howItWorksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/how-it-works',
  component: HowItWorksPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFoundPage,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  listingsRoute,
  listingDetailsRoute,
  howItWorksRoute,
  dashboardRoute,
  notFoundRoute,
]);

// Create hash history for ICP compatibility
const hashHistory = createHashHistory();

// Create router with hash history
const router = createRouter({ 
  routeTree,
  history: hashHistory,
});

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
