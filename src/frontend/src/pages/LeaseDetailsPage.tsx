import { useParams, Link } from '@tanstack/react-router';
import { useGetActiveListings } from '../hooks/useLeaseListings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import SubmitLeaseRequestForm from '../components/requests/SubmitLeaseRequestForm';
import { MapPin, Square, Users, ArrowLeft } from 'lucide-react';

export default function LeaseDetailsPage() {
  const { listingId } = useParams({ from: '/listings/$listingId' });
  const { data: listings, isLoading } = useGetActiveListings();

  const listing = listings?.find((l) => l.id === listingId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Skeleton className="mb-6 h-10 w-48" />
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-40 w-full" />
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Card>
          <CardHeader>
            <CardTitle>Listing Not Found</CardTitle>
            <CardDescription>The lease listing you're looking for doesn't exist or has been removed.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/listings">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Listings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <Button asChild variant="ghost" className="mb-4 sm:mb-6">
        <Link to="/listings">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Link>
      </Button>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <CardTitle className="mb-2 text-xl sm:text-2xl break-words">Lease Listing: {listing.id}</CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      {listing.status === 'active' ? 'Active' : 'Archived'}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <MapPin className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Location</p>
                    <p className="text-sm sm:text-base font-semibold text-foreground break-words">{listing.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Square className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Area</p>
                    <p className="text-sm sm:text-base font-semibold text-foreground">{listing.area.toString()} sq ft</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Users className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Capacity</p>
                    <p className="text-sm sm:text-base font-semibold text-foreground">{listing.capacity.toString()} units</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 text-sm sm:text-base font-semibold text-foreground">Owner</h3>
                <div className="rounded-lg bg-muted p-3 sm:p-4">
                  <code className="text-xs break-all text-muted-foreground">{listing.owner.toString()}</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <SubmitLeaseRequestForm listingId={listing.id} />
        </div>
      </div>
    </div>
  );
}
