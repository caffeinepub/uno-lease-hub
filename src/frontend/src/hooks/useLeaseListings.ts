import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { LeaseListing } from '../backend';

export function useGetActiveListings() {
  const { actor, isFetching } = useActor();

  return useQuery<LeaseListing[]>({
    queryKey: ['activeListings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetOwnerListings() {
  const { actor, isFetching } = useActor();

  return useQuery<LeaseListing[]>({
    queryKey: ['ownerListings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOwnerListings();
    },
    enabled: !!actor && !isFetching,
  });
}
