import '../globals.css'
import { Inter } from 'next/font/google'
import { BsQrCodeScan } from 'react-icons/bs'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

type Module = {
  id: number
  name: string
  route: string
}

interface ModuleObject {
  [index: string]: Module
}

const modules: ModuleObject = {
  "index":  {
    id: 0,
    name: "Dashboard",
    route: "/",
  },
  "events": {
    id: 1,
    name: "Events",
    route: "/events",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid grid-cols-6 grid-rows-6 h-screen text-neutral-500">
          <div className="col-span-1 row-span-6 bg-white">
            <div className="overflow-y-auto mt-5 flex justify-center text-center">
              <Link href="/">
                <BsQrCodeScan size="98"/> 
                <p className="py-3">Ticketify</p>
              </Link>
            </div>
            <ul className="w-full px-4">
              <li>{modules["events"].name}</li>
            </ul>
          </div>
          <div className="col-span-5 row-span-1 bg-neutral-100">UWU</div>
          <div className="col-span-5 row-span-5 bg-neutral-100">{children}</div>
        </div>
      </body>
    </html>
  )
}
