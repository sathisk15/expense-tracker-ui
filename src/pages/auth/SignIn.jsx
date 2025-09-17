import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../components/ui/shared/Input';
import Button from '../../components/ui/shared/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { BiLoader } from 'react-icons/bi';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/shared/Card';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../store/features/authSlice';
import GoogleLoginButton from '../../components/ui/shared/GoogleLoginButton';

const LoginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'password is required'),
});

const SignIn = () => {
  const { isLoading, isSuccess, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginSchema) });

  const navigate = useNavigate();

  const onSubmit = async (userCredentials) =>
    dispatch(signInUser(userCredentials));

  useEffect(() => {
    if (isSuccess && token) navigate('/dashboard');
  }, [isSuccess, token, navigate]);

  return (
    <div className="flex items-center justify-center w-full min-h-screen py-10">
      <Card className="w-[400px] bg-white dark:bg-black/20 shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <CardHeader className="py-0">
            <CardTitle className="mb-8 text-center dark:text-white">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <GoogleLoginButton />
            <hr className="mt-6 mb-5" />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="mb-8 space-y-6">
                {/* <SocialAuth isLoading={loading} setLoading={setLoading} /> */}
                <Input
                  disabled={isLoading}
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your Email"
                  error={errors?.email?.message}
                  {...register('email')}
                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-800 dark:text=gray-400 dark:outline-none"
                />
                <Input
                  disabled={isLoading}
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your Password"
                  error={errors?.password?.message}
                  {...register('password')}
                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-800 dark:text=gray-400 dark:outline-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-violet-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <BiLoader className="text-2xl text-white animate-spin" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </div>
        <CardFooter className="justify-center gap-2">
          <p className="text-sm text-gray-600">Don't have an account ?</p>
          <Link
            to="/signup"
            className="text-sm font-semibold text-violet-600 hover:underline"
          >
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
