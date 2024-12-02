'use client';
import { Todo } from '@prisma/client';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import CreateTodo from './components/Createtodo';
import TodoList from './components/Todolist';

export default function Home() {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <link rel='icon' type='image/png' href='/favicon.png' />
      </Head>

      <div
        className='flex items-center justify-center h-screen bg-black relative'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
      >
        <div className='absolute top-0 right-0 mt-5 mr-5 flex items-center gap-3'>
          <a href='https://github.com/yasingunaydiin'>
            <Image
              src='/github-mark-white.png'
              alt='Github'
              width={33}
              height={30}
            />
          </a>
          <a href='https://yasingunaydiin-portfolio.vercel.app'>
            <Image
              src='/blackboard_logo.png'
              alt='Portfolio'
              width={40}
              height={20}
            />
          </a>
        </div>

        <div className='mb-6 w-full flex flex-col items-center text-white'>
          <h1 className='text-xl font-medium'>Good morning! ☀️</h1>
          <p className='text-zinc-400'>Let`s see what we`ve got to do today.</p>
          <CreateTodo setTodos={setTodos} />
          <div className='mt-5'>
            <TodoList todos={todos} setTodos={setTodos} />
          </div>
        </div>
      </div>
    </>
  );
}
