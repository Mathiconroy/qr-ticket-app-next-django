import { Event } from '@/interfaces/interfaces';

export function EventDetailModal({ event }: { event: Event }) {
  return (
    <>
      <div>{event.name}</div>
    </>
  );
}
