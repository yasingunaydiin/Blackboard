'use client';

import { Card, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Todo } from '@prisma/client';
import useSWR from 'swr';
import DeleteTodo from './Deletetodo';
import UpdateTodo from './Updatetodo';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }
  return res.json();
};

export default function TodoList() {
  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<Todo[]>('/api/todos', fetcher);

  // Loading state
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

  // Error state
  if (error) {
    return (
      <div className='text-red-500 text-center'>
        Error loading todos: {error.message}
      </div>
    );
  }

  // Make sure todos is an array
  const todoList = Array.isArray(todos) ? todos : [];
  console.log('Todos received:', todos); // Debug log

  // Empty state
  if (todoList.length === 0) {
    return (
      <div>
        <p className='text-center text-lg text-zinc-500'>
          All tasks completed! Enjoy your day. ✨
        </p>
      </div>
    );
  }

  // Render todos
  return (
    <div className='space-y-3'>
      {todoList.map((todo) => {
        if (!todo || typeof todo !== 'object') {
          console.error('Invalid todo item:', todo);
          return null;
        }

        return (
          <Card
            key={todo.id}
            className='group relative flex w-96 max-w-md items-center rounded-lg border border-zinc-700/50 bg-zinc-900/70 text-white backdrop-blur-sm transition-all hover:bg-zinc-800/70 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
          >
            <div className='m-3 flex justify-center'>
              <input
                type='checkbox'
                checked={todo.isCompleted}
                className='size-4 accent-orange-500 appearance-auto rounded-md border'
                onChange={() => {}} // Add your checkbox handler here
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
        );
      })}
    </div>
  );
}
