import { Editor } from "@/components/Editor";

export default async function Generate() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4  max-w-2xl m-auto">
      <Editor />
    </main>
  );
}
