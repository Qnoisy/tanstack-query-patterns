import { useUsersQuery } from "../hooks/users/usersQuery";
import { useDeleteUserMutation } from "../hooks/users/usersMutations";
import type { User } from "../api/usersApi";
import { useState } from "react";

const UserItem = ({ user, disabled }: { user: User; disabled: boolean }) => {
  const deleteUserMutation = useDeleteUserMutation();

  const handleDeleteUser = (id: string) => {
    deleteUserMutation.mutate(id);
  };

  return (
    <div
      key={user.id}
      className={`flex gap-2 border-2 border-gray-300 p-2 rounded-md ${disabled ? "opacity-50" : ""}`}
    >
      {!user.id && (
        // спинер
        <span className="h-2 w-2 bg-green-400 transition-all duration-1000 rotate-180" />
      )}
      <span>{user.id}</span>
      <span>{user.username}</span>
      <span>{user.age}</span>
      <button
        className="bg-red-500 text-white p-2 rounded-md"
        onClick={() => handleDeleteUser(user.id)}
      >
        {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export const UsersList = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data: usersData, isFetching } = useUsersQuery({ page, limit: 5 });

  const total = usersData?.total ?? 0;
  const users = usersData?.data;

  return (
    <div>
      <h1>Всего пользователей: {total}</h1>
      <h1>Страница: {page}</h1>
      {users?.map((user) => (
        <UserItem disabled={isFetching} key={user.id} user={user} />
      ))}
      <div className="flex gap-2">
        <button
          className="border-red-500 border-2 cursor-pointer"
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        {new Array(Math.ceil(total / limit)).fill(0).map((_, index) => (
          <button
            className="border-red-500 border-2 cursor-pointer"
            key={index}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="border-red-500 border-2 cursor-pointer"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
