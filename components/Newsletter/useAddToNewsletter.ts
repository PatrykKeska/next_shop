import { useMutation } from "@tanstack/react-query";

export const useAddToNewsletter = () =>
  useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        return Promise.reject(new Error("Something went wrong !"));
      }

      return response;
    },
  });
