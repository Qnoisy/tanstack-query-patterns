import { UsersList } from "./UsersList";
import { UsersCreateForm } from "./UsersCreateForm";

export const UsersPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <UsersCreateForm />
      <UsersList />
    </div>
  );
};
