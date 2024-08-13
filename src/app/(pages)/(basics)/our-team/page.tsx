import { FC } from 'react';

const OurTeam: FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Our Team</h1>
      <p className="mb-4">Meet the talented team behind our news website. We are dedicated to bringing you the latest news and insights from around the world.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded p-4">
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-gray-600">Editor-in-Chief</p>
          <p className="mt-2">John oversees all editorial content and ensures that our news is accurate and timely.</p>
        </div>
        <div className="border rounded p-4">
          <h2 className="text-xl font-semibold">Jane Smith</h2>
          <p className="text-gray-600">Senior Reporter</p>
          <p className="mt-2">Jane covers major news events and provides in-depth analysis on current affairs.</p>
        </div>
        <div className="border rounded p-4">
          <h2 className="text-xl font-semibold">Emily Johnson</h2>
          <p className="text-gray-600">Social Media Manager</p>
          <p className="mt-2">Emily handles our social media channels and engages with our audience online.</p>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
