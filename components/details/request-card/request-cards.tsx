"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HistoryOfRequests } from "@/types/watches/requests";
import { formatCreatedAtDateAsDateTime } from "@/utils/helperFunctions";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Cookie from 'js-cookie';

interface IProps {
    request: HistoryOfRequests;
}

function RequestCard({ request }: IProps) {
    const router = useRouter();
    const t = useTranslations("tableActions");
    const currentLang = Cookie.get("Language") ?? "en";

    return (
        <section className="antialiased bg-[#FAFAFA] dark:bg-[#181D26] shadow rounded-xl" dir={currentLang === "ar" ? "rtl" : "ltr"}>
            <article
                className="w-full flex flex-wrap md:flex-nowrap shadow-lg  group  transform duration-500 hover:-translate-y-1 rounded-xl">
                <div className="w-full">
                    <div className="p-2 pb-2 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-1 text-2xl font-semibold text-gray-800 dark:text-white mt-2">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage
                                        src={request?.user?.avatar ?? ""}
                                        alt={request?.user?.avatar ?? ""}
                                    />
                                    <AvatarFallback>{request?.user?.avatar[0]}</AvatarFallback>
                                </Avatar>
                                <p >
                                    {request?.user?.name}
                                    {/* {request?.is_parent ? `(${getCustomNameKeyLang("Parent", "والد")})` : `(${getCustomNameKeyLang("Driver", "سائق")})`} */}
                                </p>

                            </div>
                            <span className="text-gray-400 leading-relaxed text-sm p-2">
                            {formatCreatedAtDateAsDateTime(request?.created_at)}
                            </span>
                        </div>
                        <button
                            className="p-3 py-0"
                            onClick={() => router.push(`/dashboard/history-of-requests/${request.id}`)}
                        >
                            <Eye className="mx-1 h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                    <div className="bg-green-50 p-2 py-4 dark:bg-green-200 rounded-xl">
                        <div className="sm:flex sm:justify-between">
                            <div>
                            <div className="flex items-center gap-1 text-2xl font-semibold text-gray-800 mt-2">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage
                                        src={request?.watch_user?.avatar ?? ""}
                                        alt={request?.watch_user?.avatar ?? ""}
                                    />
                                    <AvatarFallback>{request?.watch_user?.avatar[0]}</AvatarFallback>
                                </Avatar>
                                <p >
                                    {request?.watch_user?.name}
                                    {/* {request?.is_parent ? `(${getCustomNameKeyLang("Parent", "والد")})` : `(${getCustomNameKeyLang("Driver", "سائق")})`} */}
                                </p>

                            </div>
                            </div>
                            <button className="mt-2 sm:mt-0 py-1 px-4 md:py-2 md:px-4 bg-green-700 hover:bg-green-600 font-bold text-white md:text-lg rounded-lg shadow-md">
                               {t("approve")}
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default RequestCard