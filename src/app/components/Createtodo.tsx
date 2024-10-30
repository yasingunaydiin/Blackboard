'use client';

import { FiPlus } from 'react-icons/fi';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import { todoSchema, type TodoSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import TodoForm from './Todoform';
import { Button } from './ui/button';

export default function CreateTodo() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);

  const form = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: '',
      description: '',
      isCompleted: false,
    },
  });

  const onSubmit = async (data: TodoSchema) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create todo');
      }
      form.reset();
      setDialogOpen(false);
      mutate('/api/todos');
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating todo:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      setErrorMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed bottom-6 left-1/2 w-full max-w-xl -translate-x-1/2 px-4'>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className='grid w-full place-content-center rounded-full border border-zinc-700 bg-zinc-900 py-3 text-lg text-white transition-colors hover:bg-zinc-800 active:bg-zinc-900'>
            <FiPlus />
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px] bg-white'>
          <DialogHeader>
            <DialogTitle>Create New Todo</DialogTitle>
          </DialogHeader>
          {errorMessage && (
            <div className='text-red-500 text-sm mb-4'>{errorMessage}</div>
          )}
          <TodoForm
            defaultValues={{
              title: '',
              description: '',
              isCompleted: false,
            }}
            onSubmit={onSubmit}
            submitButtonText='Submit'
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
