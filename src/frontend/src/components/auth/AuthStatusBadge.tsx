import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useUserProfile';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

export default function AuthStatusBadge() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading } = useGetCallerUserProfile();

  if (!identity || isLoading) return null;

  const displayName = userProfile?.name || 'User';

  return (
    <Badge variant="secondary" className="hidden sm:flex items-center gap-2">
      <User className="h-3 w-3" />
      {displayName}
    </Badge>
  );
}
