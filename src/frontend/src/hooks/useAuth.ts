import { useInternetIdentity } from './useInternetIdentity';

export function useAuth() {
  const { identity, login, clear, loginStatus } = useInternetIdentity();

  const isAuthenticated = !!identity;
  const principal = identity?.getPrincipal();
  const principalText = principal?.toString() || '';
  const shortPrincipal = principalText ? `${principalText.slice(0, 5)}...${principalText.slice(-3)}` : '';

  return {
    isAuthenticated,
    principal,
    principalText,
    shortPrincipal,
    login,
    logout: clear,
    loginStatus,
  };
}
