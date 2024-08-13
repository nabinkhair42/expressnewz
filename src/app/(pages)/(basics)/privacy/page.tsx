import { FC } from 'react';

const PrivacyPolicy: FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">At our news website, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.</p>
      <h2 className="text-2xl font-semibold mt-6">Information We Collect</h2>
      <p className="mb-4">We collect information that you provide directly to us, such as when you subscribe to our newsletter or contact us.</p>
      <h2 className="text-2xl font-semibold mt-6">How We Use Your Information</h2>
      <p className="mb-4">We use your information to provide you with the best possible service, including sending you updates and responding to your inquiries.</p>
      <h2 className="text-2xl font-semibold mt-6">Your Rights</h2>
      <p className="mb-4">You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.</p>
      <h2 className="text-2xl font-semibold mt-6">Changes to This Policy</h2>
      <p className="mb-4">We may update this policy from time to time. We encourage you to review this page periodically to stay informed about how we are protecting your information.</p>
    </div>
  );
};

export default PrivacyPolicy;
