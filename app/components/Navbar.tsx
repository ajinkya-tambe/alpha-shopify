import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  {
    console.log(session);
  }

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.jpg" alt="logo" width={150} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Logout</button>
              </form>

              <Link
                href={`/user/${session?.user.name}`}
                className="flex items-center gap-2"
              >
                {session?.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={`${session.user.name}'s profile`}
                    width={30} // Adjust width to suit your navbar
                    height={30} // Adjust height to suit your navbar
                    className="rounded-full" // Add rounded styling for a circular profile picture
                  />
                )}
                {/* <span>{session?.user?.name || "User"}</span> */}
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
