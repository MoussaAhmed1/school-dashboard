import { fetchWorkHours } from "@/actions/users/users-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { WorkTimesInfoForm } from "@/components/forms/request-receiving-time/RequestTimeForm";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { WorkHours } from "@/types/users";

type paramsProps = {
  params: { lang: "ar" | "en" };
};

export default async function page({ params }: paramsProps) {
  const res = await fetchWorkHours();
  const reveivingTime: WorkHours[] = res || [];
  const { navigation } = await getDictionary(params?.lang);
  const breadcrumbItems = [
    {
      title: navigation.requestsPickupTime,
      link: `/dashboard/history-of-requests`,
    },
  ];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6 ">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`${navigation.requestsPickupTime}`} />
        </div>
        <Separator />
        {reveivingTime.length > 0 &&
          reveivingTime.map((item: WorkHours) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-800"

            >
              <WorkTimesInfoForm
                day={{
                  name: params?.lang === "ar" ? item?.name_ar : item?.name_en,
                }}
                initialData={item}
              />
            </div>
          ))}
      </div>
    </>
  );
}
