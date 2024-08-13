import { FC } from 'react';

const ContactUs: FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">We’d love to hear from you! Please reach out to us using the contact form below or at our email address.</p>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input id="name" type="text" className="mt-1 block w-full border rounded-md p-2" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input id="email" type="email" className="mt-1 block w-full border rounded-md p-2" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <textarea id="message" rows={4} className="mt-1 block w-full border rounded-md p-2"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
