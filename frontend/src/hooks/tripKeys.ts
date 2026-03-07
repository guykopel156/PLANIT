const TRIPS_KEY = ['trips'] as const;

function tripKey(id: string): readonly [string, string] {
  return ['trips', id] as const;
}

export { TRIPS_KEY, tripKey };
