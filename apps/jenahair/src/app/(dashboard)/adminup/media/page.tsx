import { Route } from 'next';
import { redirect } from 'next/navigation';

export default function AdminMediaPage() {
  redirect('/adminup/media/upload' as Route);
}
