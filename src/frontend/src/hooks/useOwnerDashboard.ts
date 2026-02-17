import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useCreateLeaseListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      location,
      area,
      capacity,
    }: {
      id: string;
      location: string;
      area: bigint;
      capacity: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createLeaseListing(id, location, area, capacity);
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
    }: {
      id: string;
      location: string;
      area: bigint;
      capacity: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateLeaseListing(id, location, area, capacity);
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
