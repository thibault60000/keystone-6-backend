import { KeystoneContext } from '@keystone-6/core/types';
import dotenv from 'dotenv';
import { sendConfirmBookingEmail } from '../../lib/mail';

interface Arguments {
  giftId: string;
}
interface Session {
  itemId: string;
  listKey: string;
  data: {
    name: string;
    email: string;
  };
}

export interface Gift {
  name: string;
  price: string;
  list: {
    id: string;
  };
  reservedBy: {
    id: string;
    email: string;
  };
  anonymousReservedBy: string;
}

async function confirmBooking(
  root: any,
  { giftId }: Arguments,
  context: KeystoneContext
): Promise<void> {
  console.log('Confirm Booking)');

  const session = context.session as Session;

  console.log('context', Object.keys(context));

  console.log('session', session);

  const userId = session?.itemId;

  if (!userId) throw new Error('❌ You must be logged');

  const gift: any = await context.query.Gift.findOne({
    where: { id: giftId },
    query: `
        id
        name
        price
        list {
            id
        }
        user {
            id
        }
        reservedBy {
            id
            email
        }
        anonymousReservedBy
    `,
  });

  console.log('Query gift for booking', gift);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (gift?.reservedBy?.id && gift?.reservedBy?.id !== userId)
    throw new Error('❌ Your not the reservator');

  await sendConfirmBookingEmail(gift);
}

export default confirmBooking;
