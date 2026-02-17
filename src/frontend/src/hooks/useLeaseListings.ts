import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { LeaseListing } from '../backend';

// Public query - accessible to anonymous visitors
export function useGetPublicListings() {
  const { actor, isFetching } = useActor();

  return useQuery<LeaseListing[]>({
    queryKey: ['publicListings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublicListings();
    },
    enabled: !!actor && !isFetching,
  });
}

// Admin-only query
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
