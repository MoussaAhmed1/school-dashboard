"use client";

import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import PendingRequestsList from "@/components/details/request-card/requests-list";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ITEMS_PER_PAGE } from "@/constants/data";
import { HistoryOfRequests } from "@/types/watches/requests";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { endpoints } from "@/utils/axios-client";
import Cookies from "js-cookie";

type paramsProps = {
  params: { lang: "ar" | "en" };
};

// Client-side fetch function
const fetchRequestsClient = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  status = "PENDING",
  filters,
  accessToken,
  lang,
}: {
  page?: number;
  limit?: number;
  status?: string;
  filters?: string;
  lang?: string;
  accessToken?: string;
}): Promise<any> => {
  let filterQueries;
  if (filters) {
    filterQueries = `filters=user.name%3D${filters}%2Cstatus%3D${status}&filters=number%3D${filters}%2Cstatus%3D${status}`;
  }

  const url = `${process.env.NEXT_PUBLIC_HOST_API}${
    endpoints.watches.history_request
  }?page=${page}&limit=${limit}&sortBy=created_at=desc&${filterQueries}&filters=status%3D${status}&t=${Date.now()}`;

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

    const requestsRes = await res.json();
    return { data: requestsRes };
  } catch (error: any) {
    console.error("Error fetching requests:", error);
    return {
      error: error.message || "Failed to fetch requests",
    };
  }
};

export default function PendingRequestsPage({ params }: paramsProps) {
  const searchParams = useSearchParams();
  const t = useTranslations("navigation");

  const [requests, setRequests] = useState<HistoryOfRequests[]>([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || ITEMS_PER_PAGE;
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const accessToken = Cookies.get("access_token");
      const lang = Cookies.get("Language");
      try {
        const res = await fetchRequestsClient({
          page,
          limit,
          status: "PENDNING",
          filters: search,
          lang: lang,
          accessToken: accessToken,
        });

        if (res.error) {
          setError(res.error);
        } else {
          const requestsData: HistoryOfRequests[] = res?.data?.data || [];
          const total = res?.data?.meta?.total || 0;
          const pages = Math.ceil(total / limit);

          setRequests(requestsData);
          setTotalRequests(total);
          setPageCount(pages);
        }
      } catch (err) {
        setError("Failed to fetch requests");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit, search]);

  const breadcrumbItems = [{ title: t("home"), link: `/dashboard` }];

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Skeleton className="h-8 w-48" />
        </div>
        <Separator />
        <div className="rounded-md border h-[75vh] p-2">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-20 w-full" />
                <Separator />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`${t("home")} (0)`} />
        </div>
        <Separator />
        <div className="rounded-md border h-[75vh] p-2 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-2">No requests</p>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading title={`${t("home")}`} />
      </div>
      <Separator />
      <PendingRequestsList
        _requests={requests}
        status="PENDNING"
        pageCount={pageCount}
      />
    </div>
  );
}
