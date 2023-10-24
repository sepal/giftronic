import Image from "next/image";
import Link from "next/link";

const Header = () => (
  <header className="p-2 bg-gray-200">
    <div className="flex justify-center md:justify-start">
      <Link href={"/"}>
        <Image
          className="h-8 w-auto"
          src="/logo.png"
          alt="Giftronic"
          width={662}
          height={125}
        />
      </Link>
    </div>
  </header>
);

export { Header };
