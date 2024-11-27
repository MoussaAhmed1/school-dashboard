import { fetchStudents } from "@/actions/users/users-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/shared/table/Shared-table";
import { columns } from "@/components/tables/users-tables/student/columns";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ITEMS_PER_PAGE } from "@/constants/data";
import {  IStudent } from "@/types/users";


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
  const res = await fetchStudents({
    page,
    limit,
    filters: search,
  });
  const totalUsers = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalUsers / limit);
  const users: IStudent[] = res?.data?.data || [];
  const {navigation} = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: navigation.students, link: `/dashboard/students` }];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6 ">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${navigation.students} (${totalUsers})`}
          />
        </div>
        <Separator />

        <SharedTable
          searchKey="students"
          pageNo={page}
          columns={columns}
          totalitems={totalUsers}
          data={users as unknown as IStudent[]}
          pageCount={pageCount}
        >
        </SharedTable>
      </div>
    </>
  );
}
