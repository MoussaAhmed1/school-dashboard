"use client";

import { Columns } from "../tables/users-tables/security/columns";
import { SharedTable } from "../shared/table/Shared-table";
import { IUser } from "@/types/users";

interface IProps {
  page: number;
  totalUsers: number;
  pageCount: number;
  schoolGrades: { id: string; name: string }[];
  users: IUser[];
}

function SecurityView({
  users,
  page,
  schoolGrades,
  totalUsers,
  pageCount,
}: IProps) {
  return (
    <SharedTable
      searchKey="security"
      pageNo={page}
      columns={Columns({ options: schoolGrades })}
      totalitems={totalUsers}
      data={users as unknown as IUser[]}
      pageCount={pageCount}
    />
  );
}

export default SecurityView;
