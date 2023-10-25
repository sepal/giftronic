import { Header } from "@/components/layouts/Header";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <Header />
      <main className="justify-between p-4 dark:bg-slate-800 dark:text-white max-w-md mx-auto">
        <h1 className="text-xl text-center my-4">
          Thanks for requesting credits!
        </h1>

        <p>
          Giftronic is still in early stages, and as such, there is no way to
          buy new credits. You can{" "}
          <Link className="text-blue-700 underline" href={"/sign-up"}>
            sign-up
          </Link>{" "}
          to be notified when new credits are available though.
        </p>
      </main>
    </>
  );
}
