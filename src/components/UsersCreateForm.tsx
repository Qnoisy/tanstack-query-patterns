import { useState } from "react";
import { useCreateUserMutation } from "../hooks/users/usersMutations";

export const UsersCreateForm = () => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  const createUserMutation = useCreateUserMutation();

  const onHandleCreateUser = async () => {
    if (!username || !age) return;

    createUserMutation.mutate({ username, age: Number(age) });
  };

  return (
    <div className="flex flex-col w-full gap-2 border-2 border-gray-300 p-4 rounded-md">
      <input
        type="text"
        placeholder="Username"
        className="border-2 border-gray-300 p-2 rounded-md"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        className="border-2 border-gray-300 p-2 rounded-md"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button
        disabled={createUserMutation.isPending}
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={onHandleCreateUser}
      >
        {createUserMutation.isPending ? "Creating..." : "Create"}
      </button>
    </div>
  );
};
