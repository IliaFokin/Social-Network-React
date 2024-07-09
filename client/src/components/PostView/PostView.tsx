import './PostView.css';
import { Post } from '../../api/Post';
import { FC } from 'react';
import { FetchUserView } from '../UserView';

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, {
    timeStyle: 'medium',
  })}`;
}

interface PostViewPros {
  post: Post;
}

export const PostView: FC<PostViewPros> = ({ post }) => {
  return (
    <div className="post-view">
      <FetchUserView userId={post.authorId} />
      
      <p className="post-view__text">{post.text}</p>

      <time className="post-view__time">{formatDate(post.createdAt)}</time>
    </div>
  );
};
