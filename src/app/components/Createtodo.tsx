'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import { type TodoSchema } from '@/lib/zod';
import { Todo } from '@prisma/client';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import TodoForm from './Todoform';
import { Button } from './ui/button';

interface CreateTodoProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | null>>;
}

export default function CreateTodo({ setTodos }: CreateTodoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);

  const onSubmit = async (data: TodoSchema) => {
    setIsSubmitting(true);

    try {
      const newTodo = {
        id: Date.now(),
        title: data.title,
        isCompleted: data.isCompleted,
      };

      const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
      storedTodos.push(newTodo);

      localStorage.setItem('todos', JSON.stringify(storedTodos));
      setTodos(storedTodos); // Update state in the parent component

      // Close the dialog after successful submission
      setDialogOpen(false);

      // Error messages
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
            <DialogTitle>Create a new entry</DialogTitle>
          </DialogHeader>
          {errorMessage && (
            <div className='text-red-500 text-sm mb-4'>{errorMessage}</div>
          )}
          <TodoForm
            defaultValues={{
              title: '',
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
