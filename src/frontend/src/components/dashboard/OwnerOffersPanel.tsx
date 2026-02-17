import { useState } from 'react';
import { useGetOwnerListings } from '../../hooks/useLeaseListings';
import { useArchiveLeaseListing } from '../../hooks/useOwnerDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import LeaseOfferEditorDialog from './LeaseOfferEditorDialog';
import EmptyState from '../leases/EmptyState';
import { Plus, Edit, Archive } from 'lucide-react';
import { toast } from 'sonner';
import type { LeaseListing } from '../../backend';

export default function OwnerOffersPanel() {
  const { data: listings, isLoading } = useGetOwnerListings();
  const archiveListing = useArchiveLeaseListing();
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
      toast.error(error.message || 'Failed to archive listing');
    }
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
              description="Create your first lease listing to start receiving requests."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-medium">{listing.id}</TableCell>
                    <TableCell>{listing.location}</TableCell>
                    <TableCell>{listing.area.toString()} sq ft</TableCell>
                    <TableCell>{listing.capacity.toString()} nodes</TableCell>
                    <TableCell>
                      <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                        {listing.status === 'active' ? 'Active' : 'Archived'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(listing)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        {listing.status === 'active' && (
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
                ))}
              </TableBody>
            </Table>
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
