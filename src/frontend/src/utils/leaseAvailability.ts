import { LeaseStatus } from '../backend';

export interface LeaseAvailabilityInfo {
  label: string;
  variant: 'default' | 'secondary' | 'destructive';
  isAvailable: boolean;
}

export function getAvailabilityInfo(status: LeaseStatus): LeaseAvailabilityInfo {
  switch (status) {
    case LeaseStatus.available:
      return {
        label: 'Available',
        variant: 'default',
        isAvailable: true,
      };
    case LeaseStatus.unavailable:
      return {
        label: 'In Use',
        variant: 'destructive',
        isAvailable: false,
      };
    case LeaseStatus.archived:
      return {
        label: 'Archived',
        variant: 'secondary',
        isAvailable: false,
      };
    default:
      return {
        label: 'Unknown',
        variant: 'secondary',
        isAvailable: false,
      };
  }
}

export function getUnavailableMessage(status: LeaseStatus): string | null {
  if (status === LeaseStatus.unavailable) {
    return 'This lease code is currently in use. Please try another available code.';
  }
  if (status === LeaseStatus.archived) {
    return 'This lease code has been archived and is no longer available.';
  }
  return null;
}
