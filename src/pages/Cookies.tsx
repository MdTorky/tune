
const Cookies = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Cookie Policy
        </h1>
        
        <div className="glass p-8 rounded-xl space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
            <p className="text-gray-400">
              Cookies are small text files that are placed on your computer by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
            <p className="text-gray-400">
              We use cookies to:
            </p>
            <ul className="list-disc list-inside text-gray-400 mt-2">
              <li>Remember your preferences and settings</li>
              <li>Help with navigation and user experience</li>
              <li>Analyze how our website is used</li>
              <li>Personalize content and advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
            <p className="text-gray-400">
              Essential cookies: These are cookies that are required for the operation of our website.
            </p>
            <p className="text-gray-400 mt-2">
              Analytical/performance cookies: These cookies allow us to recognize and count the number of visitors and see how visitors move around our website when they are using it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
            <p className="text-gray-400">
              Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent. The Help portion of your browser's toolbar can tell you how to prevent your browser from accepting new cookies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
