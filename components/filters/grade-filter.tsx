"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { endpoints } from "@/utils/axios-client";

type Grade = {
  id: string;
  name: string;
};

interface GradeFilterProps {
  selectedGradeId: string;
  onGradeChange: (gradeId: string) => void;
}

export default function GradeFilter({
  selectedGradeId,
  onGradeChange,
}: GradeFilterProps) {
  const t = useTranslations("navigation");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [gradesLoading, setGradesLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setGradesLoading(true);
      try {
        const accessToken = Cookies.get("access_token_school");
        const lang = Cookies.get("Language") || "en";
        const role = Cookies.get("role");
        const schoolId = Cookies.get("school_id");

        if (!accessToken || !schoolId) {
          setGrades([]);
          return;
        }

        const baseUrl = process.env.NEXT_PUBLIC_HOST_API;
        if (!baseUrl) {
          setGrades([]);
          return;
        }

        const url =
          role === "SCHOOL"
            ? `${baseUrl}${endpoints.grades.fetch}/${schoolId}`
            : `${baseUrl}user/${schoolId}/grades`;

        const res = await fetch(url, {
          method: "GET",
          cache: "no-store",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Accept-Language": lang,
          },
        });

        if (!res.ok) {
          console.error(`Error ${res.status}: ${res.statusText}`);
          setGrades([]);
        } else {
          const data = await res.json();
          const gradesArr = Array.isArray(data?.data) ? data.data : [];
          setGrades(gradesArr);
        }
      } catch (error) {
        console.error("Error fetching grades:", error);
        setGrades([]);
      } finally {
        setGradesLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex items-center gap-4 w-full justify-end">
      <div className="flex items-center gap-2">
        <label htmlFor="grade-filter" className="text-sm font-medium">
          {t("filterByGrade")}:
        </label>
        {grades && (
          <Select
            value={selectedGradeId}
            onValueChange={onGradeChange}
            dir="rtl"
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t("selectGrade")} />
            </SelectTrigger>
            <SelectContent>
              {!gradesLoading && (
                <SelectItem value="">{t("allGrades")}</SelectItem>
              )}
              {gradesLoading ? (
                <SelectItem value="" disabled>
                  {t("loadingGrades")}
                </SelectItem>
              ) : (
                grades?.map((grade) => (
                  <SelectItem key={grade.id} value={grade.id}>
                    {grade.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
