import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { LeaseListing } from '../../backend';
import { MapPin, Maximize, Cpu, ArrowRight, FileCode, Split } from 'lucide-react';

interface LeaseListingCardProps {
  listing: LeaseListing;
}

export default function LeaseListingCard({ listing }: LeaseListingCardProps) {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">Lease #{listing.id}</CardTitle>
            {listing.location && (
              <CardDescription className="mt-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {listing.location}
              </CardDescription>
            )}
          </div>
          <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
            {listing.status === 'active' ? 'Active' : 'Archived'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <div className="grid grid-cols-2 gap-4">
          {listing.code && (
            <div className="col-span-2 flex items-center gap-2 text-sm">
              <FileCode className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Lease Code</p>
                <p className="font-mono text-xs truncate">{listing.code}</p>
              </div>
            </div>
          )}
          {listing.splitRatio && (
            <div className="col-span-2 flex items-center gap-2 text-sm">
              <Split className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Split Ratio</p>
                <p className="font-medium">
                  NLO {listing.splitRatio.nlo.toString()} / ULO {listing.splitRatio.ulo.toString()}
                </p>
              </div>
            </div>
          )}
          {listing.area !== undefined && (
            <div className="flex items-center gap-2 text-sm">
              <Maximize className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Area</p>
                <p className="font-medium">{listing.area.toString()} sq ft</p>
              </div>
            </div>
          )}
          {listing.capacity !== undefined && (
            <div className="flex items-center gap-2 text-sm">
              <Cpu className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Capacity</p>
                <p className="font-medium">{listing.capacity.toString()} nodes</p>
              </div>
            </div>
          )}
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
