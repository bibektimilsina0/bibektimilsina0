// src/hooks/mutations/useContact.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message?: string;
}

export function useCreateContactMessage() {
  return useMutation({
    mutationFn: async (data: ContactMessageInput) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(
          typeof err.error === "string" ? err.error : "Failed to send message",
        );
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Message sent successfully! 🎉");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send message";
      toast.error(errorMessage);
    },
  });
}
