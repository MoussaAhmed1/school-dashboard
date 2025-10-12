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

type Grade = {
  id: string;
  name: string;
};

export const fetchGrades = async (): Promise<Grade[]> => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token_school")?.value;
    const role = cookieStore.get("role")?.value;
    const lang = cookieStore.get("Language")?.value || "en";
    const schoolId = cookieStore.get("school_id")?.value;

    if (!accessToken || !schoolId) {
      console.warn("Missing required cookies: accessToken or schoolId");
      return [];
    }

    const baseUrl = process.env.NEXT_PUBLIC_HOST_API;
    if (!baseUrl) {
      console.error("Missing NEXT_PUBLIC_HOST_API environment variable");
      return [];
    }

    const url =
      role === "SCHOOL"
        ? `${baseUrl}${endpoints.grades.fetch}/${schoolId}`
        : `${baseUrl}user/${schoolId}/grades`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store", // disable caching for fresh data
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });

    if (!res.ok) {
      console.error(`Error ${res.status}: ${res.statusText}`);
      return [];
    }

    const data = await res.json();

    // Gracefully handle any unexpected data structure
    const grades = Array.isArray(data?.data) ? data.data : [];

    return grades;
  } catch (error) {
    console.error("Error fetching grades:", error);
    return [];
  }
};

export const fetchRequests = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  status = "PENDING",
  filters,
  gradeId,
}: Params & { gradeId?: string }): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token_school")?.value;
  let filterQueries = `filters=status%3D${status}`;
  
  if (filters) {
    filterQueries += `&filters=user.name%3D${filters}%2Cstatus%3D${status}&filters=number%3D${filters}%2Cstatus%3D${status}`;
  }
  
  if (gradeId) {
    filterQueries += `%2Cgrade_id%3D${gradeId}`;
  }

  const url = `${process.env.NEXT_PUBLIC_HOST_API}${endpoints.watches.history_request}?page=${page}&limit=${limit}&sortBy=created_at=desc&${filterQueries}&t=${Date.now()}`;
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
