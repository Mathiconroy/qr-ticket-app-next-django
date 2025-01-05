import EventListGrid from '@/components/events/EventListTable';
import Title from '@/components/display/title';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EventList() {
  return (
    <>
      <div className={'mb-2 flex items-center justify-between'}>
        <Title>My Events</Title>
        <Link href={'events/new/'}>
          <Button>+ Create Event</Button>
        </Link>
      </div>
      <EventListGrid />
    </>
  );
}
