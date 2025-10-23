import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="flex justify-start">
            <div className="bg-gray-200 rounded-lg p-2 w-3/4">
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
