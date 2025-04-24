
import React from 'react';

const StatsSection = () => {
  const stats = [
    { value: '500+', label: 'Clients Worldwide' },
    { value: '45%', label: 'Avg. Revenue Increase' },
    { value: '150M+', label: 'Ads Optimized' },
    { value: '24/7', label: 'Support Available' },
  ];

  return (
    <section className="py-16 bg-brand-orange">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-white/80 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
