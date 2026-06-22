export interface User {
  id: string;
  name: string;
  role: 'user' | 'admin';
  cardNo?: string;
}

export interface QueueItem {
  id: number;
  queueNumber: string;
  name: string;
  cardNo: string;
  status: 'waiting' | 'serving' | 'done';
}

export interface AppState {
  stock: number;
  totalStock: number;
  queue: QueueItem[];
}
