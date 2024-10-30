'use client';

import { FiPlus } from 'react-icons/fi';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { todoSchema, type TodoSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='What do you need to do?' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Give some detail
                        '
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isCompleted'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Mark as completed</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                className='w-full rounded bg-indigo-600 text-indigo-50 transition-colors hover:bg-indigo-500'
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <div className='absolute inset-0 flex items-center justify-center bg-primary/50 rounded-md'>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  </div>
                )}
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
