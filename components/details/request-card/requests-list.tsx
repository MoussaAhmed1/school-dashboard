"use client"

import { HistoryOfRequests } from "@/types/watches/requests"
import RequestCard from "./request-card"
import { Separator } from "@radix-ui/react-separator"
import { socket } from "@/app/socket";
import { useCallback, useEffect, useState } from "react";
import Cookie from 'js-cookie';
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "next-intl";
import Noitems from "../no-items/NoItems";
import { Box } from "lucide-react";

interface IProps {
    _requests: HistoryOfRequests[];
    status: "COMPLETED" | "PENDNING"| "CONFIRMED";
    pageCount:number;
    gradeId?: string;
}

function PendingRequestsList({ _requests=[], status,pageCount, gradeId }: IProps) {
    const school_id = Cookie.get("school_id");
    const { toast } = useToast();
    const t = useTranslations("tableColumns");
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    const [requests, setRequests] = useState<HistoryOfRequests[]>(_requests);
    const [filteredRequests, setFilteredRequests] = useState<HistoryOfRequests[]>(_requests);
    const [page, setPage] = useState(2);
    const approveRequestArray = useCallback(
        (requestId: string) => {
            const updatedRequestsArray = requests.filter(obj => obj.id !== requestId);
            setRequests(updatedRequestsArray);
        },
        [requests],
    )

    // Filter requests by gradeId
    useEffect(() => {
        if (gradeId) {
            const filtered = requests.filter(request => request.grade?.id === gradeId);
            setFilteredRequests(filtered);
        } else {
            setFilteredRequests(requests);
        }
    }, [requests, gradeId]);

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            // socket.io.engine.on("upgrade", (transport) => {
            //     setTransport(transport.name);
            // });
        }

        socket.on(`new-request-${school_id}`, (request: HistoryOfRequests) => {
            //create a new request object and add it to the requests list if it was request            
            if (status == request?.status) {
                const isExist = requests.find(req => req.id === request?.id)
                if (isExist) {
                    const updatedRequestsArray = requests.filter(obj => obj.id !== request.id);
                    setRequests([request, ...updatedRequestsArray]);
                }
                else {
                    setRequests(prev=>[request,...prev]);
                }
            }
        });

        function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
        }
        
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        
        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off(`new-request-${school_id}`);
        };
    }, [requests, school_id, status, toast]);
    return (
        <div className="rounded-md border h-[75vh] p-2" >
            {filteredRequests?.length > 0 ?
                filteredRequests.map((request, index) => (
                    <div key={request.id} className="w-full">
                        <RequestCard
                            request={request}
                            approveRequestArray={approveRequestArray}
                        />
                        <Separator className="my-4 w-full" />
                    </div>
                ))
                : (
                    <div className="w-full">
                      <Noitems
                        title={"noRequests"}
                        icon={<Box style={{ color: "gray", fontSize: "4.2em" }} />}
                      />
                    </div>
      
                  )}
            {/* {
            <LoadMore btnTitle={t("loadMore")} page={page} setPage={setPage} pageCount={pageCount} approveRequestArray={approveRequestArray} requests={requests} setRequests={setRequests}/>
            } */}
        </div>
    )
}

export default PendingRequestsList

