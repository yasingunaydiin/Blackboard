'use client';

import { Button } from '@/components/ui/button';
import { TrashIcon } from '@radix-ui/react-icons';
import { mutate } from 'swr';

export default function DeleteTodo({ id }: { id: string }) {
  const handleDelete = async () => {
    const response = await fetch(`/api/todos?id=${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      console.log('Todo deleted successfully');
      mutate('/api/todos');
    } else {
      console.error('Failed to delete todo');
    }
  };

  return (
    <Button
      onClick={handleDelete}
      variant='ghost'
      size='icon'
      className='mr-1 text-red-500 bg-red-100 size-6 flex items-center justify-center'
    >
      <TrashIcon />
    </Button>
  );
}
