import Link from "next/link";

export default function FormButton({
  text,
  className = "",
  linkHref = "/",
}: {
  text: string,
  className?: string,
  linkHref?: string,
}) {
  return (
    <Link href={linkHref}>
      <button className={`rounded-lg bg-blue-500 text-white my-4 p-3 ${className}`}>{linkHref !== '/' ? text : text + ' (not implemented)'}</button>
    </Link>
  )
}