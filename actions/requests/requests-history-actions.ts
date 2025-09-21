"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import axiosInstance, {
  endpoints,
  getErrorMessage,
  Params,
} from "../../utils/axios-client";
import { ITEMS_PER_PAGE } from "@/constants/data";
import { revalidatePath } from "next/cache";

export const fetchRequests = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  status = "PENDING",
  filters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token_school")?.value;
  let filterQueries;
  if (filters) {
    filterQueries = `filters=user.name%3D${filters}%2Cstatus%3D${status}&filters=number%3D${filters}%2Cstatus%3D${status}`;
  }

  const url = `${process.env.NEXT_PUBLIC_HOST_API}${endpoints.watches.history_request}?page=${page}&limit=${limit}&sortBy=created_at=desc&${filterQueries}&filters=status%3D${status}&t=${Date.now()}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": `${lang}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    let requestsRes = await res.json();
    return { data: requestsRes };
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};
export const fetchSingleRequest = async (id: string): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token_school")?.value;
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

export const ConfirmRequest = async (request_id: string): Promise<any> => {
  const lang = cookies().get("Language")?.value;

  try {
    const accessToken = cookies().get("access_token_school")?.value;
    await axiosInstance.post(
      endpoints.watches.confirm_request,
      { request_id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    revalidatePath("/pending-requests");
    revalidatePath("/confirmed-requests");
    revalidatePath("/history-of-requests");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
