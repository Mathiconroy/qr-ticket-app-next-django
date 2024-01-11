export default function EventDetails({ params }: { params: { id: number }}) {
    return <h1>Event with id {params.id}</h1>;
}