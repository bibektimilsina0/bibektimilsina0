import { queryOptions, useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

// Query options for fetching the current user's profile data
export const userProfileQueryOptions = queryOptions({
  queryKey: ["current-user"],
  queryFn: async () => {
    try {
      const { data: session } = await authClient.getSession();

      const user = session;
      return user;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error instanceof Error
        ? error
        : new Error("Error fetching user data");
    }
  },
  retry: false,
  staleTime: 1 * 60 * 1000, // 1 minutes
});

// export hook to use the user profile query options
export const useUserProfile = () => {
  return useQuery(userProfileQueryOptions);
};