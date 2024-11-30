'use client';

import TodoForm from '@/app/components/Todoform';
import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import { type TodoSchema } from '@/lib/zod';
import { Todo } from '@prisma/client';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { useState } from 'react';

interface UpdateTodoProps {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | null>>;
}

export default function UpdateTodo({ todo, setTodos }: UpdateTodoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);

  const onSubmit = async (data: TodoSchema) => {
    setIsSubmitting(true);

    try {
      // Get existing todos from localStorage
      const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

      // Update only the specific todo in the list
      const updatedTodos = storedTodos.map((item: { id: unknown }) =>
        item.id === todo.id ? { ...item, ...data } : item
      );

      // Save the updated todos to localStorage
      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      // Sync the todos with the state
      setTodos(updatedTodos); // Directly update the state

      setIsSubmitting(false);
      setErrorMessage('');
      setDialogOpen(false);
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
          <DialogTitle>Edit this entry</DialogTitle>
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
