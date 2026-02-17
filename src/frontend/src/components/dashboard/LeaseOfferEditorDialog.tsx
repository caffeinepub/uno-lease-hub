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
    code: '',
    splitRatio: '',
  });
  const [errors, setErrors] = useState({
    code: '',
    splitRatio: '',
  });

  const isEditing = !!listing;

  useEffect(() => {
    if (listing) {
      setFormData({
        id: listing.id,
        code: listing.code || '',
        splitRatio: listing.splitRatio ? `${listing.splitRatio.nlo}/${listing.splitRatio.ulo}` : '',
      });
    } else {
      setFormData({
        id: '',
        code: '',
        splitRatio: '',
      });
    }
    setErrors({ code: '', splitRatio: '' });
  }, [listing, open]);

  const validateUUID = (uuid: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  };

  const validateSplitRatio = (ratio: string): boolean => {
    const splitRegex = /^(\d+)\/(\d+)$/;
    const match = ratio.match(splitRegex);
    if (!match) return false;
    const nlo = parseInt(match[1], 10);
    const ulo = parseInt(match[2], 10);
    return !isNaN(nlo) && !isNaN(ulo) && nlo >= 0 && ulo >= 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({ code: '', splitRatio: '' });

    // Validate required fields
    if (!formData.id.trim()) {
      toast.error('Please enter a Listing ID');
      return;
    }

    if (!formData.code.trim()) {
      toast.error('Please enter a Lease Code');
      return;
    }

    if (!formData.splitRatio.trim()) {
      toast.error('Please enter a Split Ratio');
      return;
    }

    // Validate lease code (UUID)
    if (!validateUUID(formData.code.trim())) {
      setErrors((prev) => ({
        ...prev,
        code: 'Invalid UUID format. Expected format: 8-4-4-4-12 hex characters with hyphens (e.g., 2793ff69-b468-4342-b3cd-3956a4822003)',
      }));
      toast.error('Invalid lease code format');
      return;
    }

    // Validate split ratio
    if (!validateSplitRatio(formData.splitRatio.trim())) {
      setErrors((prev) => ({
        ...prev,
        splitRatio: 'Invalid split ratio format. Expected format: NN/NN (e.g., 60/40)',
      }));
      toast.error('Invalid split ratio format');
      return;
    }

    try {
      // Parse split ratio
      const match = formData.splitRatio.match(/^(\d+)\/(\d+)$/);
      const splitRatio = match
        ? {
            nlo: BigInt(match[1]),
            ulo: BigInt(match[2]),
          }
        : null;

      const data = {
        id: formData.id.trim(),
        location: 'Unspecified',
        area: 0n,
        capacity: 0n,
        code: formData.code.trim(),
        splitRatio,
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
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
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
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Lease Code (UUID)</Label>
            <Input
              id="code"
              placeholder="e.g., 2793ff69-b468-4342-b3cd-3956a4822003"
              value={formData.code}
              onChange={(e) => {
                setFormData({ ...formData, code: e.target.value });
                setErrors({ ...errors, code: '' });
              }}
              disabled={isPending}
              className={errors.code ? 'border-destructive' : ''}
              required
            />
            {errors.code && <p className="text-xs text-destructive">{errors.code}</p>}
            <p className="text-xs text-muted-foreground">Format: 8-4-4-4-12 hex characters with hyphens</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="splitRatio">Split Ratio (NLO/ULO)</Label>
            <Input
              id="splitRatio"
              placeholder="e.g., 60/40"
              value={formData.splitRatio}
              onChange={(e) => {
                setFormData({ ...formData, splitRatio: e.target.value });
                setErrors({ ...errors, splitRatio: '' });
              }}
              disabled={isPending}
              className={errors.splitRatio ? 'border-destructive' : ''}
              required
            />
            {errors.splitRatio && <p className="text-xs text-destructive">{errors.splitRatio}</p>}
            <p className="text-xs text-muted-foreground">Format: NN/NN (first number goes to NLO, second to ULO)</p>
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
