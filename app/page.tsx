import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the main POS page
  redirect('/pos');
}
