import { type ReactNode, useEffect, useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useActorReadiness } from '../../hooks/useActorReadiness';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { AUTH_GUARD_COPY } from './authGuardCopy';

interface RequireAuthProps {
  children: ReactNode;
}

const INITIALIZATION_TIMEOUT = 15000; // 15 seconds

export default function RequireAuth({ children }: RequireAuthProps) {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { isActorReady, isInitializing, hasActorInitError, actorError, refetchActor } = useActorReadiness();
  const queryClient = useQueryClient();
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (!identity) {
      setTimeoutReached(false);
      return;
    }

    if (isActorReady) {
      setTimeoutReached(false);
      return;
    }

    // Only set timeout if there's no explicit error
    if (hasActorInitError) {
      return;
    }

    // Set a timeout to detect if initialization is taking too long
    const timeout = setTimeout(() => {
      if (identity && !isActorReady && !hasActorInitError) {
        setTimeoutReached(true);
      }
    }, INITIALIZATION_TIMEOUT);

    return () => clearTimeout(timeout);
  }, [identity, isActorReady, hasActorInitError]);

  // Log errors to console for debugging (not shown to users)
  useEffect(() => {
    if (actorError) {
      console.error('Actor initialization error:', actorError);
    }
  }, [actorError]);

  const handleTryAgain = async () => {
    setIsRetrying(true);
    setTimeoutReached(false);
    try {
      await refetchActor();
      // Invalidate and refetch dependent queries after successful actor retry
      queryClient.invalidateQueries();
    } catch (error) {
      console.error('Retry failed:', error);
    } finally {
      setIsRetrying(false);
    }
  };

  const handleRefreshPage = () => {
    window.location.reload();
  };

  // Not authenticated - show admin login prompt
  if (!identity) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <Card className="max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Lock className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardTitle>Admin Access Required</CardTitle>
              <CardDescription>Please sign in with your admin credentials to access the dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={login} disabled={isLoggingIn} className="w-full">
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Admin Login'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Immediate actor creation failure - show connection error
  if (hasActorInitError) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <Card className="max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle>{AUTH_GUARD_COPY.connectionError.title}</CardTitle>
              <CardDescription>
                {AUTH_GUARD_COPY.connectionError.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Button 
                  onClick={handleTryAgain} 
                  disabled={isRetrying}
                  className="flex-1"
                  variant="default"
                >
                  {isRetrying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Retrying...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Again
                    </>
                  )}
                </Button>
                <Button 
                  onClick={handleRefreshPage}
                  variant="outline"
                  className="flex-1"
                >
                  Refresh Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Timeout reached without explicit error - show initialization error
  if (timeoutReached) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <Card className="max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle>{AUTH_GUARD_COPY.initializationError.title}</CardTitle>
              <CardDescription>
                {AUTH_GUARD_COPY.initializationError.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Button 
                  onClick={handleTryAgain} 
                  disabled={isRetrying}
                  className="flex-1"
                  variant="default"
                >
                  {isRetrying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Retrying...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Again
                    </>
                  )}
                </Button>
                <Button 
                  onClick={handleRefreshPage}
                  variant="outline"
                  className="flex-1"
                >
                  Refresh Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Authenticated but actor not ready - show initialization state
  if (isInitializing) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <Card className="max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
              <CardTitle>Initializing</CardTitle>
              <CardDescription>Setting up your authenticated session...</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  // Actor ready - render protected content
  return <>{children}</>;
}
