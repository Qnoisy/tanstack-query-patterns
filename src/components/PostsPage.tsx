import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { api } from '../api/api';
import { Suspense } from 'react';
import { Link } from 'react-router';

export type Post = {
	id: string;
	title: string;
};

function getPosts() {
	return api.get<Post[]>('/posts').then(res => res.data);
}
// function getAuthData() {
// 	return new Promise(res => {
// 		setTimeout(() => res({ userData: {} }), 1500);
// 	});
// }
// function getNotifications() {
// 	return api
// 		.get<{ notificationsCount: number }>('/notifications')
// 		.then(res => res.data);
// }

// const postIds = [1, 2, 3, 4, 5];

const PostList = () => {
	const queryClient = useQueryClient();
	// const id = 1;

	// const { data: notifications } = useQuery({
	// 	queryKey: ['notifications'],
	// 	queryFn: getNotifications,
	// 	retry: false,
	// 	refetchInterval: 1000,
	// });

	// const data = useQueries({
	// 	queries: postIds.map(id => ({
	// 		queryKey: ['post', id],
	// 		queryFn: () => getPostById(id),
	// 	})),
	// });

	const { data: posts } = useSuspenseQuery({
		queryKey: ['posts'],
		queryFn: getPosts,
	});

	const invalidatePosts = () => {
		// queryClient.invalidateQueries({ queryKey: ['posts'] });
		queryClient.refetchQueries({ queryKey: ['posts'] });
	};

	return (
		<div>
			{/* <h2>notifications = {notifications?.notificationsCount}</h2> */}
			<button className='border p-2 cursor-pointer' onClick={invalidatePosts}>
				INVALIDATE
			</button>
			{posts?.map(post => (
				<Link className={'flex gap-2'} to={`/posts/${post.id}`} key={post.id}>
					{post.id}.{post.title}
				</Link>
			))}
		</div>
	);
};

export const PostsPage = () => {
	return (
		<div className='flex flex-col gap-4'>
			<Suspense fallback={<div>Loading posts...</div>}>
				<PostList />
			</Suspense>
		</div>
	);
};
