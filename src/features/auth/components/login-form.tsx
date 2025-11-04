import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginInputSchema, useLogin, useLoginWithGoogle } from '@/lib/auth';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({ onSuccess });

  const loginWithGoogle = useLoginWithGoogle({ onSuccess });

  return (
    <Form onSubmit={(values) => login.mutate(values)} schema={loginInputSchema}>
      {({ register, formState }) => (
        <>
          <Input
            type="email"
            label="Email Address"
            autoFocus
            error={formState.errors.email}
            registration={register('email')}
          />
          <Input
            type="password"
            label="Password"
            error={formState.errors.password}
            registration={register('password')}
          />
          <Button
            type="submit"
            isLoading={login.isPending}
            className="w-full"
            disabled={login.isPending}
          >
            Sign in
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => loginWithGoogle()}
            className="w-full"
          >
            <FcGoogle />
            Continue with Google
          </Button>
        </>
      )}
    </Form>
  );
};
