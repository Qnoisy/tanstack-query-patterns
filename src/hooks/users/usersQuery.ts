import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { usersApi } from "../../api/usersApi";

export const USERS_QUERY_KEY = ["users"];

export function useUsersQuery({
  page = 1,
  limit = 5,
}: {
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: [...USERS_QUERY_KEY, page],
    queryFn: () => usersApi.getUsers({ page, limit }),
    placeholderData: keepPreviousData,
  });
}
