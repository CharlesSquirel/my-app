export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export type Protocol = {
  id?: string;
  author: string;
  firma: string;
  createdAt: string;
  type: 'valve' | 'chiller';
  description?: string;
};
