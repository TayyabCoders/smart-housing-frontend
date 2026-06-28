import DataTable from "@/components/shared/data-table";
import { columns } from "./columns";
import UserTableActions from "./user-table-action";
import { UserModuleUser } from "@/app/[locale]/users/types/user";

type TUserTableProps = {
  users: UserModuleUser[];
  page: number;
  totalUsers: number;
  pageCount: number;
};

export default function UserTable({ users, pageCount }: TUserTableProps) {
  return (
    <>
      <UserTableActions />
      <DataTable columns={columns} data={users || []} pageCount={pageCount} />
    </>
  );
}
