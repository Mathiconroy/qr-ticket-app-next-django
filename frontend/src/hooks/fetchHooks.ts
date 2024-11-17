import useSWR from 'swr';
import axiosInstance from '@/axiosInstance';

const fetcher = (url: string) => axiosInstance.get(url);

export function useTicketTypes(id: number) {
  return useSWR(`/events/${id}/ticketTypes/`, fetcher);
}

export function useTicketOrders(id: number) {
  return useSWR(`/events/${id}/tickets/`, fetcher);
}
