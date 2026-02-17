import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useActorReadiness } from './useActorReadiness';
import type { LeaseRequest, Variant_rejected_accepted } from '../backend';

export function useSubmitLeaseRequest() {
  const { actor, isActorReady } = useActorReadiness();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ listingId, info }: { listingId: string; info: string }) => {
      if (!actor || !isActorReady) {
        throw new Error('Please wait for sign-in to finish and try again.');
      }
      return actor.submitLeaseRequest(listingId, info);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenantRequests'] });
    },
  });
}

export function useGetTenantRequests() {
  const { actor, isActorReady } = useActorReadiness();

  return useQuery<LeaseRequest[]>({
    queryKey: ['tenantRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTenantRequests();
    },
    enabled: isActorReady,
  });
}

export function useGetRequestsForOwner() {
  const { actor, isActorReady } = useActorReadiness();

  return useQuery<LeaseRequest[]>({
    queryKey: ['ownerRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRequestsForOwner();
    },
    enabled: isActorReady,
  });
}

export function useUpdateRequestStatus() {
  const { actor, isActorReady } = useActorReadiness();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestId, status }: { requestId: string; status: Variant_rejected_accepted }) => {
      if (!actor || !isActorReady) {
        throw new Error('Please wait for sign-in to finish and try again.');
      }
      return actor.updateRequestStatus(requestId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerRequests'] });
      queryClient.invalidateQueries({ queryKey: ['tenantRequests'] });
    },
  });
}
