"use client";
import TransCard from '@/components/card/trans-card';
import { ITransaction } from '../transaction/page';

export interface InvoiceProps {
  id: number;
  propertyName: string;
  address: string;
  invoiceNumber: string;
  date: string;
  checkIn: string;
  checkOut: string;
  amenities: string;
  transactions: ITransaction;
  users: {
    fullname: string;
    gender: 'Male' | 'Female';
    phone: string;
  };
  rentDuration: number;
  total: number;
}
export const invoiceData: InvoiceProps[] = [
  {
    id: 1,
    propertyName: 'House Astina',
    address:
      'Jl. Elang IV Perum Permata Bintaro Residence, Pondok Aren,Tangerang Selatan',
    invoiceNumber: 'TCK0101',
    date: 'Saturday, 30 March 2020',
    checkIn: '30 March 2020',
    checkOut: '30 March 2021',
    amenities: 'Furnished',
    transactions: {
      id: 1,
      usersName: 'Diaz',
      typeOfRent: 'Year',
      buktiTransfer: 'bca.jpg',
      status: 'Approved',
    },
    users: {
      fullname: 'Diaz',
      gender: 'Male',
      phone: '088123',
    },
    rentDuration: 2,
    total: 3000000,
  },
];

const InvoicePage = () => {
  return (
    <div className='flex items-center justify-center pt-9'>
      {invoiceData.map((invoice) => (
        <TransCard key={invoice.id} invoice={invoice} />
      ))}
    </div>
  );
};

export default InvoicePage;
