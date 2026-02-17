import { useState } from 'react';
import { useGetPublicListings } from '../hooks/useLeaseListings';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import LeaseListingCard from '../components/leases/LeaseListingCard';
import EmptyState from '../components/leases/EmptyState';
import { Filter } from 'lucide-react';

export default function LeaseListingsPage() {
  const { data: listings, isLoading } = useGetPublicListings();
  const [sortBy, setSortBy] = useState<'newest'>('newest');

  const sortedListings = listings ? [...listings] : [];

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-foreground">Available Lease Listings</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Browse active ULO lease opportunities</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4 flex-shrink-0" />
          <span>{sortedListings.length} active listings</span>
        </div>
        <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : sortedListings.length === 0 ? (
        <EmptyState
          title="No Active Leases"
          description="There are no active lease listings at the moment. Check back soon."
        />
      ) : (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedListings.map((listing) => (
            <LeaseListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
