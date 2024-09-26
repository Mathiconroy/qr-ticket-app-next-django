import { Event } from '@/interfaces/interfaces';

export function EventDetailModal({ event }: { event: Event }) {
  return (
    <>
      <div>{event.name}</div>
    </>
  );
}

export function EventEditModal({ event }: { event: Event }) {
  return (
    <>
      <div>{event.name}</div>
    </>
  );
}

export function EventCreateModal() {
  return <div>Hello</div>;
}
