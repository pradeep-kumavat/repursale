import { render } from '@react-email/render';
import Head from 'next/head';
import React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
  subject: string;
}

const ContactFormEmail: React.FC<ContactFormEmailProps> = ({ name, email, message, subject }) => {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Contact Form Submission</title>
      </Head>
      <body style={{
        fontFamily: 'Arial, sans-serif',
        lineHeight: 1.6,
        color: '#333',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
      }}>
        <h1 style={{
          color: '#444',
          borderBottom: '1px solid #ddd',
          paddingBottom: '10px',
        }}>
          New Contact Form Submission
        </h1>
        <p>You have received a new message from Repursale contact form:</p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Name:</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{name}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Email:</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{email}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Subject:</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{subject}</td>
            </tr>
          </tbody>
        </table>
        <h2 style={{ marginTop: '20px', color: '#555' }}>Message:</h2>
        <p style={{
          backgroundColor: '#f9f9f9',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '15px',
          whiteSpace: 'pre-wrap',
        }}>
          {message}
        </p>
        <p style={{ fontSize: '0.8em', color: '#777', marginTop: '30px' }}>
          This email was sent from Repursale contact form. Please do not reply directly to this email.
        </p>
      </body>
    </html>
  );
};

export const generateContactFormEmail = async (props: ContactFormEmailProps): Promise<string> => {
  return await render(<ContactFormEmail {...props} />);
};

export default ContactFormEmail;