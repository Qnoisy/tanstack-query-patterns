import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { api } from '../api/api';
import type { Post } from './PostsPage';

function getPostById(id: string) {
	return api.get<Post>(`/posts/${id}`).then(res => res.data);
}
export const PostDetails = () => {
	const { id } = useParams();
	const queryQlient = useQueryClient();

	const { data: post } = useQuery({
		queryKey: ['post', id],
		queryFn: () => getPostById(id ?? ''),
		placeholderData: () => {
			const posts = queryQlient.getQueryData<Post[]>(['posts']);
			return posts?.find(post => post.id === id);
		},
	});

	return (
		<div>
			{post?.id}.{post?.title}
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque expedita,
			dolor molestiae repellendus provident quasi, sed est, quae quis accusamus
			numquam magnam voluptatem eligendi blanditiis aliquid error aliquam
			exercitationem asperiores?
		</div>
	);
};
