export interface TicketType {
  id: number;
  name: string;
  price: number;
}

export interface Event {
  id: number;
  created_by: number;
  name: string;
  scheduled_datetime: string;
  description: string;
  created_at: string;
  edited_at: string;
}

export interface TicketOrderDetail {
  ticket_type_id: number;
  amount: number;
}
