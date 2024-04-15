export default function FormButton({
  text,
  className = "",
  type = "button",
}: {
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <button
      className={`rounded-lg bg-blue-500 p-3 text-white ${className}`}
      type={type}
    >
      {text}
    </button>
  );
}
