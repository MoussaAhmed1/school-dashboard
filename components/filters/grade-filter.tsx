"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";

type Grade = {
  id: string;
  name: string;
};

interface GradeFilterProps {
  grades: Grade[];
  gradesLoading: boolean;
  selectedGradeId: string;
  onGradeChange: (gradeId: string) => void;
}

export default function GradeFilter({
  grades,
  gradesLoading,
  selectedGradeId,
  onGradeChange,
}: GradeFilterProps) {
  const t = useTranslations("navigation");

  return (
    <div className="flex items-center gap-4 w-full justify-end">
      <div className="flex items-center gap-2">
        <label htmlFor="grade-filter" className="text-sm font-medium">
          {t("filterByGrade")}:
        </label>
        <Select value={selectedGradeId} onValueChange={onGradeChange} dir="rtl">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t("selectGrade")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">{t("allGrades")}</SelectItem>
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
      </div>
    </div>
  );
}
