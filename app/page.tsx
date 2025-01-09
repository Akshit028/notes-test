"use server";

import SignIn from "@/components/sign-in";

export default async function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <SignIn />
    </div>
  );
}
