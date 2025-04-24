
import React from 'react';

const ClientsSection = () => {
  // Placeholder for client logos - in a real implementation, you would use actual client logos
  const clients = [
    { name: 'Client 1' },
    { name: 'Client 2' },
    { name: 'Client 3' },
    { name: 'Client 4' },
    { name: 'Client 5' },
    { name: 'Client 6' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted By Industry Leaders</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We work with leading companies across various industries to optimize their advertising revenue.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {clients.map((client, index) => (
            <div key={index} className="flex items-center justify-center bg-gray-100 rounded-lg w-36 h-20 md:w-44 md:h-24">
              <span className="text-gray-500 font-medium">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
