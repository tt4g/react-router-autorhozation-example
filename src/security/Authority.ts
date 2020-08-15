const ALL_AUTHORITIES = ["CREATE", "EDIT", "DELETE"] as const;

type Authority = typeof ALL_AUTHORITIES[number];

export { ALL_AUTHORITIES };
export type { Authority };
