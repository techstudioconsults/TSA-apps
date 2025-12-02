import Cookies from "js-cookie";
import Router from "next/router";

interface LoginResponse {
  success: boolean;
  token?: string;
  refreshToken?: string;
  error?: string;
}

// interface APIError {
//   status?: number;
//   message: string;
//   details?: Record<string, unknown>;
// }

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const resultData = await response.json();

    // console.log(resultData);

    if (resultData.message === "success") {
      return {
        success: true,
        token: resultData.data.tokens.access,
        refreshToken: resultData.data.tokens.refresh,
      };
    }

    return {
      success: false,
      error: "Unexpected response from the server",
    };
  } catch (error) {
    console.error("Error in login action:", error);
    throw error;
  }
};

export const logout = () => {
  Cookies.remove("authToken", {
    path: "/",
  });
  Router.push("/login");
};
