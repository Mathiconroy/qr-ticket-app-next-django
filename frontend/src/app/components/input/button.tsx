export default function FormButton({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <button
      className={`mt-3 rounded-lg bg-blue-500 p-3 text-white ${className}`}
    >
      {text}
    </button>
  );
}
