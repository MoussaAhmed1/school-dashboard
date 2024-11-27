"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import axiosInstance, {
  endpoints,
  getErrorMessage,
  Params,
} from "../../utils/axios-client";
import { ITEMS_PER_PAGE } from "@/constants/data";


export const fetchRequests = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  status = "PENDING",
}: Params): Promise<any> => {
  console.log("commming to here");
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance.get(endpoints.watches.history_request, {
      params: {
        page,
        limit,
        filters:`status=${status}`,
        sortBy: "created_at=desc",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return {
      error: getErrorMessage(error),
    };
  }
};
export const fetchSingleRequest = async (id: string): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(`${endpoints.watches.get_single}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const ConfirmRequest = async (request_id:string): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  
  try {
    const accessToken = cookies().get("access_token")?.value;
    await axiosInstance.post(endpoints.watches.confirm_request, {request_id}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });

    revalidatePath(`/dashboard/history-of-requests`);
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};