"use client"

import { HistoryOfRequests } from "@/types/watches/requests"
import RequestCard from "./request-card"
import { Separator } from "@radix-ui/react-separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Noitems from "../no-items/NoItems";
import { Box } from "lucide-react";
import { useEffect, useState } from "react";
interface IProps {
    requests: HistoryOfRequests[];
    gradeId?: string;
}

function CompletedRequestsList({ requests }: IProps) {
    return (
        <ScrollArea className="rounded-md border h-[75vh] p-2" >
            {
            requests.length > 0 ? (
                requests.map((request) => (
                    <div key={request.id} className="w-full">
                        <RequestCard

                            request={request}
                        />
                        <Separator className="my-4 w-full" />
                    </div>
                )))
                : (
                    <div className="w-full">
                      <Noitems
                        title={"noRequests"}
                        icon={<Box style={{ color: "gray", fontSize: "4.2em" }} />}
                      />
                    </div>
      
                  )}
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    )
}

export default CompletedRequestsList