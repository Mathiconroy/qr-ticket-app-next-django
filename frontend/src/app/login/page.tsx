'use client';

import { useState } from 'react';
import axiosInstance from '@/axiosInstance';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';

interface LoginFields {
  username: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  const [whoAmI, setWhoAmI] = useState();

  const onSubmit = async (formData: LoginFields) => {
    const res = await fetch('/api/api-token-auth/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.status >= 200 && res.status <= 299) {
      const resJson = await res.json();
      localStorage.setItem('token', resJson.token);
      router.push('/app');
    }
  };

  const handleWhoAmI = async () => {
    const res = await axiosInstance.get('/whoami/');
    setWhoAmI(res.data.username);
  };

  const form = useForm<LoginFields>();

  return (
    <div className="grid h-screen grid-cols-1 place-items-center">
      <div className="w-1/4 rounded-lg border bg-white border-gray-400 p-5">
        <p className="text-center py-4 text-4xl font-bold mb-6">Login</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name={'username'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder={'Username'} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={'password'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder={'Password'} type={'password'} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <button type="submit" className="mt-5 w-full rounded-md bg-blue-400 p-2">
              Log In
            </button>
            <p className="pt-3 text-center">New to Ticketify? Sign up.</p>
          </form>
        </Form>
        <button
          onClick={handleWhoAmI}
          type="submit"
          className="mt-5 w-full rounded-md bg-blue-400 p-2"
        >
          Who am I?
        </button>
        {whoAmI !== undefined ? <p>I am whoAmI</p> : null}
      </div>
    </div>
  );
}
