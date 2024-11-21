import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search } from 'lucide-react';
import React from 'react';

export interface ITransaction {
  id: number;
  usersName: string;
  typeOfRent: 'Year' | 'Month' | 'Day';
  buktiTransfer: string;
  status: 'Approved' | 'Cancel' | 'Pending';
}

const transactions: ITransaction[] = [
  {
    id: 1,
    usersName: 'Diaz',
    typeOfRent: 'Year',
    buktiTransfer: 'bca.jpg',
    status: 'Approved',
  },
];

export default function TransactionPage() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 pt-9">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Incoming Transaction</h1>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Type of Rent</TableHead>
              <TableHead>Bukti Transfer</TableHead>
              <TableHead>Status Payment</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.usersName}</TableCell>
                <TableCell>{transaction.typeOfRent}</TableCell>
                <TableCell>{transaction.buktiTransfer}</TableCell>
                <TableCell>
                  <Badge className="text-white">{transaction.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <button
                    className="inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-100"
                    aria-label="View details"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
