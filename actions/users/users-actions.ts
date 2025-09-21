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
  const accessToken = cookies().get("access_token_school")?.value;
  try {
    const res = await axiosInstance.get(endpoints.users.fetch, {
      params: {
        page,
        limit,
        filters:filters?[`name=${filters},roles=${role}`,`phone=${filters},roles=${role}`,`email=${filters},roles=${role}`]:`roles=${role}`,
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
  const accessToken = cookies().get("access_token_school")?.value;
  try {
    const res = await axiosInstance.get(endpoints.users.fetchStudents, {
      params: {
        page,
        limit,
        filters:filters?[`name=${filters}`,`parent.name=${filters}`,`parent.phone=${filters}`,`parent.email=${filters}`]:``,
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
      const accessToken = cookies().get("access_token_school")?.value;
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
      const accessToken = cookies().get("access_token_school")?.value;
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
      const accessToken = cookies().get("access_token_school")?.value;
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
      const accessToken = cookies().get("access_token_school")?.value;
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

  export const fetchCities = async (): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    const accessToken = cookies().get("access_token_school")?.value;
    try {
      const res = await axiosInstance.get(endpoints.users.cities, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      });
      return(res.data.data)
    } catch (error: any) {
      return {
        error: getErrorMessage(error),
      };
    }
  };
  export const fetchSchoolGrades = async (): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    const accessToken = cookies().get("access_token_school")?.value;
    const schoolId = cookies().get("school_id")?.value;
    try {
      const res = await axiosInstance.get(`/auth/school/grades/${schoolId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      });
      return(res.data.data)
    } catch (error: any) {
      return {
        error: getErrorMessage(error),
      };
    }
  };
  export const fetchUserGrades = async (user_id:string): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    const accessToken = cookies().get("access_token_school")?.value;
    try {
      const res = await axiosInstance.get(`/user/${user_id}/grades`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      });
      return(res.data.data)
    } catch (error: any) {
      return {
        error: getErrorMessage(error),
      };
    }
  };

  export const postUserGrades = async (user_id:string,grades_ids:string[]): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    const accessToken = cookies().get("access_token_school")?.value;
    try {
      const res = await axiosInstance.post(`/auth/add/security/grade`,{user_id,grades_ids}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      });
      return(res.data.data)
    } catch (error: any) {
      return {
        error: getErrorMessage(error),
      };
    }
  };

  export const fetchWorkHours = async (): Promise<any> => {
    const accessToken = cookies().get("access_token_school")?.value;
    try {
      const res = await axiosInstance.get(`/user/school/work-hours`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return(res.data.data)
    } catch (error: any) {
      return {
        error: getErrorMessage(error),
      };
    }
  };

  export const updateWorkTimes = async ({data}:{data:{
    id: string
    start_time: string
    end_time: string
    is_active: boolean
  }}): Promise<any> => {
    const accessToken = cookies().get("access_token_school")?.value;
    try {
      const res = await axiosInstance.put(`/user/school/work-hours`,data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error: any) {
      return {
        error: getErrorMessage(error),
      };
    }
  };