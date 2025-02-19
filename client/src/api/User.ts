import { z } from 'zod';
import { validateResponse } from './validateResponse';

const UserScheme = z.object({
  id: z.string(),
  username: z.string(),
});

export type User = z.infer<typeof UserScheme>;

export function fetchUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`)
    .then(res => res.json())
    .then(data => UserScheme.parse(data));
}

export function registerUser(username: string, password: string): Promise<void> {
  return fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  }).then(() => undefined)
}

export function login(username: string, password: string): Promise<void> {
  return fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  }).then(validateResponse).then(() => undefined)
}

export function fetchMe(): Promise<User> {
  return fetch('/api/users/me').then(validateResponse).then(response => response.json()).then(data => UserScheme.parse(data));
}