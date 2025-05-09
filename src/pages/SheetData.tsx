
import React from 'react';
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SheetDataViewer from '@/components/SheetDataViewer';

const SheetData = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <div className="py-12 bg-muted relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Google Sheet Data
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              View and manage data from your Google Sheet
            </motion.p>
          </div>
        </div>

        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <SheetDataViewer />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SheetData;
