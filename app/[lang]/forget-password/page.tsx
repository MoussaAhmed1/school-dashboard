"use client"
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

// Zod schema for email validation
const emailSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
});

type EmailFormData = {
  email: string;
};

const ResetPasswordEmailPage: FC = ({ lang }: { lang: Language }) => {
    const tShared = useTranslations('shared');
    const router = useRouter();
    const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = (data: EmailFormData) => {
    // Handle email submission (e.g., send a request to backend to send reset email)
    alert(`'Email submitted:' ${data.email}`);
    // Redirect to the next page (reset password form)
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">{tShared('resetPassword')}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <div className="mb-4">
          <Input
            id="email"
            type="email"
            placeholder={tShared("Enteryouremail")}
            {...register('email')}
          />
        <span className='text-red-500 w-fit text-sm py-1 px-3 rounded-md mt-1'>{errors.email?.message}</span>
        </div>
        <Button type="submit" className="m-0 p-0 w-full max-w-sm">{tShared("submit")}</Button>
      </form>
    </div>
  );
};

export default ResetPasswordEmailPage;
