import { FC } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../Button';
import { FormField } from '../FormField';
import './PostForm.css';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '../../api/Post';
import { queryClient } from '../../api/queryClient';

export interface IPostFormProps {}

const CreatePostSchema = z.object({
  text: z.string().min(10, 'Длина поста должна быть не менее 10 символов')
})

type CreatePostType = z.infer<typeof CreatePostSchema>;

export const PostForm: FC<IPostFormProps> = () => {
  const { 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreatePostType>({
    resolver: zodResolver(CreatePostSchema)
  });

  const createPostMutation = useMutation({ 
    mutationFn: createPost,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  }, queryClient)

  return (
    <form 
      className="post-form" 
      onSubmit={handleSubmit(({ text }) => {
        createPostMutation.mutate(text)
      })}
    > 
      <FormField label="Текст поста" errorMessage={errors.text?.message}>
        <textarea 
          className="post-form__input"
          {...register('text')}
        />
      </FormField>

      <Button type="submit" title="Опубликовать" isLoading={createPostMutation.isPending}/>
    </form>
  );
};
