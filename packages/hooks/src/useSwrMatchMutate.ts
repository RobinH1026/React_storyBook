import { useSWRConfig } from "swr";

export default function useSwrMatchMutate() {
  const { cache, mutate } = useSWRConfig();
  return (matcher: RegExp, ...args: any) => {
    if (!(cache instanceof Map)) {
      throw new Error(
        "matchMutate requires the cache provider to be a Map instance"
      );
    }

    const matchedKeys: string[] = [];
    const keys = Array.from(cache.keys());

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i] as string;
      if (matcher.test(key)) {
        matchedKeys.push(key);
      }
    }

    const mutations = matchedKeys.map((key) => mutate(key, ...args));
    return Promise.all(mutations);
  };
}
