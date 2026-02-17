import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { LeaseListing } from '../../backend';
import { ArrowRight, FileCode, Split } from 'lucide-react';
import { getAvailabilityInfo } from '../../utils/leaseAvailability';
import { maskLeaseCodeForPublicDisplay } from '../../utils/leaseCodeMasking';

interface LeaseListingCardProps {
  listing: LeaseListing;
}

export default function LeaseListingCard({ listing }: LeaseListingCardProps) {
  const availabilityInfo = getAvailabilityInfo(listing.status);
  const maskedCode = maskLeaseCodeForPublicDisplay(listing.code);

  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">Lease #{listing.id}</CardTitle>
          </div>
          <Badge variant={availabilityInfo.variant}>
            {availabilityInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-sm">
            <FileCode className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Lease Code</p>
              <p className="font-mono text-xs truncate">{maskedCode || 'N/A'}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Split className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Split Ratio</p>
              <p className="font-medium">
                NLO {listing.splitRatio.nlo.toString()} / ULO {listing.splitRatio.ulo.toString()}
              </p>
            </div>
          </div>
        </div>
        <Button asChild className="w-full">
          <Link to="/listings/$listingId" params={{ listingId: listing.id }}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
