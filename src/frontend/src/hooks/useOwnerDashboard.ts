import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActorReadiness } from './useActorReadiness';
import type { SplitRatio, LeaseStatus } from '../backend';

export function useCreateLeaseListing() {
  const { actor, isActorReady } = useActorReadiness();
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
      if (!actor || !isActorReady) {
        throw new Error('Please wait for sign-in to finish and try again.');
      }
      return actor.createLeaseListing(id, code, splitRatio, location, area, capacity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerListings'] });
      queryClient.invalidateQueries({ queryKey: ['publicListings'] });
    },
  });
}

export function useUpdateLeaseListing() {
  const { actor, isActorReady } = useActorReadiness();
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
      if (!actor || !isActorReady) {
        throw new Error('Please wait for sign-in to finish and try again.');
      }
      return actor.updateLeaseListing(id, code, splitRatio, location, area, capacity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerListings'] });
      queryClient.invalidateQueries({ queryKey: ['publicListings'] });
    },
  });
}

export function useArchiveLeaseListing() {
  const { actor, isActorReady } = useActorReadiness();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor || !isActorReady) {
        throw new Error('Please wait for sign-in to finish and try again.');
      }
      return actor.archiveLeaseListing(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerListings'] });
      queryClient.invalidateQueries({ queryKey: ['publicListings'] });
    },
  });
}

export function useUpdateLeaseAvailability() {
  const { actor, isActorReady } = useActorReadiness();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: LeaseStatus }) => {
      if (!actor || !isActorReady) {
        throw new Error('Please wait for sign-in to finish and try again.');
      }
      return actor.updateLeaseAvailability(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerListings'] });
      queryClient.invalidateQueries({ queryKey: ['publicListings'] });
    },
  });
}
