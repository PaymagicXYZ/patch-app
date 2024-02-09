import isUserId from "@/utils/checkUserId";
import { notFound, redirect } from "next/navigation";

export default function Page({ params }: { params: { userId: string } }) {
  const userId = decodeURIComponent(params.userId);
  if (isUserId(userId)) {
    redirect(`/${userId}/matic`);
  } else {
    notFound();
  }
}
