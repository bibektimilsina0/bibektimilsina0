// src/hooks/auth/useAuthMutations.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      });
      if (error) {
        throw new Error(
          error.message || "Invalid email or password. Please try again.",
        );
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Registration Successful! Please login to continue.");
      router.push("/login");
    },
  });
}

export function useEmailLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      email,
      password,
      rememberMe,
      callbackURL,
    }: {
      email: string;
      password: string;
      rememberMe: boolean;
      callbackURL: string;
    }) => {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
        callbackURL,
      });
      if (error) {
        throw new Error(
          error.message || "Invalid email or password. Please try again.",
        );
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success("Login Successful");

      if (data?.url) {
        router.push(data.url);
      } else {
        router.push("/dashboard");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Login failed");
    },
  });
}
export function useLogout() {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      await authClient.signOut();
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      router.prefetch("/login");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Logout failed");
    },
  });
}
