import { useState, useEffect } from 'react';
import { useCreateLeaseListing, useUpdateLeaseListing } from '../../hooks/useOwnerDashboard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { LeaseListing } from '../../backend';

interface LeaseOfferEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: LeaseListing | null;
}

export default function LeaseOfferEditorDialog({ open, onOpenChange, listing }: LeaseOfferEditorDialogProps) {
  const createListing = useCreateLeaseListing();
  const updateListing = useUpdateLeaseListing();
  const [formData, setFormData] = useState({
    id: '',
    location: '',
    area: '',
    capacity: '',
  });

  const isEditing = !!listing;

  useEffect(() => {
    if (listing) {
      setFormData({
        id: listing.id,
        location: listing.location,
        area: listing.area.toString(),
        capacity: listing.capacity.toString(),
      });
    } else {
      setFormData({
        id: '',
        location: '',
        area: '',
        capacity: '',
      });
    }
  }, [listing, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.id.trim() || !formData.location.trim() || !formData.area || !formData.capacity) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const data = {
        id: formData.id.trim(),
        location: formData.location.trim(),
        area: BigInt(formData.area),
        capacity: BigInt(formData.capacity),
      };

      if (isEditing) {
        await updateListing.mutateAsync(data);
        toast.success('Listing updated successfully');
      } else {
        await createListing.mutateAsync(data);
        toast.success('Listing created successfully');
      }
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || `Failed to ${isEditing ? 'update' : 'create'} listing`);
    }
  };

  const isPending = createListing.isPending || updateListing.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Lease Listing' : 'Create Lease Listing'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the details of your lease listing' : 'Add a new lease listing to the marketplace'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id">Listing ID</Label>
            <Input
              id="id"
              placeholder="e.g., lease-001"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              disabled={isPending || isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., San Francisco, CA"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="area">Area (sq ft)</Label>
            <Input
              id="area"
              type="number"
              placeholder="e.g., 5000"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity (nodes)</Label>
            <Input
              id="capacity"
              type="number"
              placeholder="e.g., 100"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              disabled={isPending}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : isEditing ? (
                'Update Listing'
              ) : (
                'Create Listing'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
