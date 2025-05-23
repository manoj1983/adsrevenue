import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const HeroSection = () => {
  const revenueData = [
    { month: 'Jan', revenue: 25 },
    { month: 'Feb', revenue: 35 },
    { month: 'Mar', revenue: 30 },
    { month: 'Apr', revenue: 45 },
    { month: 'May', revenue: 40 },
    { month: 'Jun', revenue: 55 },
    { month: 'Jul', revenue: 65 },
  ];

  return (
    <section className="pt-32 pb-20 md:pt-44 md:pb-32 relative overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/f3a3a1b0-7d32-4e05-b431-5f958f956bf1.png"
          alt="Digital Marketing Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black opacity-0 animate-[fade-in_0.6s_ease-out_0.3s_forwards]">
              <span>Maximize Your</span> <span className="text-brand-orange">Ad Revenue</span> <span>With Expert Solutions</span>
            </h1>
            <p className="text-lg text-black mb-8 md:pr-12 opacity-0 animate-[fade-in_0.6s_ease-out_0.4s_forwards]">
              Take your advertising income to the next level with our innovative optimization strategies and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-6 text-lg opacity-0 animate-[fade-in_0.6s_ease-out_0.6s_forwards] transition-transform duration-300 hover:scale-105">
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-8 py-6 text-lg opacity-0 animate-[fade-in_0.6s_ease-out_0.8s_forwards] transition-transform duration-300 hover:scale-105">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 opacity-0 animate-[fade-in_0.6s_ease-out_1s_forwards]">
            <div className="relative bg-white rounded-xl shadow-xl p-6 md:p-8 transform transition-transform duration-500 hover:translate-y-[-5px]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-xl">Revenue Growth</h3>
                    <p className="text-gray-500">Monthly Performance</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-green-500 text-lg font-semibold">+42%</span>
                </div>
              </div>

              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <YAxis 
                      hide={true}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '0.5rem',
                        padding: '0.5rem'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#FF6347"
                      strokeWidth={3}
                      dot={{ fill: '#FF6347', strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: '#FF6347' }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="absolute -z-10 opacity-5 inset-0 overflow-hidden rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                  alt="Analytics Background"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-brand-orange/10 rounded-full -z-10 animate-pulse"></div>
              <div className="absolute -top-4 -left-4 w-40 h-40 bg-blue-100 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-blue-50 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 right-1/3 w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
