"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function NotAllowedPage() {
  const params = useParams();
  const lang = params.lang;
  const t = useTranslations("pages.notAllowed");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t("title")}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {t("description")}
        </p>

        <div className="space-y-4">
          <Link href={`/${lang}/dashboard/pending-requests`}>
            <Button className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("goToDashboard")}
            </Button>
          </Link>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.history.back()}
          >
            {t("goBack")}
          </Button>
        </div>
      </div>
    </div>
  );
}
