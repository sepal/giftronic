import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const Header = () => (
  <header className="p-2 bg-gray-100">
    <div className="flex justify-around md:justify-between items-center">
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
      </div>
    </div>
  </header>
);

export { Header };
