"use client";

import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

interface UserData {
  username: string;
  isAuthenticated: boolean;
}

export default function UserInfoBanner() {
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    async function fetchUserData() {
      const response = await axiosInstance.get("whoami/");
      setUserData(response.data);
    }

    fetchUserData();
  }, []);

  return (
    <div>Welcome, {userData !== undefined ? userData.username : null}</div>
  );
}
