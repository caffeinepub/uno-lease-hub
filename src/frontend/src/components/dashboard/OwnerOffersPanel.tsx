import { useState } from 'react';
import { useGetOwnerListings } from '../../hooks/useLeaseListings';
import { useArchiveLeaseListing, useUpdateLeaseAvailability } from '../../hooks/useOwnerDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import LeaseOfferEditorDialog from './LeaseOfferEditorDialog';
import EmptyState from '../leases/EmptyState';
import { Plus, Edit, Archive, AlertCircle, RefreshCw, Info } from 'lucide-react';
import { toast } from 'sonner';
import type { LeaseListing, LeaseStatus } from '../../backend';
import { getAvailabilityInfo } from '../../utils/leaseAvailability';
import { LeaseStatus as LeaseStatusEnum } from '../../backend';

export default function OwnerOffersPanel() {
  const { data: listings, isLoading, isError, error, refetch } = useGetOwnerListings();
  const archiveListing = useArchiveLeaseListing();
  const updateAvailability = useUpdateLeaseAvailability();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<LeaseListing | null>(null);

  const handleEdit = (listing: LeaseListing) => {
    setEditingListing(listing);
    setEditorOpen(true);
  };

  const handleCreate = () => {
    setEditingListing(null);
    setEditorOpen(true);
  };

  const handleArchive = async (id: string) => {
    try {
      await archiveListing.mutateAsync(id);
      toast.success('Listing archived successfully');
    } catch (error: any) {
      console.error('Archive error:', error);
      const errorMessage = error.message || 'Failed to archive listing. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleAvailabilityChange = async (id: string, status: LeaseStatus) => {
    try {
      await updateAvailability.mutateAsync({ id, status });
      toast.success('Availability updated successfully');
    } catch (error: any) {
      console.error('Update availability error:', error);
      const errorMessage = error.message || 'Failed to update availability. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleRetry = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    console.error('Owner listings error:', error);
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Lease Offers</CardTitle>
          <CardDescription>Manage your lease listings</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Could not load your listings. Please try again.</span>
              <Button variant="outline" size="sm" onClick={handleRetry} className="ml-4">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Lease Offers</CardTitle>
              <CardDescription>Manage your lease listings</CardDescription>
            </div>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Create Listing
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!listings || listings.length === 0 ? (
            <EmptyState
              title="No Listings Yet"
              description="Click the Create Listing button above to add your first lease listing. You'll be able to enter the Lease Code (UUID), Split Ratio (NLO/ULO), and set the Availability status."
              action={{
                label: 'Create Listing',
                onClick: handleCreate,
              }}
            />
          ) : (
            <>
              <Alert className="mb-4">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Quick Guide:</strong> Use the <Edit className="inline h-3 w-3 mx-1" /> Edit button to update Lease Code and Split Ratio. 
                  Use the Availability dropdown to change status (Available, In Use, or Archived).
                </AlertDescription>
              </Alert>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Lease Code</TableHead>
                      <TableHead>Split Ratio</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listings.map((listing) => {
                      const availabilityInfo = getAvailabilityInfo(listing.status);
                      return (
                        <TableRow key={listing.id}>
                          <TableCell className="font-medium">{listing.id}</TableCell>
                          <TableCell className="font-mono text-xs">{listing.code || '—'}</TableCell>
                          <TableCell>
                            {listing.splitRatio ? `${listing.splitRatio.nlo}/${listing.splitRatio.ulo}` : '—'}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={listing.status}
                              onValueChange={(value) => handleAvailabilityChange(listing.id, value as LeaseStatus)}
                              disabled={updateAvailability.isPending}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue>
                                  <Badge variant={availabilityInfo.variant} className="text-xs">
                                    {availabilityInfo.label}
                                  </Badge>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={LeaseStatusEnum.available}>Available</SelectItem>
                                <SelectItem value={LeaseStatusEnum.unavailable}>In Use</SelectItem>
                                <SelectItem value={LeaseStatusEnum.archived}>Archived</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEdit(listing)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              {listing.status !== LeaseStatusEnum.archived && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleArchive(listing.id)}
                                  disabled={archiveListing.isPending}
                                >
                                  <Archive className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <LeaseOfferEditorDialog
        open={editorOpen}
        onOpenChange={setEditorOpen}
        listing={editingListing}
      />
    </>
  );
}
