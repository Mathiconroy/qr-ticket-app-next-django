import { BsQrCodeScan, BsCalendarEvent, BsTicket, BsReceipt } from 'react-icons/bs';
import Link from 'next/link';
import UserVerificator from '@/components/userVerificator';
import UserInfoBanner from '@/components/userInfoBanner';
import { ReactElement } from 'react';

interface Module {
  id: number;
  name: string;
  route: string;
  icon: ReactElement<any>;
}

interface ModuleObject {
  [key: string]: Module;
}

const modules: ModuleObject = {
  index: {
    id: 0,
    name: 'Dashboard',
    route: '/app',
    icon: <BsQrCodeScan size={20} className="mx-1 inline-block" />,
  },
  events: {
    id: 1,
    name: 'Events',
    route: '/events/',
    icon: <BsCalendarEvent size={20} className="mx-1 inline-block" />,
  },
  tickets: {
    id: 2,
    name: 'Tickets',
    route: '/tickets',
    icon: <BsTicket size={20} className="mx-1 inline-block" />,
  },
  orders: {
    id: 3,
    name: 'Orders',
    route: '/orders',
    icon: <BsReceipt size={20} className="mx-1 inline-block" />,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UserVerificator />
      <div className="grid min-h-screen grid-cols-6 grid-rows-6 text-neutral-500 md:text-lg">
        <div className="col-span-1 row-span-6 bg-white">
          <div className="mt-5 flex justify-center overflow-y-auto text-center">
            <Link href="/app">
              <BsQrCodeScan size={100} />
              <p className="py-3">Ticketify</p>
            </Link>
          </div>
          <ul className="w-full px-4 flex flex-col gap-3">
            <li>
              <SidebarItem module={modules['events']} />
            </li>
            <li>
              <SidebarItem module={modules['tickets']} />
            </li>
            <li>
              <SidebarItem module={modules['orders']} />
            </li>
          </ul>
        </div>
        <div className="col-span-5 row-span-1 bg-neutral-100">
          <div className="p-3 text-right">
            <UserInfoBanner />
          </div>
        </div>
        <div className="col-span-5 row-span-5 bg-neutral-100">
          <div className="mx-4 rounded-lg border bg-white px-5 py-5 drop-shadow-md">{children}</div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ module }: { module: Module }) {
  return (
    <Link href={`/app${module.route}`} className="flex items-center">
      {module.icon}
      <span className="inline-block px-3">{module.name}</span>
    </Link>
  );
}
