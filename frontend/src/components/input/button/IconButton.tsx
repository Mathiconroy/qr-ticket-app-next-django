import { MouseEventHandler } from 'react';

export default function IconButton({
  onClick,
  icon,
  children,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactElement;
  children?: React.ReactNode;
}) {
  return (
    <button onClick={onClick}>
      <div className={'flex gap-2 flex-row'}>
        {icon} {children}
      </div>
    </button>
  );
}
