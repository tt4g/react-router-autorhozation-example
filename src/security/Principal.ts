import type { ReadonlyNonEmptyArray } from "../types/NonEmptyArray";
import type { Authority } from "./Authority";
import type { Role } from "./Role";

type Authenticated = {
  readonly isAuthenticated: true;
};

type NotAuthenticated = {
  readonly isAuthenticated: false;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AnonymousUser extends NotAuthenticated {}

interface AuthenticatedUser extends Authenticated {
  readonly isAuthenticated: true;

  readonly identity: string;

  readonly roles: ReadonlyNonEmptyArray<Role>;

  readonly authorities: ReadonlyArray<Authority>;
}

type Principal = AnonymousUser | AuthenticatedUser;
type AuthenticatedPrincipal = Principal & Authenticated;

export type {
  AnonymousUser,
  AuthenticatedUser,
  Principal,
  Authenticated,
  NotAuthenticated,
  AuthenticatedPrincipal,
};
