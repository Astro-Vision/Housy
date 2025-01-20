"use client";
import Invoice from '@/components/dialog/invoices';
import TransactionTable from '@/components/transaction-table';
import { DialogContent } from '@/components/ui/dialog';
import { Dialog } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

export default function TransactionPage() {
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
      <h1 className="text-2xl font-bold mb-6">Outgoing Transaction</h1>
      <div className="border rounded-lg">
        <Dialog>
          <TransactionTable
            transactions={transactions}
            filter={['APPROVE']}
            onActionClick={(selectedId: number) => setId(selectedId)} 
          />
          <DialogContent className="w-[80%]">
            <Invoice id={id} onRefresh={refreshTransactions} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
