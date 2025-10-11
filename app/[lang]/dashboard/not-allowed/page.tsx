import { useTranslations } from "next-intl";
import NotAllowedPage from "../../not-allowed/page";

export default function NotAllowedPageDashboard() {
  const t = useTranslations("common");

  return (
    <NotAllowedPage />
  );
}
