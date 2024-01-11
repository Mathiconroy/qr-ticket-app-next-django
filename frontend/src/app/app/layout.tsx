import "../globals.css";
import { Inter } from "next/font/google";
import { BsQrCodeScan, BsCalendarEvent } from "react-icons/bs";
import Link from "next/link";
import UserVerificator from "./userVerificator";
import UserInfoBanner from "./userInfoBanner";
import { ReactElement } from "react";

const inter = Inter({ subsets: ["latin"] });

interface Module {
  id: number;
  name: string;
  route: string;
  icon: ReactElement;
}

interface ModuleObject {
  [key: string]: Module;
}

const modules: ModuleObject = {
  index: {
    id: 0,
    name: "Dashboard",
    route: "app/",
    icon: <BsQrCodeScan size={20} className="mx-1 inline-block" />,
  },
  events: {
    id: 1,
    name: "Events",
    route: "events/",
    icon: <BsCalendarEvent size={20} className="mx-1 inline-block" />,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserVerificator />
        <div className="grid h-screen grid-cols-6 grid-rows-6 text-neutral-500 md:text-lg">
          <div className="col-span-1 row-span-6 bg-white">
            <div className="mt-5 flex justify-center overflow-y-auto text-center">
              <Link href="/app">
                <BsQrCodeScan size={100} />
                <p className="py-3">Ticketify</p>
              </Link>
            </div>
            <ul className="w-full px-4">
              <SidebarItem module={modules["events"]} />
            </ul>
          </div>
          <div className="col-span-5 row-span-1 bg-neutral-100">
            <div className="p-3 text-right">
              <UserInfoBanner />
            </div>
          </div>
          <div className="col-span-5 row-span-5 bg-neutral-100">
            <div className="mx-4 px-5 py-5 rounded-lg border bg-white drop-shadow-md">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

function SidebarItem({ module }: { module: Module }) {
  return (
    <Link href={`/app/${module.route}`} className="flex items-center">
      {module.icon}
      <li className="inline-block px-3">{module.name}</li>
    </Link>
  );
}
