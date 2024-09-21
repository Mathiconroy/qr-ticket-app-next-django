import EventListGrid from '@/components/events/EventListTable';
import Title from '@/components/display/title';
import Link from 'next/link';
import FormButton from '@/components/input/button';

export default function EventList() {
  return (
    <>
      <div className={'mb-2 flex items-center justify-between'}>
        <Title>My Events</Title>
        <Link href={'events/new/'}>
          <FormButton text={'+ Create Event'} />
        </Link>
      </div>
      <EventListGrid />
    </>
  );
}
