'use client';

import { useState } from 'react';
import { mutate } from 'swr';

import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';

import TodoForm from '@/app/components/Todoform';
import { type TodoSchema } from '@/lib/zod';
import { Todo } from '@prisma/client';
import { Pencil1Icon } from '@radix-ui/react-icons';

export default function UpdateTodo({ todo }: { todo: Todo }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);

  const onSubmit = async (data: TodoSchema) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, id: todo.id }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update todo');
      }

      setErrorMessage('');
      setDialogOpen(false);
      mutate('/api/todos');
    } catch (error) {
      console.error('Error updating todo:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      setErrorMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='mr-1 text-blue-500 bg-blue-100 hover:text-blue-700 hover:bg-blue-200 size-6 flex items-center justify-center'
        >
          <Pencil1Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle>Edit this action</DialogTitle>
        </DialogHeader>
        {errorMessage && (
          <div className='text-red-500 text-sm mb-4'>{errorMessage}</div>
        )}
        <TodoForm
          defaultValues={{
            title: todo.title,
            isCompleted: todo.isCompleted,
          }}
          onSubmit={onSubmit}
          submitButtonText='Update'
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
