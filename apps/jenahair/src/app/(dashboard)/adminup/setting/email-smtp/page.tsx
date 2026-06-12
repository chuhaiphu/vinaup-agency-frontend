import { Route } from 'next';
import { redirect } from 'next/navigation';
export default async function EmailSmtpPage() {
  redirect('/adminup/setting/email-smtp/smtp' as Route);
}
