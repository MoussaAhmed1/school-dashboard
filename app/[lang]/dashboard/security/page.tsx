import { fetchSchoolGrades, fetchSecurity } from "@/actions/users/users-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import SecurityView from "@/components/details/SecurityView";
import { SharedTable } from "@/components/shared/table/Shared-table";
import { Columns } from "@/components/tables/users-tables/security/columns";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ITEMS_PER_PAGE } from "@/constants/data";
import { cn } from "@/lib/utils";
import {  IUser, Role } from "@/types/users";
import { Plus } from "lucide-react";
import Link from "next/link";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{ lang:"ar"|"en"}
};

export default async function page({ searchParams,params }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
  typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchSecurity({
    page,
    limit,
    role: Role.security,
    filters: search,
  });
  const schoolGrades = await fetchSchoolGrades();
  const totalUsers = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalUsers / limit);
  const users: IUser[] = res?.data?.data || [];
  const {navigation,shared} = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: navigation.security, link: `/dashboard/security` }];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6 ">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${navigation.security} (${totalUsers})`}
          />
          <Link
            href={`/${params?.lang}/dashboard/security/new`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="ltr:mx-1 rtl:ml-2 h-4 w-4" />{shared.add_new}
          </Link>
        </div>
        <Separator />

        <SecurityView
          page={page}
          users={users as unknown as IUser[]}
          totalUsers={totalUsers}
          pageCount={pageCount}
          schoolGrades={schoolGrades}
        />
      </div>
    </>
  );
}
