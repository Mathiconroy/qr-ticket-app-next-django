export default function FormButton({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <button
      className={`my-4 rounded-lg bg-blue-500 p-3 text-white ${className}`}
    >
      {text}
    </button>
  );
}
