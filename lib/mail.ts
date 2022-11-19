import 'dotenv/config';
import {
  createTransport,
  getTestMessageUrl,
  TransportOptions,
} from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
} as TransportOptions);

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

function createResetPasswordContent(resetToken: string) {
  const url = `${
    process.env.FRONTEND_URL || 'http://localhost:3000'
  }/reset?token=${resetToken}`;

  console.log('TOKEN Reset password', resetToken);
  console.log('URL Reset password : ', url);

  return `
      <div style="
          border: 1px;
          padding: 20px;
          font-family: sans-serif;
          line-height: 2;
          font-size: 20px;"
      >
          <h2> Bonjour, </h2>
          <a href="${url}" /> Votre lien de récupération de mot de passe </a>
          <p> Liste cadeaux </p>
      </div>
  `;
}

function createConfirmBookingContent(gift: Gift) {
  // TODO : Process.env
  const giftUrl = `http://localhost:3000/list/${gift?.list?.id}`;

  return `
    <div style="
      border: 1px;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;"
    >
      <h2> Bonjour, </h2>
      <p> Vous venez de réserver le cadeau suivant :
        <strong>
          ${gift?.name}
        </strong> pour un montant de
        <strong>
          ${gift?.price} euros
        </strong>
      </p>
      <p> Vous pouvez <a href="${giftUrl}" target="_blank">retrouver le cadeau ici</a> </p>
      <p> Liste cadeaux </p>
    </div>
  `;
}

export interface Envelope {
  from: string;
  to?: string[] | null;
}

export interface MailResponse {
  // Used 'jvilk.com/MakeTypes to translate JSON Response to TypeScript type
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export interface Info {
  to: string;
  from: string;
  subject: string;
  html: string;
}

export async function sendConfirmBookingEmail(gift: Gift): Promise<void> {
  console.log('Send email to confirm booking');

  const to = gift?.reservedBy?.email || gift?.anonymousReservedBy;

  const info: any = await transport.sendMail({
    to,
    from: 'test@example.com',
    subject: "Merci d'avoir réserver un cadeau",
    html: createConfirmBookingContent(gift),
  } as Info);

  if ((process.env.MAIL_USER || '').includes('ethereal.email')) {
    console.log(
      `Message sent ! Preview : ${getTestMessageUrl(info) as string}`
    );
  }
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  console.log('Send email to reset password');

  const info: any = await transport.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Votre lien de récupération de mot de passe',
    html: createResetPasswordContent(resetToken),
  } as Info);

  if ((process.env.MAIL_USER || '').includes('ethereal.email')) {
    console.log(
      `Message sent ! Preview : ${getTestMessageUrl(info) as string}`
    );
  }
}
