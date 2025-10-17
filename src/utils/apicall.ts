import axios, { AxiosError } from "axios";
import { getValueFor } from "../services/userService";

export const apiCalls = async <T = any>(params: ApiCalls): Promise<T> => {
  try {
    const res = await axios({
      url: `${process.env.EXPO_PUBLIC_RIDER_BACKEND_URL}/${params.url}`,
      method: params.method,
      data: params.body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getValueFor("authToken")}`,
      },
    });
    return res.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      `API Error [${params.method} ${params.url}]:`,
      axiosError.message
    );
    throw error;
  }
};

interface ApiCalls {
  url: string;
  body?: object;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
}
