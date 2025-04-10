import { LoginBody, LoginResponse, SignupBody, SignupResponse } from "@/types";
import { apiRequest } from "./api-config";

export async function signup(data: SignupBody): Promise<SignupResponse> {
  const response = await apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}

export async function login(data: LoginBody): Promise<LoginResponse> {
  const response = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}
