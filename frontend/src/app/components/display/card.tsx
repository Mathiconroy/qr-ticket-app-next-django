export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border-2 p-2">{children}</div>;
}
