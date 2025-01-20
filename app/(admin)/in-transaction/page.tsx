"use client";
import Invoice from '@/components/dialog/invoices';
import TransactionTable from '@/components/transaction-table';
import { Badge } from '@/components/ui/badge';
import { DialogContent } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function InTransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [id, setId] = useState(0);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/property/booking/get-all', { method: 'GET' });
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const refreshTransactions = () => {
    fetchTransactions();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 pt-9">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Incoming Transaction</h1>
      </div>
      <div className="border rounded-lg">
        <Dialog>
          <TransactionTable
            transactions={transactions}
            filter={['WAITING_PAYMENT', 'PROCESS_PAYMENT']}
            onActionClick={(transactionId) => setId(transactionId)}
          />
          <DialogContent className="w-[80%]">
            <Invoice id={id} onRefresh={refreshTransactions} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
