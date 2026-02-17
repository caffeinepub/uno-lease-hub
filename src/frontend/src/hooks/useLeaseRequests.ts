import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { LeaseRequest, Variant_rejected_accepted } from '../backend';

export function useSubmitLeaseRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ listingId, info }: { listingId: string; info: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitLeaseRequest(listingId, info);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenantRequests'] });
    },
  });
}

export function useGetTenantRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<LeaseRequest[]>({
    queryKey: ['tenantRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTenantRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRequestsForOwner() {
  const { actor, isFetching } = useActor();

  return useQuery<LeaseRequest[]>({
    queryKey: ['ownerRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRequestsForOwner();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateRequestStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestId, status }: { requestId: string; status: Variant_rejected_accepted }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateRequestStatus(requestId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerRequests'] });
      queryClient.invalidateQueries({ queryKey: ['tenantRequests'] });
    },
  });
}
