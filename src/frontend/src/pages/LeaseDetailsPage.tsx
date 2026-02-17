import { useParams, Link } from '@tanstack/react-router';
import { useGetActiveListings } from '../hooks/useLeaseListings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import SubmitLeaseRequestForm from '../components/requests/SubmitLeaseRequestForm';
import { MapPin, Square, Users, ArrowLeft, FileCode, Split, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LeaseDetailsPage() {
  const { listingId } = useParams({ from: '/listings/$listingId' });
  const { data: listings, isLoading } = useGetActiveListings();
  const [copied, setCopied] = useState(false);

  const listing = listings?.find((l) => l.id === listingId);

  const handleCopyCode = async () => {
    if (listing?.code) {
      try {
        await navigator.clipboard.writeText(listing.code);
        setCopied(true);
        toast.success('Lease code copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        toast.error('Failed to copy lease code');
      }
    }
  };

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
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/listings">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Listings
          </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Listing Not Found</CardTitle>
            <CardDescription>The lease listing you're looking for doesn't exist or has been removed.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link to="/listings">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Link>
      </Button>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl sm:text-3xl">Lease #{listing.id}</CardTitle>
                  {listing.location && (
                    <CardDescription className="mt-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {listing.location}
                    </CardDescription>
                  )}
                </div>
                <Badge variant={listing.status === 'active' ? 'default' : 'secondary'} className="text-sm">
                  {listing.status === 'active' ? 'Active' : 'Archived'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Lease Details</h3>
                <div className="space-y-4">
                  {listing.code && (
                    <div className="flex items-start gap-3 rounded-lg border p-4">
                      <FileCode className="mt-0.5 h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-muted-foreground">Lease Code (UUID)</p>
                        <div className="mt-1 flex items-center gap-2">
                          <code className="block font-mono text-sm break-all">{listing.code}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyCode}
                            className="flex-shrink-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  {listing.splitRatio && (
                    <div className="flex items-start gap-3 rounded-lg border p-4">
                      <Split className="mt-0.5 h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">Split Ratio</p>
                        <p className="mt-1 text-base">
                          <span className="font-semibold">NLO:</span> {listing.splitRatio.nlo.toString()} /{' '}
                          <span className="font-semibold">ULO:</span> {listing.splitRatio.ulo.toString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {listing.area !== undefined && (
                    <div className="flex items-start gap-3 rounded-lg border p-4">
                      <Square className="mt-0.5 h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">Area</p>
                        <p className="mt-1 text-base font-semibold">{listing.area.toString()} sq ft</p>
                      </div>
                    </div>
                  )}
                  {listing.capacity !== undefined && (
                    <div className="flex items-start gap-3 rounded-lg border p-4">
                      <Users className="mt-0.5 h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">Node Capacity</p>
                        <p className="mt-1 text-base font-semibold">{listing.capacity.toString()} nodes</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 text-lg font-semibold">About This Lease</h3>
                <p className="text-sm text-muted-foreground">
                  This is an active ULO (Unity Lease Offering) listing. Use the lease code above in the Unity Network
                  App to activate your lease. The split ratio determines how rewards are distributed between the NLO
                  (Node Lease Owner) and ULO (Unity Lease Owner).
                </p>
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
