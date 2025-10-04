"use client";

import { fetchRequests, fetchGrades } from "@/actions/requests/requests-history-actions";
import BreadCrumb from "@/components/breadcrumb";
import CompletedRequestsList from "@/components/details/request-card/compeleted-request-list";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ITEMS_PER_PAGE } from "@/constants/data";
import { HistoryOfRequests } from "@/types/watches/requests";
import Pagination from "@/components/shared/table/Pagination";
import SearchInput from "@/components/shared/table/SearchInput";
import GradeFilter from "@/components/filters/grade-filter";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";

type paramsProps = {
  params: { lang: "ar" | "en" };
};

type Grade = {
  id: string;
  name: string;
};

export default function ConfirmedRequestsPage({ params }: paramsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("navigation");

  const [requests, setRequests] = useState<HistoryOfRequests[]>([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [gradesLoading, setGradesLoading] = useState(true);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || ITEMS_PER_PAGE;
  const search = searchParams.get("search") || "";
  const gradeId = searchParams.get("gradeId") || "";

  // Function to handle grade selection
  const handleGradeChange = (selectedGradeId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedGradeId) {
      params.set("gradeId", selectedGradeId);
    } else {
      params.delete("gradeId");
    }
    params.set("page", "1"); // Reset to first page when filtering
    router.push(`?${params.toString()}`);
  };

  // Fetch grades on component mount
  useEffect(() => {
    const fetchGradesData = async () => {
      setGradesLoading(true);
      try {
        const gradesData: Grade[] = await fetchGrades();
        setGrades(gradesData);
      } catch (err) {
        console.error("Error fetching grades:", err);
      } finally {
        setGradesLoading(false);
      }
    };

    fetchGradesData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchRequests({
          page,
          limit,
          status: "CONFIRMED",
          filters: search,
          gradeId: gradeId,
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
  }, [page, limit, search, gradeId]);

  const breadcrumbItems = [{ title: t("confirmedRequests"), link: `/dashboard` }];

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
          <Heading title={`${t("confirmedRequests")} (0)`} />
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
        <Heading title={`${t("confirmedRequests")} (${totalRequests})`} />
      </div>
      
      {/* Grade Filter */}
      <GradeFilter
        grades={grades}
        gradesLoading={gradesLoading}
        selectedGradeId={gradeId}
        onGradeChange={handleGradeChange}
      />
      
      <Separator />
      <SearchInput searchKey={"search"} />
      <CompletedRequestsList requests={requests} gradeId={gradeId} />
      <Pagination
        pageNo={page}
        pageCount={pageCount}
        totalitems={totalRequests}
      />
    </div>
  );
}
