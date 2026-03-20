import { useAuthStore } from "@share/model/useAuthStore.ts";

export default function useAuthedFetch() {
  const accessToken = useAuthStore((state) => state.accessToken);

  const doFetch = (url: string, options: RequestInit = {}) => {
    const isFormData = options.body instanceof FormData;

    return fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...(!isFormData && { "content-type": "application/json" }),
        Authorization: `Bearer ${accessToken}`,
        ...(options.headers || {}),
      },
      body: options.body && isFormData ? options.body : JSON.stringify(options.body),
    });
  };

  return {
    request: doFetch,
  };
}
