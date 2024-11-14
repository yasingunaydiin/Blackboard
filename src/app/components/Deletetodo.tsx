'use client';

import { Todo } from '@prisma/client';
import { TrashIcon } from '@radix-ui/react-icons';
import { Dispatch, SetStateAction } from 'react';

interface DeleteTodoProps {
  id: string;
  setTodos: Dispatch<SetStateAction<Todo[] | null>>;
}

export default function DeleteTodo({ id, setTodos }: DeleteTodoProps) {
  const onDelete = () => {
    // Get todos from localStorage
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

    // Filter out the deleted todo
    const updatedTodos = storedTodos.filter((todo: Todo) => todo.id !== id);

    // Save the updated todos back to localStorage
    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    // Update the state
    setTodos(updatedTodos); // Directly update the state
  };

  return (
    <button
      onClick={onDelete}
      className='hover:text-yellow-700 rounded-md hover:bg-red-200 mr-1 text-red-500 bg-red-100 size-6 flex items-center justify-center'
    >
      <TrashIcon />
    </button>
  );
}
