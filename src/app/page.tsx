import { UserButton } from "@clerk/nextjs";
import { serverClient } from "./_trpc/serverClient";

export default async function Home() {
  const data = await serverClient.getData();
  const dataSet = await serverClient.setData("test-data");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <UserButton afterSignOutUrl="/" /> */}
      <div>{data}</div>
      <div>{dataSet}</div>
    </main>
  );
}
