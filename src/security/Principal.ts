import type { Authority } from "./Authority";
import type { Role } from "./Role";
import type { ReadonlyNonEmptyArray } from "../types/NonEmptyArray";

type AuthenticatedPrincipal = {
  readonly isAuthenticated: true;
};

type UnauthenticatedPrincipal = {
  readonly isAuthenticated: false;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AnonymousUser extends UnauthenticatedPrincipal {}

interface AuthenticatedUser extends AuthenticatedPrincipal {
  readonly isAuthenticated: true;

  readonly identity: string;

  readonly roles: ReadonlyNonEmptyArray<Role>;

  readonly authorities: ReadonlyArray<Authority>;
}

type Principal = AnonymousUser | AuthenticatedUser;

export type {
  AnonymousUser,
  AuthenticatedUser,
  Principal,
  AuthenticatedPrincipal,
  UnauthenticatedPrincipal,
};
