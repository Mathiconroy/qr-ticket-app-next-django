export default function IconButton({
  icon,
  children,
}: {
  icon: React.ReactElement;
  children?: React.ReactNode;
}) {
  return (
    <button>
      <div className={'flex gap-2 flex-row'}>
        {icon} {children}
      </div>
    </button>
  );
}
