import { useGetRequestsForOwner, useUpdateRequestStatus } from '../../hooks/useLeaseRequests';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import EmptyState from '../leases/EmptyState';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Variant_rejected_accepted } from '../../backend';

export default function IncomingRequestsPanel() {
  const { data: requests, isLoading } = useGetRequestsForOwner();
  const updateStatus = useUpdateRequestStatus();

  const handleUpdateStatus = async (requestId: string, status: Variant_rejected_accepted) => {
    try {
      await updateStatus.mutateAsync({ requestId, status });
      toast.success(`Request ${status === Variant_rejected_accepted.accepted ? 'accepted' : 'rejected'}`);
    } catch (error: any) {
      console.error('Update status error:', error);
      const errorMessage = error.message || 'Failed to update request status. Please try again.';
      toast.error(errorMessage);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'cancelled':
        return 'secondary';
      default:
        return 'outline';
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

  if (!requests || requests.length === 0) {
    return (
      <EmptyState
        title="No Incoming Requests"
        description="You haven't received any lease requests yet. Make sure your listings are active."
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incoming Lease Requests</CardTitle>
        <CardDescription>Review and manage requests for your listings</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Listing ID</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.listingId}</TableCell>
                <TableCell className="max-w-[120px] truncate text-xs" title={request.tenant.toString()}>
                  {request.tenant.toString().slice(0, 8)}...
                </TableCell>
                <TableCell>{format(new Date(Number(request.requestDate) / 1000000), 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(request.status)}>{request.status}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">{request.info}</TableCell>
                <TableCell className="text-right">
                  {request.status === 'pending' && (
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateStatus(request.id, Variant_rejected_accepted.accepted)}
                        disabled={updateStatus.isPending}
                      >
                        <Check className="h-4 w-4 text-emerald-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateStatus(request.id, Variant_rejected_accepted.rejected)}
                        disabled={updateStatus.isPending}
                      >
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
