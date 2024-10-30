'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';

import { Todo } from '@prisma/client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Todolist() {
  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<Todo[]>('/api/todos', fetcher);

  if (isLoading)
    return (
      <div>
        <div className='flex justify-center items-center'>
          <div className='relative w-12 h-12'>
            <div className='absolute w-12 h-12 border-4 border-primary rounded-full animate-spin border-t-transparent'></div>
            <div className='absolute w-12 h-12 border-4 border-primary rounded-full animate-ping opacity-25'></div>
          </div>
        </div>
      </div>
    );
  if (error) return <div>Failed to load todos.</div>;

  const todoList = todos || [];

  return (
    <div>
      {todoList.length === 0 ? (
        <Card>
          <CardContent>
            <p className='text-muted-foreground'>All done for today</p>
          </CardContent>
        </Card>
      ) : (
        todoList.map((todo) => (
          <Card
            key={todo.id}
            className='relative flex w-full items-center rounded border border-zinc-700 bg-zinc-900 text-white'
          >
            <CardHeader className='h-3 flex items-center justify-center '>
              <CardTitle>
                <span className={todo.isCompleted ? 'line-through' : ''}>
                  {todo.title}
                </span>
              </CardTitle>
            </CardHeader>
            {todo.description && (
              <CardContent>
                <p>{todo.description}</p>
              </CardContent>
            )}
          </Card>
        ))
      )}
    </div>
  );
}
