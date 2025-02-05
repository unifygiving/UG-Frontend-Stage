import { useQuery } from "@tanstack/react-query";

function useCustomQuery(queryFn, queryKey, options = {}) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
    ...options,
  });
}

export default useCustomQuery;
