import React, { useContext } from "react";
import { AuthenticationContext } from "./AuthenticationProvider";
import type { Authority } from "./Authority";
import { authorizePrincipal } from "./authorization/authorizePrincipal";
import type { Role } from "./Role";

interface RequiredAuthorizedProps {
  readonly FallbackComponent?: React.ComponentType;

  readonly requiredRoles?: ReadonlyArray<Role>;

  readonly requiredAuthorities?: ReadonlyArray<Authority>;
}

const RequiredAuthorized: React.FC<RequiredAuthorizedProps> = ({
  children,
  FallbackComponent = undefined,
  requiredRoles = [],
  requiredAuthorities = [],
}) => {
  const { principal } = useContext(AuthenticationContext);

  if (
    principal.isAuthenticated &&
    authorizePrincipal(principal, requiredRoles, requiredAuthorities)
  ) {
    return <>{children}</>;
  }

  if (FallbackComponent) {
    return <FallbackComponent />;
  }

  return null;
};

type AdminOnlyProps = Pick<
  RequiredAuthorizedProps,
  "FallbackComponent" | "requiredAuthorities"
>;

const AdminOnly: React.FC<AdminOnlyProps> = ({
  children,
  FallbackComponent,
  requiredAuthorities,
}) => {
  return (
    <RequiredAuthorized
      FallbackComponent={FallbackComponent}
      requiredRoles={["ADMIN"]}
      requiredAuthorities={requiredAuthorities}
    >
      {children}
    </RequiredAuthorized>
  );
};

type UserOnlyProps = Pick<
  RequiredAuthorizedProps,
  "FallbackComponent" | "requiredAuthorities"
>;

const UserOnly: React.FC<UserOnlyProps> = ({
  children,
  FallbackComponent,
  requiredAuthorities,
}) => {
  return (
    <RequiredAuthorized
      FallbackComponent={FallbackComponent}
      requiredRoles={["USER"]}
      requiredAuthorities={requiredAuthorities}
    >
      {children}
    </RequiredAuthorized>
  );
};

export { AdminOnly, UserOnly };
