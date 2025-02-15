import { fetchRequests } from "@/actions/requests/requests-history-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import CompletedRequestsList from "@/components/details/request-card/compeleted-request-list";
import PendingRequestsList from "@/components/details/request-card/requests-list";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ITEMS_PER_PAGE } from "@/constants/data";
import { HistoryOfRequests } from "@/types/watches/requests";
import Pagination from "@/components/shared/table/Pagination";
import SearchInput from "@/components/shared/table/SearchInput";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params: { lang: "ar" | "en" }
};


export default async function page({ searchParams, params }: paramsProps) {

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
    typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchRequests({
    page,
    limit,
    status: "CONFIRMED", 
    filters: search,
  });
  const totalRequests = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalRequests / limit);
  const requests: HistoryOfRequests[] = res?.data?.data || [];
  const { navigation } = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: navigation.confirmedRequests, link: `/dashboard` }];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6 ">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${navigation.confirmedRequests} (${totalRequests})`}
          />
        </div>
        <Separator />        
        <SearchInput searchKey={"search"} />
        <CompletedRequestsList requests={requests} />
        <Pagination
          pageNo={page}
          pageCount={pageCount}
          totalitems={totalRequests}
        />
      </div>
    </>
  );
}
