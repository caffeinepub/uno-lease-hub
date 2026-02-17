import { useInternetIdentity } from './useInternetIdentity';
import { useActor } from './useActor';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createActorWithConfig } from '../config';
import { getSecretParameter } from '../utils/urlParams';
import { type backendInterface } from '../backend';

/**
 * Hook that combines Internet Identity state with actor availability
 * to provide a single source of truth for when authenticated operations can proceed.
 * Includes retry capability for actor initialization failures.
 */
export function useActorReadiness() {
  const { identity, isInitializing: identityInitializing, loginStatus } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();

  // Separate query to detect actor initialization errors and provide retry
  const actorHealthCheck = useQuery<backendInterface | null>({
    queryKey: ['actor-health', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!identity) {
        return null;
      }

      // Try to create an authenticated actor to test connectivity
      const actorOptions = {
        agentOptions: {
          identity
        }
      };

      const testActor = await createActorWithConfig(actorOptions);
      const adminToken = getSecretParameter('caffeineAdminToken') || '';
      await testActor._initializeAccessControlWithSecret(adminToken);
      return testActor;
    },
    enabled: !!identity && !actor && !actorFetching,
    retry: 2,
    staleTime: Infinity,
    // Don't refetch automatically
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const isAuthenticated = !!identity;
  const isAuthenticating = loginStatus === 'logging-in';
  
  // Actor is ready when we have both identity and actor, and neither is still loading
  const isActorReady = isAuthenticated && !!actor && !actorFetching;
  
  // We're initializing if identity exists but actor isn't ready yet (and no error)
  const isInitializing = isAuthenticated && (!actor || actorFetching) && !identityInitializing && !actorHealthCheck.isError;

  // Expose actor initialization error state
  const hasActorInitError = isAuthenticated && actorHealthCheck.isError;

  const refetchActor = async () => {
    // Reset both queries to clear error state and force re-initialization
    queryClient.resetQueries({ queryKey: ['actor'] });
    queryClient.resetQueries({ queryKey: ['actor-health'] });
    
    // Refetch the health check which will trigger actor recreation
    await actorHealthCheck.refetch();
    
    // Invalidate all dependent queries
    queryClient.invalidateQueries();
  };

  return {
    isAuthenticated,
    isAuthenticating,
    isActorReady,
    isInitializing,
    hasActorInitError,
    actorError: actorHealthCheck.error,
    refetchActor,
    actor,
  };
}
