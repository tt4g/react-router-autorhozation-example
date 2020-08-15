import type { Principal, AuthenticatedPrincipal } from "../Principal";

type AuthenticatedResult = Principal & AuthenticatedPrincipal;

interface AuthenticationSuccess {
  readonly isAuthenticated: true;
  readonly result: AuthenticatedResult;
}

interface AuthenticationFailed {
  readonly isAuthenticated: false;
}

type AuthenticationResult = AuthenticationSuccess | AuthenticationFailed;

export type { AuthenticationResult };
