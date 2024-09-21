'use client';

import { useEffect } from 'react';

export default function UserVerificator() {
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/whoami/', {
      credentials: 'include',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return;
        }
        throw 'User not logged in.';
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return <></>;
}
