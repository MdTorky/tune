
const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic features for personal use",
      features: [
        "10 searches per day",
        "Basic playlist information",
        "Download video information",
        "Save up to 5 playlists"
      ]
    },
    {
      name: "Pro",
      price: "$9.99",
      description: "Advanced features for content creators",
      features: [
        "Unlimited searches",
        "Advanced analytics",
        "Bulk downloads",
        "Priority support",
        "Unlimited saved playlists"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-gray-400">
          Choose the plan that fits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="glass p-8 rounded-xl transition-transform hover:scale-105"
          >
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold mb-4 text-primary">{plan.price}</div>
            <p className="text-gray-400 mb-6">{plan.description}</p>
            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-primary mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full btn-primary mt-8">Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
