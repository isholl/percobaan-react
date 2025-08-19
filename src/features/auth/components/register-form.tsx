import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  handleRegisterSubmit,
  registerInput,
  useRegisterForm,
} from '@/lib/auth';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const form = useRegisterForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (value: registerInput) => {
    setIsSubmitting(true);
    try {
      await handleRegisterSubmit(value, navigate);
    } catch (error) {
      console.error('Registration failed', error);
    } finally {
      console.log('Registration successful');

      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create an account'}
        </Button>
        <Button type="button" variant="outline" className="w-full">
          <FcGoogle />
          Sign up with Google
        </Button>
      </form>
    </Form>
  );
};
