"use client";

import { useState } from "react";
import { fetchRequests } from "@/actions/requests/requests-history-actions";
import { HistoryOfRequests } from "@/types/watches/requests";
import NavigationLoader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";



function LoadMore({
  requests,
  setRequests,
  approveRequestArray,
  pageCount, page, setPage, btnTitle
}: {
  requests: HistoryOfRequests[],
  setRequests: (requests: HistoryOfRequests[]) => void,
  approveRequestArray: (requestId: string) => void,
  pageCount: number
  page: number
  setPage: (page: number) => void
  btnTitle: string

}) {


  const [isLoading, setIsLoading] = useState(false);

  const LoadMoreFun = async () => {
    setIsLoading(true);
    try {
    const res = await fetchRequests({
        page:1,
        limit: 10,
        status: "PENDNING",
      });
      setRequests([...res?.data?.data,...requests ]);
      setPage(page + 1);
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false);
  };

  return (
    <>
      <section className="flex justify-center items-center w-full">
        <div >
          {isLoading ? (
            <NavigationLoader />
          ) :
            (
              <Button
                variant="outline"
                size="lg"
                disabled={isLoading || page >= pageCount}
                onClick={async() => {
                  if (page < pageCount) {
                   await LoadMoreFun();
                  }
                }}
                className="flex items-center justify-center whitespace-pre-wrap break-words"
              >
                {
                  btnTitle
                }
              </Button>
            )}
        </div>
      </section>
    </>
  );
}

export default LoadMore;
