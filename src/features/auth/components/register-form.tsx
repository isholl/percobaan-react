import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  registerInputSchema,
  useLoginWithGoogle,
  useRegister,
} from '@/lib/auth';

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const registering = useRegister({ onSuccess });

  const loginWithGoogle = useLoginWithGoogle({ onSuccess });

  return (
    <Form
      onSubmit={(values) => registering.mutate(values)}
      schema={registerInputSchema}
      options={{ shouldUnregister: true }}
    >
      {({ register, formState }) => (
        <>
          <Input
            type="text"
            label="First name"
            autoFocus
            error={formState.errors.firstName}
            registration={register('firstName')}
          />
          <Input
            type="text"
            label="Last name"
            error={formState.errors.lastName}
            registration={register('lastName')}
          />
          <Input
            type="email"
            label="Email Address"
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
            isLoading={registering.isPending}
            className="w-full"
            disabled={registering.isPending}
          >
            Create an account
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => loginWithGoogle()}
            className="w-full"
          >
            <FcGoogle />
            Sign up with Google
          </Button>
        </>
      )}
    </Form>
  );
};
