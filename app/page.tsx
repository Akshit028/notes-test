"use server";

import SignIn from "@/components/sign-in";

export default async function Home() {
  return (
    <div>
      Notes
      <div>
        <SignIn />
      </div>
    </div>

  );
}
