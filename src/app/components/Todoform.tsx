'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/app/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { todoSchema, type TodoSchema } from '@/lib/zod';

interface TodoFormProps {
  defaultValues: TodoSchema;
  onSubmit: (data: TodoSchema) => Promise<void>;
  submitButtonText: string;
  isSubmitting: boolean;
}

export default function TodoForm({
  defaultValues,
  onSubmit,
  submitButtonText,
  isSubmitting,
}: TodoFormProps) {
  const form = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues,
  });

  return (
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
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
