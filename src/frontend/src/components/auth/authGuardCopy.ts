/**
 * Centralized copy for auth guard error states.
 * Ensures consistent English messaging across the application.
 */

export const AUTH_GUARD_COPY = {
  initializationError: {
    title: 'Initialization Error',
    description: "We're having trouble setting up your session. This usually resolves with a refresh.",
  },
  connectionError: {
    title: 'Connection Issue',
    description: 'Unable to establish a connection to the backend. Please check your internet connection and try again.',
  },
} as const;
