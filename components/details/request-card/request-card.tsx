"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HistoryOfRequests } from "@/types/watches/requests";
import { convertUtcToLocal } from "@/utils/helperFunctions";
import { AvatarImage } from "@radix-ui/react-avatar";
import { CheckCheck, Eye, GraduationCap, Hash} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Cookie from 'js-cookie';
import Approve from "@/components/shared/table/Approve";
import { ConfirmRequest } from "@/actions/requests/requests-history-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon } from 'lucide-react'
interface IProps {
    request: HistoryOfRequests;
    approveRequestArray?: (id: string) => void;
}

function RequestCard({ request, approveRequestArray }: IProps) {
    const router = useRouter();
    const tUser = useTranslations("pages.users");
    const currentLang = Cookie.get("Language") ?? "en";
    return (
        <Card className="w-full bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors duration-200" dir={currentLang === "ar" ? "rtl" : "ltr"}>
            <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center gap-1  text-gray-500 dark:text-white mx-2">
                        <Avatar className="w-12 h-12">
                            <AvatarImage
                                src={request?.watch_user?.avatar ?? ""}
                                alt={request?.watch_user?.avatar ?? ""}
                            />
                            <AvatarFallback>{request?.watch_user?.name[0]}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold dark:text-white">{request?.watch_user?.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground dark:text-gray-300" dir="ltr">
                            <Hash className="h-4 w-4" />
                            <span className="mr-2 hidden md:block ">{request?.number}</span>
                           <GraduationCap  className="mx-2 h-4 w-4 mr-1" />
                           <span>{request?.grade?.name}</span>
                            <CalendarIcon className="mx-2 h-4 w-4 mr-1" />
                           <span>{convertUtcToLocal(request?.updated_at)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <div className="flex items-baseline gap-2 py-1 ">
                        <Button
                            variant={"ghost"}
                            className="sm:mt-0 p-3 rounded-lg"
                            onClick={() => router.push(`/dashboard/${request?.status === "COMPLETED" ? "history-of-requests" : request?.status === "PENDNING" ?"pending-requests":"confirmed-requests"}/${request.id}`)}
                        >
                            <Eye className="mx-1 h-5 w-5 text-gray-600" />

                        </Button>
                        {request?.status === "PENDNING" && <Approve successMessage={tUser("requestApprovedSuccessfully")} title={tUser("approveRequest")} defualt method={ConfirmRequest} id={request?.id} extraFunction={approveRequestArray} >
                            <Button className="sm:mt-0 p-3 bg-blue-500 hover:bg-blue-600 font-bold text-white md:text-lg rounded-lg shadow-md">
                                <CheckCheck className="mx-1 h-5 w-5 text-gray-100" />
                            </Button>
                        </Approve>}

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default RequestCard