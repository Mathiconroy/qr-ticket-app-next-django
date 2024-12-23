'use client';

import { useUser } from '@/hooks/fetchHooks';

interface UserData {
  username: string;
  isAuthenticated: boolean;
}

export default function UserInfoBanner() {
  const { data: userData } = useUser();

  return <div>Welcome, {userData !== undefined ? userData.username : null}</div>;
}
