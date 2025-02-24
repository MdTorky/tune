
const Privacy = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <div className="glass p-8 rounded-xl space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-gray-400">
              We collect information that you provide directly to us, including information you provide when you create an account, make a purchase, or contact us for support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-400">
              We use the information we collect to operate and improve our website, products, and customer support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-gray-400">
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-gray-400">
              We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
