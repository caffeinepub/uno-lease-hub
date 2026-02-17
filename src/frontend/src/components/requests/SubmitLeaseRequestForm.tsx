import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useSubmitLeaseRequest } from '../../hooks/useLeaseRequests';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

interface SubmitLeaseRequestFormProps {
  listingId: string;
}

export default function SubmitLeaseRequestForm({ listingId }: SubmitLeaseRequestFormProps) {
  const { isAuthenticated, login } = useAuth();
  const submitRequest = useSubmitLeaseRequest();
  const [info, setInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!info.trim()) return;

    try {
      await submitRequest.mutateAsync({ listingId, info: info.trim() });
      toast.success('Request submitted successfully!');
      setInfo('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit request');
    }
  };

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Submit a Request</CardTitle>
          <CardDescription>Sign in to submit a lease request for this listing</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={login} className="w-full">
            Sign In to Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a Request</CardTitle>
        <CardDescription>Provide your contact information and requirements</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="info">Message / Contact Info</Label>
            <Textarea
              id="info"
              placeholder="Tell the owner about your requirements and how to contact you..."
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              disabled={submitRequest.isPending}
              rows={6}
            />
          </div>
          <Button type="submit" className="w-full" disabled={!info.trim() || submitRequest.isPending}>
            {submitRequest.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Request
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
