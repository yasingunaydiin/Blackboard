'use client';

import { Card, CardHeader, CardTitle } from '@/app/components/ui/card';
import { useEffect, useState } from 'react';

import { Todo } from '@prisma/client';
import CreateTodo from './Createtodo';
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

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const toggleComplete = (id: string) => {
    if (todos) {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );

      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };

  if (!todos || todos.length === 0) {
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
              onChange={() => toggleComplete(todo.id)}
            />
          </div>
          <div className='absolute right-2 flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100'>
            <UpdateTodo todo={todo} setTodos={setTodos} />
            <DeleteTodo id={todo.id} setTodos={setTodos} />
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
      <CreateTodo setTodos={setTodos} />
    </div>
  );
}
