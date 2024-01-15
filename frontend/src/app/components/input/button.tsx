export default function FormButton({
  text,
  className = "",
}: {
  text: string,
  className?: string,
}) {
  return (
    <button className={`rounded-lg bg-blue-500 text-white p-3 ${className}`}>{text}</button>
  )
}