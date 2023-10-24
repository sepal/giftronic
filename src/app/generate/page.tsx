import { Editor } from "@/components/Editor";
import { Header } from "@/components/layouts/Header";

export default async function Generate() {
  return (
    <>
      <Header />
      <main className="p-4 dark:bg-slate-800 dark:text-white">
        <div className="flex min-h-screen flex-col items-center justify-between max-w-4xl m-auto">
          <Editor />
        </div>
      </main>
    </>
  );
}
