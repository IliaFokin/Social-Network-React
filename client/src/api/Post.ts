import { z } from 'zod';
import { validateResponse } from './validateResponse';

export const PostScheme = z.object({
  id: z.string(),
  text: z.string(),
  authorId: z.string(),
  createdAt: z.number(),
})

export type Post = z.infer<typeof PostScheme>;

export const PostList = z.array(PostScheme);

export type PostList = z.infer<typeof PostList>;

export const FetchPostListScheme = z.object({
  list: PostList,
})

export type FetchPostListResponse = z.infer<typeof FetchPostListScheme>;

export function fetchPostList(): Promise<FetchPostListResponse> {
  return fetch('/api/posts')
    .then((response) => response.json())
    .then((data) => FetchPostListScheme.parse(data));
}

export function createPost(text: string): Promise<void> {
  return fetch('api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  }).then(validateResponse).then(() => undefined)
}