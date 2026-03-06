export const USERS_KEY = ["users"] as const;

export function userKey(id: string): readonly [string, string] {
  return ["users", id] as const;
}
