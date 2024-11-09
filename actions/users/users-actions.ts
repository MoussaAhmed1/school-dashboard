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

export const fetchSecurity = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  role,
  filters,
  otherfilters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance.get(endpoints.users.fetch, {
      params: {
        page,
        limit,
        filters:`roles=${role}`,
        sortBy: "created_at=desc",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    return res;
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const fetchStudents = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance.get(endpoints.users.fetchStudents, {
      params: {
        page,
        limit,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    return res;
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const AddSecurity = async (formData: FormData,role:"security"): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    
    try {
      const schoolId = cookies().get("school_id")?.value;
      const accessToken = cookies().get("access_token")?.value;
      formData.set("school_id", schoolId ?? "");
      await axiosInstance.post(endpoints.users.register, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
          "Content-Type": "multipart/form-data",
        },
      });
  
      revalidatePath(`/dashboard/security`);
    } catch (error) {
      return {
        error: getErrorMessage(error),
      };
    }
  };

export const removeUser = async ({id,revalidateData}:{id:string,revalidateData?:string}): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    try {
      const accessToken = cookies().get("access_token")?.value;
      await axiosInstance.delete(endpoints.users.delete, {
        params: {
          id
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
          "Content-Type": "multipart/form-data",
        },
      });
  
      revalidatePath("/dashboard/security");
      if (revalidateData) {
        revalidatePath(revalidateData);
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
      };
    }
  };


  export const UpdateUser = async (formData: FormData,role:"security",id?:string): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    try {
      const accessToken = cookies().get("access_token")?.value;
      await axiosInstance.put(endpoints.users.update, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
          "Content-Type": "multipart/form-data",
        },
        params: {
          id
        }
      });
      if (role) {
        revalidatePath(`/dashboard/${role}`);
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
      };
    }
  };

export const UpdateAdminProfile = async (formData: FormData): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    try {
      const accessToken = cookies().get("access_token")?.value;
     const res = await axiosInstance.put(endpoints.users.update, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
          "Content-Type": "multipart/form-data",
        },
      });
        revalidatePath(`/dashboard/profile`);
        return res?.data?.data;
    } catch (error) {
      return {
        error: getErrorMessage(error),
      };
    }
  };