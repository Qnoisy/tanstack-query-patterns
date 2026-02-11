import {
  useIsFetching,
  useIsMutating,
  useMutationState,
} from "@tanstack/react-query";
import { Link } from "react-router";

export const Header = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const data = useMutationState({ filters: { mutationKey: ["createUser"] } });

  console.log(data);

  return (
    <>
      {isFetching > 0 && (
        <div className="h-4 bg-red-500 w-full absolute top-0 left-0" />
      )}
      {isMutating > 0 && (
        <div className="h-4 bg-blue-500 w-full absolute top-0 left-0" />
      )}
      <div className="p-4 bg-gray-200 ">
        <div className="max-w-4xl mx-auto flex gap-4 justify-end ">
          <Link className="underline" to="/users">
            users
          </Link>
          <Link className="underline" to="/posts">
            posts
          </Link>
        </div>
      </div>
    </>
  );
};
