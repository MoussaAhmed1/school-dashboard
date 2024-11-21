"use client"

import { HistoryOfRequests } from "@/types/watches/requests"
import RequestCard from "./request-cards"
import { Separator } from "@radix-ui/react-separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
interface IProps {
    requests: HistoryOfRequests[]

}

function RequestsList({ requests }: IProps) {
    return (
        <ScrollArea className="max-h-[75vh] ">
            {
                requests.map((request) => (
                    <>
                        <RequestCard
                            key={request.id}
                            request={request}
                        />
                        <Separator className="my-4 w-full" />
                    </>
                ))
            }
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    )
}

export default RequestsList