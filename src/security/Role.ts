const ALL_ROLES = ["USER", "ADMIN"] as const;

type Role = typeof ALL_ROLES[number];

export { ALL_ROLES };
export type { Role };
