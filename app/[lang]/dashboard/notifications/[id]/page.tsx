import { Metadata } from "next";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {  CheckCircle, Info } from 'lucide-react';
import { convertUtcToLocal } from "@/utils/helperFunctions";
import { getDictionary } from "@/app/[lang]/messages";
import { fetchSingleNotification } from "@/actions/notifications";
import { SingleNotification } from "@/types/notifications";


export const metadata: Metadata = {
  title: "Notification Deatails",
  description:
    "Notification Deatails - Dacatra Admin Dashboard",
};

const page = async ({ params }: {
  params: { id: string,lang:"ar"|"en" }
}) => {
  const { pages } = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: pages.notification.notifications, link: "/dashboard/notifications" },
    { title: pages.notification.notificationDetails, link: "/dashboard/notifications/sendNewNotification" },
  ];
  //----------------------------------------------------------------
  const res = await fetchSingleNotification(params.id);
  const notification: SingleNotification = res?.data?.data;
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-baseline justify-between">
        <Heading
          title={pages.notification.notifications}
        />
      </div>
      <div style={{ display: 'flex', gap: 8, flexDirection: "column" }}>
        <Card style={{ flex: 1 }}>
          <CardHeader>
            <CardTitle>{pages.notification.notifications}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <ul style={{ listStyle: 'none', paddingLeft: 0, display: "flex", flexDirection: "column", gap: 5, fontSize: 15 }} className="text-gray-600 dark:text-gray-200">
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Info style={{ marginRight: '0.5rem',marginLeft:"0.5rem" }} />
                  {pages.notification.englishTitle}: {notification?.title_en ?? " - "}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Info style={{ marginRight: '0.5rem',marginLeft:"0.5rem" }} />
                  {pages.notification.arabicTitle}: {notification?.title_ar ?? " - "}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Info style={{ marginRight: '0.5rem',marginLeft:"0.5rem" }} />
                  {pages.notification.englishText}: {notification?.text_en ?? " - "}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Info style={{ marginRight: '0.5rem',marginLeft:"0.5rem" }} />
                  {pages.notification.arabicText}: {notification?.text_ar ?? " - "}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <CheckCircle style={{ marginRight: '0.5rem',marginLeft:"0.5rem" }} />
                  {pages.notification.isRead}: {notification?.is_read ? pages.notification.yes : pages.notification.no}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }} className="rtl:text-right text-left" dir="ltr">
                  <Info style={{ marginRight: '0.5rem',marginLeft:"0.5rem" }} />
                  {pages.notification.createdAt}: {convertUtcToLocal(notification?.created_at)}
                </li>
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
