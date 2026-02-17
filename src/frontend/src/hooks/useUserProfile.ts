import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActorReadiness } from './useActorReadiness';
import type { UserProfile } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isActorReady, isInitializing } = useActorReadiness();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: isActorReady,
    retry: false,
  });

  return {
    ...query,
    isLoading: isInitializing || query.isLoading,
    isFetched: isActorReady && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor, isActorReady } = useActorReadiness();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor || !isActorReady) {
        throw new Error('Please wait for sign-in to finish and try again.');
      }
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
