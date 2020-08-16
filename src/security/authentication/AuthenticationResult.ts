import type { AuthenticatedPrincipal } from "../Principal";

interface AuthenticationSuccess {
  readonly isAuthenticated: true;
  readonly result: AuthenticatedPrincipal;
}

interface AuthenticationFailed {
  readonly isAuthenticated: false;
}

type AuthenticationResult = AuthenticationSuccess | AuthenticationFailed;

export type { AuthenticationResult };
