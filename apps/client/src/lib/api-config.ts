const PROD_API_URL = "/api";

const DEV_API_URL = "http://localhost:4000";

export const API_URL = import.meta.env.PROD ? PROD_API_URL : DEV_API_URL;

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  const defaultOptions: RequestInit = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // console.log(`Making API request to: ${url}`);
  return fetch(url, fetchOptions);
}
