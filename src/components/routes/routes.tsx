const ALL_PAGE_NAMES = ["login", "admin", "user"] as const;
type PageName = typeof ALL_PAGE_NAMES[number];

type PageRoute = { readonly path: string };
type Routes = { readonly [key in PageName]: PageRoute };

const routes: Routes = {
  login: {
    path: "/login",
  },
  admin: {
    path: "/admin",
  },
  user: {
    path: "/user",
  },
} as const;

export { routes };
export type { PageRoute, Routes };
