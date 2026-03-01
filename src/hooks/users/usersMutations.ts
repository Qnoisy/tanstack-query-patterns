import { UsersCreateForm } from './../../components/UsersCreateForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi, type User } from '../../api/usersApi';
import { USER_QUERY_KEY } from './usersQuery';

// export function useCreateUserMutation() {
// 	const queryClient = useQueryClient();

// 	return useMutation({
// 		mutationFn: usersApi.createUser,
// 		onSuccess: data => {
// 			// queryClient.refetchQueries({ queryKey: USER_QUERY_KEY });
// 			queryClient.setQueryData(USER_QUERY_KEY, (oldData: User[]) => [
// 				data,
// 				...oldData,
// 			]);
// 		},
// 		onError: () => {
// 			console.log('error');
// 		},
// 		onSettled: () => {
// 			console.log('settled');
// 		},
// 	});
// }

export function useDeleteUserMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: usersApi.deleteUser,
		onSuccess: (_, id) => {
			queryClient.setQueryData<User[]>(USER_QUERY_KEY, oldData =>
				oldData ? oldData.filter(user => user.id !== id) : oldData,
			);
		},
	});
}

//optimistic update

export function useCreateUserMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: usersApi.createUser,
		onMutate: async data => {
			await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });
			const previousUsers = queryClient.getQueryData<User[]>(USER_QUERY_KEY);

			queryClient.setQueryData(USER_QUERY_KEY, (oldData: User[]) => [
				data,
				...oldData,
			]);

			return { previousUsers };
		},

		onSuccess: (data, variables, context) => {
			queryClient.setQueryData(USER_QUERY_KEY, [
				data,
				...(context?.previousUsers || []),
			]);
		},

		onError: (_, __, context) => {
			queryClient.setQueryData(USER_QUERY_KEY, [
				...(context?.previousUsers || []),
			]);
		},
		onSettled: () => {
			console.log('settled');
		},
	});
}
