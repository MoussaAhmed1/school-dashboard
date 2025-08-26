import { Metadata } from "next";
import BreadCrumb from "@/components/breadcrumb";
import {
  Image as ImageIcon,
  User,
  Mail,
  Clock2,
  BadgeCheck,
  Hash,
  GraduationCap,
} from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { ISingleRequest } from "@/types/watches/requests";
import { fetchSingleRequest } from "@/actions/requests/requests-history-actions";
import userAvatar from "../../../../../public/assets/user-avatar.png";
import { convertUtcToLocal } from "@/utils/helperFunctions";
import { getDictionary } from "@/app/[lang]/messages";
import RequestDetails from "@/components/details/requests-history";

export const metadata: Metadata = {
  title: "Requests Details | Dacatra Dashboard",
};

const page = async ({
  params,
}: {
  params: { id: string; lang: "ar" | "en" };
}) => {
  const res = await fetchSingleRequest(params.id);
  const request: ISingleRequest = res?.data?.data;
  const { pages, navigation } = await getDictionary(params?.lang);
  const breadcrumbItems = [
    { title: navigation.home, link: "/dashboard/pending-requests" },
    {
      title: pages.requestDetails.title,
      link: `/dashboard/pending-requests/${request?.id}`,
    },
  ];
  return (
    <>
      <div className="mx-auto w-full mt-8 bg-background">
        <BreadCrumb items={breadcrumbItems} customStyle="mx-5" />
        <div className="flex items-baseline justify-between mx-5">
          <Heading
            title={pages.requestDetails.title}
            description={`${convertUtcToLocal(request.created_at)}`}
          />
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 auto-rows-fr">
            <RequestDetails
              data={[
                {
                  key: pages.requestDetails.code,
                  value: request?.number as unknown as string,
                  icon: <Hash className="details_icon" />,
                  type: "text",
                },
                {
                  key: pages.requestDetails.createdAt,
                  value: convertUtcToLocal(request?.created_at),
                  icon: <Clock2 className="details_icon" />,
                  type: "text",
                  dir: "ltr",
                },
                {
                  key: pages.requestDetails.updatedAt,
                  value: convertUtcToLocal(request?.updated_at),
                  icon: <Clock2 className="details_icon" />,
                  type: "text",
                  dir: "ltr",
                },
                {
                  key: pages.requestDetails.status,
                  value: request?.status,
                  icon: <BadgeCheck className="details_icon" />,
                  type: "text",
                },
              ]}
              title={pages.requestDetails.title}
            />
            <RequestDetails
              data={[
                {
                  key: pages.users.name,
                  value: request?.user?.name,
                  icon: <User className="details_icon" />,
                  type: "text",
                },
                {
                  key: pages.users.avatar,
                  value: request?.user?.avatar || userAvatar,
                  icon: <ImageIcon className="details_icon" />,
                  type: "img",
                },
                {
                  key: pages.users.email,
                  value: request?.user?.email,
                  icon: <Mail className="details_icon" />,
                  type: "text",
                  dir: "ltr",
                },
              ]}
              title={pages.requestDetails.userDetails}
            />
            <RequestDetails
              data={[
                {
                  key: pages.users.name,
                  value: request?.watch_user?.name,
                  icon: <User className="details_icon" />,
                  type: "text",
                },
                {
                  key: pages.users.avatar,
                  value: request?.watch_user?.avatar || userAvatar,
                  icon: <ImageIcon className="details_icon" />,
                  type: "img",
                },
                {
                  key: pages.users.grade,
                  value: request?.grade?.name,
                  icon: <GraduationCap className="details_icon" />,
                  type: "text",
                },
              ]}
              title={pages.requestDetails.watchUserDetails}
            />
            {request?.confirmed_by && (
              <RequestDetails
                data={[
                  {
                    key: pages.users.name,
                    value: request?.confirmed_by?.name,
                    icon: <User className="details_icon" />,
                    type: "text",
                  },
                  {
                    key: pages.users.avatar,
                    value: request?.confirmed_by?.avatar || userAvatar,
                    icon: <ImageIcon className="details_icon" />,
                    type: "img",
                  },
                  {
                    key: pages.users.email,
                    value: request?.confirmed_by?.phone,
                    icon: <Mail className="details_icon" />,
                    type: "text",
                    dir: "ltr",
                  },
                ]}
                title={pages.requestDetails.confirmed_by}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
