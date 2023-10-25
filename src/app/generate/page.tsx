import { Editor } from "@/components/Editor";
import { Header } from "@/components/layouts/Header";
import { getUser } from "@/server/data/user";
import { auth } from "@clerk/nextjs";

export default async function Generate() {
  const { userId } = auth();

  const user = userId ? await getUser(userId) : null;

  return (
    <>
      <Header />
      <main className="p-4 dark:bg-slate-800 dark:text-white">
        <div className="flex min-h-screen flex-col items-center justify-between max-w-4xl m-auto">
          <Editor defaultCredits={user?.credits} />
        </div>
      </main>
    </>
  );
}
