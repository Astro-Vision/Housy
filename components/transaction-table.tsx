import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Booking, Property } from '@prisma/client';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Search } from 'lucide-react';
import Image from 'next/image';

interface Transaction {
    id: number;
    user?: {
        username?: string;
        Booking?: {
            property?: {
                typeOfRent?: string;
            };
        }[];
    };
    image: string;
    payment: 'WAITING_PAYMENT' | 'PROCESS_PAYMENT' | 'APPROVE' | string;
}

interface TransactionTableProps {
    transactions: Transaction[];
    filter: string[];
    onActionClick: (id: number) => void;
}

export default function TransactionTable({ transactions, filter, onActionClick }: TransactionTableProps) {
    const filteredTransactions = transactions.filter(transaction => filter.includes(transaction.payment));

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Type of Rent</TableHead>
                    <TableHead>Proof of Transfer</TableHead>
                    <TableHead>Status Payment</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredTransactions.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500">
                            No transactions yet
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredTransactions.map((transaction, index) => (
                        <TableRow key={transaction.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{transaction?.user?.username || 'N/A'}</TableCell>
                            <TableCell>{transaction?.user?.Booking?.[0]?.property?.typeOfRent || 'N/A'}</TableCell>
                            <TableCell>
                                <Image width={70} height={70} src={transaction.image} alt="proof of transfer" />
                            </TableCell>
                            <TableCell>
                                <Badge
                                    className={`mt-2 ${transaction?.payment === 'WAITING_PAYMENT'
                                        ? 'bg-red-100 text-red-800'
                                        : transaction?.payment === 'PROCESS_PAYMENT'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : transaction?.payment === 'APPROVE'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    {transaction?.payment}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <DialogTrigger asChild>
                                    <button
                                        className="inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-100"
                                        aria-label="View details"
                                        onClick={() => onActionClick(transaction.id)}>
                                        <Search className="h-4 w-4" />
                                    </button>
                                </DialogTrigger>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
