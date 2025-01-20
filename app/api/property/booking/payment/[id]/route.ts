import midtrans from "@/lib/midtrans";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function createTransaction(params: any) {
    try {
        const result = await midtrans.createTransaction(params);
        return result;
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw new Error(`Failed to create transaction: ${(error as Error).message}`);
    }
}

export async function initiatePayment(totalAmount: number, bookingId: number) {
    const orderId = `order-${Date.now()}`;
    const params = {
        transaction_details: {
            order_id: orderId,
            gross_amount: totalAmount,
        },
        item_details: [],
        callbacks: {
            finish: "http://localhost:3000/booking",
            PUT(orderId: string) {
                return new Promise(async (resolve, reject) => {
                    try {
                        const bookingId = await prisma.booking.findFirst({
                            where: { orderId },
                            select: { id: true },
                        });

                        if (!bookingId) {
                            throw new Error(`Booking not found with orderId ${orderId}`);
                        }

                        await prisma.booking.update({
                            where: { id: bookingId.id },
                            data: { payment: "PROCESS_PAYMENT" },
                        });

                        resolve(undefined);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        },
    };

    await prisma.booking.update({
        where: { id: bookingId },
        data: { orderId: orderId, payment: "PROCESS_PAYMENT" },
    });

    return await createTransaction(params);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);

    const findBooking = await prisma.booking.findUnique({
        where: { id },
        select: {
            price: true
        }
    });

    if (!findBooking || findBooking.price === null) {
        return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    const totalAmount = await initiatePayment(findBooking.price, id);
    return NextResponse.json(totalAmount);
}
