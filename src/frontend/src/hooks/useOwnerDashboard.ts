import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { SplitRatio } from '../backend';

export function useCreateLeaseListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      location,
      area,
      capacity,
      code,
      splitRatio,
    }: {
      id: string;
      location: string;
      area: bigint;
      capacity: bigint;
      code: string | null;
      splitRatio: SplitRatio | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createLeaseListing(id, location, area, capacity, code, splitRatio);
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
      location,
      area,
      capacity,
      code,
      splitRatio,
    }: {
      id: string;
      location: string;
      area: bigint;
      capacity: bigint;
      code: string | null;
      splitRatio: SplitRatio | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateLeaseListing(id, location, area, capacity, code, splitRatio);
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
