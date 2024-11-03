'use client';

import { Card, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Todo } from '@prisma/client';
import useSWR from 'swr';
import DeleteTodo from './Deletetodo';
import UpdateTodo from './Updatetodo';

const EmptyState = () => (
  <div className='space-y-3'>
    <div>
      <p className='text-center text-lg text-zinc-500'>
        All tasks completed! Enjoy your day. ✨
      </p>
    </div>
  </div>
);

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) ? data : null;
};

export default function TodoList() {
  const { data: todos, isLoading } = useSWR<Todo[] | null>(
    '/api/todos',
    fetcher
  );

  if (isLoading) {
    return (
      <div className='flex justify-center items-center'>
        <div className='relative w-12 h-12'>
          <div className='absolute w-12 h-12 rounded-full border-4 border-indigo-500 opacity-20'></div>
          <div className='absolute w-12 h-12 animate-spin rounded-full border-4 border-t-indigo-500'></div>
        </div>
      </div>
    );
  }

  // If there's no valid data, show empty state
  if (!todos || !Array.isArray(todos) || todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className='space-y-3'>
      {todos.map((todo) => (
        <Card
          key={todo.id}
          className='group relative flex w-96 max-w-md items-center rounded-lg border border-zinc-700/50 bg-zinc-900/70 text-white backdrop-blur-sm transition-all hover:bg-zinc-800/70 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
        >
          <div className='m-3 flex justify-center'>
            <input
              type='checkbox'
              className='size-4 accent-orange-500 appearance-auto rounded-md border'
              checked={todo.isCompleted}
              onChange={() => {}}
            />
          </div>
          <div className='absolute right-2 flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100'>
            <UpdateTodo todo={todo} />
            <DeleteTodo id={todo.id} />
          </div>
          <CardHeader className='h-3 flex items-center justify-center'>
            <CardTitle>
              <span className={todo.isCompleted ? 'line-through' : ''}>
                {todo.title}
              </span>
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
