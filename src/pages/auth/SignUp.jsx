import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { BiLoader } from 'react-icons/bi';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetAuth } from '../../features/authSlice';

const RegisterSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  firstName: z
    .string({ required_error: 'Name is required' })
    .min(3, 'Name must contain at least 3 character(s)'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'password is required'),
});

const SignUp = () => {
  const { isLoading, isSuccess } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RegisterSchema) });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (userFormDetails) =>
    dispatch(registerUser(userFormDetails));

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => navigate('/signin'), 500);
    }
    return () => dispatch(resetAuth());
  }, [isSuccess, navigate, dispatch]);

  return (
    <div className="flex items-center justify-center w-full min-h-screen py-10">
      <Card className="w-[400px] bg-white dark:bg-black/20 shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <CardHeader className="py-0">
            <CardTitle className="mb-8 text-center dark:text-white">
              Create Account
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="mb-8 space-y-6">
                {/* <SocialAuth isisLoading={isLoading} setisLoading={setisLoading} /> */}
                <Input
                  disabled={isLoading}
                  id="firstname"
                  label="Name"
                  name="firstName"
                  {...register('firstName')}
                  type="text"
                  placeholder="Enter your Name"
                  error={errors?.firstName?.message}
                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-800 dark:text-gray-400 dark:outline-none"
                />
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
                  'Create an account'
                )}
              </Button>
            </form>
          </CardContent>
        </div>
        <CardFooter className="justify-center gap-2">
          <p className="text-sm text-gray-600">Already have an account ?</p>
          <Link
            to="/signin"
            className="text-sm font-semibold text-violet-600 hover:underline"
          >
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
