import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex justify-center items-center py-2">
      <SignUp />
    </main>
  );
}
