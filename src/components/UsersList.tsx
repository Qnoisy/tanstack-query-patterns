import { useState } from 'react';
import type { User } from '../api/usersApi';
import { useDeleteUserMutation } from '../hooks/users/usersMutations';
import { useUsersQuery } from '../hooks/users/usersQuery';

interface UserItemProps {
	user: User;
	disabled: boolean;
}

const UserItem = ({ user, disabled }: UserItemProps) => {
	const deleteUserMutation = useDeleteUserMutation();

	const handlerDeleteUser = (id: string) => {
		deleteUserMutation.mutate(id);
	};

	return (
		<div
			className={`flex gap-2 border-2 border-gray-300 p-2 rounded-md ${disabled ? 'opacity-50' : ''}`}
		>
			<span>{user.id}</span>
			<span>{user.username}</span>
			<span>{user.age}</span>

			<button
				disabled={disabled}
				className='border-2 border-black-300 rounded-md p-2 cursor-pointer bg-amber-500'
				onClick={() => handlerDeleteUser(user.id)}
			>
				{deleteUserMutation.isPending ? 'deleting' : 'delete'}
			</button>
		</div>
	);
};

export const UsersList = () => {
	const [page, setPage] = useState(1);
	const limit = 5;
	const { data: usersData, isFetching } = useUsersQuery({ page, limit });

	const users = usersData?.data;
	const total = usersData?.total ?? 0;

	return (
		<div>
			<h1>Count Users: {total}</h1>
			<h1>Page: {page}</h1>
			{users?.map(user => (
				<UserItem disabled={isFetching} key={user.id} user={user} />
			))}
			<div className='flex gap-2'>
				<button
					className='border-2 p-2 cursor-pointer'
					onClick={() => setPage(page - 1)}
				>
					Prev
				</button>
				{new Array(Math.ceil(total / limit)).fill(0).map((_, index) => (
					<button
						className='border-2 p-2 cursor-pointer'
						onClick={() => setPage(index + 1)}
						key={index}
					>
						{index + 1}
					</button>
				))}
				<button
					className='border-2 p-2 cursor-pointer'
					onClick={() => setPage(page + 1)}
				>
					Next
				</button>
			</div>
		</div>
	);
};
