import useSWR from 'swr';
import { TicketType } from '@/interfaces/interfaces';

export const fetcher = async (url: string): Promise<any> => {
  const baseUrl = '/api';
  const fetchUrl = `${baseUrl}${url}`;
  const token = localStorage.getItem('token');
  const authorizationHeaderValue = token ? `Token ${token}` : '';
  const res = fetch(fetchUrl, {
    headers: {
      Authorization: authorizationHeaderValue
    }
  });
  return res;
};

export const fetcherJson = async (url: string): Promise<any> => {
  const res = await fetcher(url);
  return await res.json();
};

export const post = async <T>(url: string, body: any): Promise<T> => {
  const baseUrl = '/api';
  const fetchUrl = `${baseUrl}${url}`;
  const token = localStorage.getItem('token');
  const authorizationHeaderValue = token ? `Token ${token}` : '';
  const res = await fetch(fetchUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorizationHeaderValue
    },
    body: JSON.stringify(body)
  });
  return (await res.json()) as T;
};

export const downloader = async (url: string): Promise<any> => {
  const res = await fetcher(url);
  const blob = await res.blob();
  const blobUrl = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = blobUrl;
  link.setAttribute('download', `FileName.pdf`);

  // Append to html link element page
  document.body.appendChild(link);

  // Start download
  link.click();

  // Clean up and remove the link
  link.remove();
};

export function useTicketTypes(id: number) {
  return useSWR<TicketType[]>(`/events/${id}/ticketTypes/`, fetcherJson);
}

export function useTicketOrders(id: number) {
  return useSWR(`/events/${id}/ticketOrders/`, fetcherJson);
}

export function useUser() {
  return useSWR(`/whoami/`, fetcherJson);
}
