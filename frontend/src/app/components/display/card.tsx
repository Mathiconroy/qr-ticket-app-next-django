export default function Card({ children }: { children: React.ReactNode}) {
  return (
    <div className="border-2 rounded-lg">
      {children}
    </div>
  );
}