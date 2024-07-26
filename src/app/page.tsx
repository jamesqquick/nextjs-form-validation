import Link from 'next/link';
import Header from './_components/Header';

export default function Home() {
  return (
    <>
      <Header
        heading={'Next.js Forms'}
        description="client and server validation"
      />
      <p>
        There are lots of different ways to handle forms and form validation in
        Next.js. This demo shows a few different options using multiple versions
        of form actions, custom client-side validation, and client-side
        validation with react-hook-form.
      </p>
      <Link href="https://github.com/jamesqquick">Github Repo</Link>
    </>
  );
}
