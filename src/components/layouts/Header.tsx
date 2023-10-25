import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { UserButton, auth, currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

const Header = () => {
  const { userId } = auth();

  return (
    <header className="p-2 bg-gray-100">
      <div className="flex justify-between items-center h-8">
        <Link href={"/"}>
          <Image
            className="h-6 md:h-8 w-auto"
            src="/logo.png"
            alt="Giftronic"
            width={662}
            height={125}
          />
        </Link>

        <div className="flex gap-2">
          {userId ? (
            <>
              <UserButton />
            </>
          ) : (
            <>
              <Link
                className={buttonVariants({ variant: "secondary" })}
                href={"/sign-in"}
              >
                Login
              </Link>
              <Link
                href={"/sign-up"}
                className={buttonVariants({ variant: "default" })}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
