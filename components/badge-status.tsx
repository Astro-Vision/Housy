import { Badge } from '@/components/ui/badge';

interface BadgeStatusProps {
    payment: string;
}

export default function BadgeStatus({ payment }: BadgeStatusProps) {
    const statusClass =
        payment === 'WAITING_PAYMENT'
            ? 'bg-red-100 text-red-800'
            : payment === 'PROCESS_PAYMENT'
                ? 'bg-yellow-100 text-yellow-800'
                : payment === 'APPROVE'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800';

    return <Badge className={`mt-2 ${statusClass}`}>{payment}</Badge>;
}
