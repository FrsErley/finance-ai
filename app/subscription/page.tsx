import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/ui/navbar";
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  return <Navbar />;
};

export default SubscriptionPage;
