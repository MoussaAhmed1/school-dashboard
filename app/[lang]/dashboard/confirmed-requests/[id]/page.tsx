import { Metadata } from "next";

import { ISingleRequest } from "@/types/watches/requests";
import { fetchSingleRequest } from "@/actions/requests/requests-history-actions";
import { getDictionary } from "@/app/[lang]/messages";
import ConfirmedRequestDetailsView from "@/components/details/confirmed-request-details";

export const metadata: Metadata = {
  title: "Requests Details | Dacatra Dashboard",
};
export const revalidate = 0;
export const dynamic = "auto";
const page = async ({
  params,
}: {
  params: { id: string; lang: "ar" | "en" };
}) => {
  const res = await fetchSingleRequest(params.id);
  const request: ISingleRequest = res?.data?.data;
  const { pages, navigation } = await getDictionary(params?.lang);
  return (
    <ConfirmedRequestDetailsView
      request={request}
      pages={pages}
      navigation={navigation}
    />
  );
};

export default page;
