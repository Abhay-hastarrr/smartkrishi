import React from 'react';
import ChatBot from '../components/ChatBot';

const Help = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full max-w-2xl h-[450px]">
        <ChatBot />
      </div>
    </div>
  );
};

export default Help;
