import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { SplitRatio } from '../backend';

export function useCreateLeaseListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      code,
      splitRatio,
      location,
      area,
      capacity,
    }: {
      id: string;
      code: string;
      splitRatio: SplitRatio;
      location: string | null;
      area: bigint | null;
      capacity: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createLeaseListing(id, code, splitRatio, location, area, capacity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerListings'] });
      queryClient.invalidateQueries({ queryKey: ['activeListings'] });
    },
  });
}

export function useUpdateLeaseListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      code,
      splitRatio,
      location,
      area,
      capacity,
    }: {
      id: string;
      code: string;
      splitRatio: SplitRatio;
      location: string | null;
      area: bigint | null;
      capacity: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateLeaseListing(id, code, splitRatio, location, area, capacity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerListings'] });
      queryClient.invalidateQueries({ queryKey: ['activeListings'] });
    },
  });
}

export function useArchiveLeaseListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.archiveLeaseListing(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerListings'] });
      queryClient.invalidateQueries({ queryKey: ['activeListings'] });
    },
  });
}
