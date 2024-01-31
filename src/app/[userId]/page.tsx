import isUserId from '@/utils/checkUserId';
import { redirect } from 'next/navigation';

export default function Page({ params }: { params: { userId: string } }) {
  const userId = decodeURIComponent(params.userId);
  console.log('userId', userId);
  if (isUserId(userId)) {
    redirect(`/${userId}/matic`);
  } else {
    redirect('/user');
  }
}
