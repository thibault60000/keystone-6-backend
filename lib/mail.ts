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

function createEmailContent(resetToken: string) {
  const url = `${
    process.env.FRONTEND_URL || 'http://localhost:3000'
  }/reset?token=${resetToken}`;

  console.log('Reset token', resetToken);
  console.log('Make a nice email : ', url);
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
          <p> Thibault </p>
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

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  console.log('Frontend URL', process.env.FRONTEND_URL);
  console.log('Mail user', process.env.MAIL_USER);

  const info: any = await transport.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Votre lien de récupération de mot de passe',
    html: createEmailContent(resetToken),
  } as Info);

  if ((process.env.MAIL_USER || '').includes('ethereal.email')) {
    console.log(
      `Message sent ! Preview : ${getTestMessageUrl(info) as string}`
    );
  }
}
