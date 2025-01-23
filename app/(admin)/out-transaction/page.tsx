"use client";
import Invoice from '@/components/dialog/invoices';
import TransactionTable from '@/components/transaction-table';
import { DialogContent } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Icon } from '@iconify/react/dist/iconify.js';
import { Dialog } from '@radix-ui/react-dialog';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/property/booking/get-all', { method: 'GET' });
      const data = await response.json();
      setTransactions(data);
      setIsLoading(false);
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

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-2xl">Loading...</p>
    </div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 pt-9">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Outgoing Transaction</h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Icon icon="line-md:close-to-menu-alt-transition" width="28" height="28" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link className="w-full text-center" href="/in-transaction">In Transaction</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-full text-center" href="/property">Add Property</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
