export default function Home() {
  return (
    <div className="h-screen grid grid-cols-1 place-items-center bg-neutral-900">
      <div className="p-5 border rounded-lg border-zinc-800 w-1/3 bg-zinc-800">
        <p className="text-xl">Log In</p>
        <form>
          <label htmlFor="username" className="block py-2">Username</label>
          <input type="text" id="username" className="block py-2 w-full bg-zinc-700 rounded-lg"/>
          <label htmlFor="password" className="block py-2">Password</label>
          <input type="password" id="password" className="block py-2 bg-zinc-700 rounded-lg w-full"/>
          <button type="submit" className="mt-5 p-2 w-full rounded-md bg-sky-700">Log In</button>
          <p className="pt-3 text-center">New to Ticketify? Sign up.</p>
        </form>
      </div>
    </div>
  )
}
