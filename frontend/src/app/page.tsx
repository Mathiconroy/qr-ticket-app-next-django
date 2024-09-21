import Link from 'next/link';
import FormButton from '@/components/input/button';

export default function Home() {
  return (
    <div>
      <Link href={'/login'}>
        <FormButton text={'Login'} />
      </Link>
      <Link href={'/app'}>
        <FormButton text={'Go to app'} />
      </Link>
    </div>
  );
}
