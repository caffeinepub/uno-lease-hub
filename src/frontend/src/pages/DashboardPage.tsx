import RequireAuth from '../components/auth/RequireAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import OwnerOffersPanel from '../components/dashboard/OwnerOffersPanel';
import IncomingRequestsPanel from '../components/dashboard/IncomingRequestsPanel';
import TenantRequestsPanel from '../components/requests/TenantRequestsPanel';
import YouTubeShortsSection from '../components/media/YouTubeShortsSection';

export default function DashboardPage() {
  return (
    <RequireAuth>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your lease listings and requests</p>
        </div>

        {/* Instructional Videos */}
        <div className="mb-8 sm:mb-12">
          <YouTubeShortsSection />
        </div>

        <Tabs defaultValue="my-offers" className="space-y-6">
          <ScrollArea className="w-full">
            <TabsList className="inline-flex h-auto w-full sm:w-auto min-w-full sm:min-w-0">
              <TabsTrigger value="my-offers" className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                My Offers
              </TabsTrigger>
              <TabsTrigger value="incoming-requests" className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                Incoming Requests
              </TabsTrigger>
              <TabsTrigger value="my-requests" className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                My Requests
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" className="sm:hidden" />
          </ScrollArea>

          <TabsContent value="my-offers">
            <OwnerOffersPanel />
          </TabsContent>

          <TabsContent value="incoming-requests">
            <IncomingRequestsPanel />
          </TabsContent>

          <TabsContent value="my-requests">
            <TenantRequestsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </RequireAuth>
  );
}
