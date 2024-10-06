import React, { useState, useEffect } from 'react';

export default function CustomAlert({ type, message, onClose }: { type: string, message: string, onClose: () => void }) {
    const [show, setShow] = useState(false); // Start with show as false

    useEffect(() => {
        // Show the alert after a delay
        const timer = setTimeout(() => {
            setShow(true);
        }, 100);

        // Automatically close the alert after 4 seconds
        const closeTimer = setTimeout(() => {
            setShow(false);
            onClose();
        }, 4000);

        // Clear the timeouts to avoid memory leaks
        return () => {
            clearTimeout(timer);
            clearTimeout(closeTimer);
        };
    }, [onClose]);

    const handleDismiss = () => {
        setShow(false);
        onClose();
    };

    return (
        <div className={`fixed bottom-4 right-4 transform transition-transform duration-300 ${show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
            <div className={`bg-card p-4 rounded-md shadow-md ${type === 'success' ? 'bg-green-600' : 'bg-red-600'} bg-opacity-50 backdrop-blur-sm`}>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{message}</p>
                    <button onClick={handleDismiss} className="ml-4 text-gray-900 hover:text-gray-700 focus:outline-none dark:text-gray-200">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
