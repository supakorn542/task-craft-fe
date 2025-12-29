import { ApiError } from "@/api/generated";

export const getErrorMessage = (e: any): string => {
  if (e instanceof ApiError) {
    return e.body?.message || "Unknown API Error";
  }

  if (e?.response?.data?.message) {
    const msg = e.response.data.message;
    return Array.isArray(msg) ? msg[0] : msg;
  }

  return e?.message || "Something went wrong";
};
