import type { AuthenticatedPrincipal } from "../Principal";
import { isNonEmptyArray } from "../../types/NonEmptyArray";
import type { ReadonlyNonEmptyArray } from "../../types/NonEmptyArray";
import type { Role } from "../Role";
import type { Authority } from "../Authority";

type HasRoles = (
  principal: AuthenticatedPrincipal,
  roles: ReadonlyNonEmptyArray<Role>
) => boolean;
const hasRoles: HasRoles = (principal, roles) =>
  roles.every((role) => principal.roles.includes(role));

type HasAuthorities = (
  principal: AuthenticatedPrincipal,
  authorities: ReadonlyNonEmptyArray<Authority>
) => boolean;
const hasAuthorities: HasAuthorities = (principal, authorities) =>
  authorities.every((authority) => principal.authorities.includes(authority));

type AuthorizePrincipal = (
  principal: AuthenticatedPrincipal,
  requiredRoles: ReadonlyArray<Role>,
  requiredAuthorities: ReadonlyArray<Authority>
) => boolean;
const authorizePrincipal: AuthorizePrincipal = (
  principal,
  requiredRoles,
  requiredAuthorities
) => {
  if (isNonEmptyArray(requiredRoles)) {
    if (!hasRoles(principal, requiredRoles)) {
      return false;
    }
  }

  if (isNonEmptyArray(requiredAuthorities)) {
    if (!hasAuthorities(principal, requiredAuthorities)) {
      return false;
    }
  }

  return true;
};

const isAdmin = (principal: AuthenticatedPrincipal) =>
  authorizePrincipal(principal, ["ADMIN"], []);
const isUser = (principal: AuthenticatedPrincipal) =>
  authorizePrincipal(principal, ["USER"], []);

export { authorizePrincipal, isAdmin, isUser };
