import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router';

import { Alert, AlertDescription } from '@/components/ui/alert';
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
import { handleLoginSubmit, useLoginForm } from '@/lib/auth';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const form = useLoginForm();

  const { watch } = form;

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useEffect(() => {
    const subscription = watch(() => setShowAlert(false));
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          handleLoginSubmit(values, navigate, setShowAlert),
        )}
        className="space-y-3"
      >
        {showAlert && (
          <Alert variant="destructive">
            <AlertDescription>
              Invalid email or password. Please try again.
            </AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input {...field} type="email" autoFocus />
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
        <Button type="submit" className="w-full">
          Sign in
        </Button>
        <Button type="button" variant="outline" className="w-full">
          <FcGoogle />
          Continue with Google
        </Button>
      </form>
    </Form>
  );
};
