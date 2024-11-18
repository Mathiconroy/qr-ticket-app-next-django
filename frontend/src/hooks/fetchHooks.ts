import useSWR from 'swr';
import { TicketType } from '@/interfaces/interfaces';

const fetcher = async (url: string): Promise<any> => {
  const baseUrl = '/api';
  const fetchUrl = `${baseUrl}${url}`;
  const token = localStorage.getItem('token');
  const authorizationHeaderValue = token ? `Token ${token}` : '';
  const res = await fetch(fetchUrl, {
    headers: {
      Authorization: authorizationHeaderValue
    }
  });
  return await res.json();
};

export function useTicketTypes(id: number) {
  return useSWR<TicketType[]>(`/events/${id}/ticketTypes/`, fetcher);
}

export function useTicketOrders(id: number) {
  return useSWR(`/events/${id}/ticketOrders/`, fetcher);
}
