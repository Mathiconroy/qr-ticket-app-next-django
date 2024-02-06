export default function FormButton({
  text,
  className = "",
}: {
  text: string,
  className?: string,
}) {
  return (
    <button className={`rounded-lg bg-blue-500 text-white my-4 p-3 ${className}`}>{text}</button>
  )
}