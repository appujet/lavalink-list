import React, { useEffect, useState } from 'react';
import CustomAlert from './CustomAlert ';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { ApiNode } from '../../types';


export default function NodeDetails({ node, visible, onClick }: { node: ApiNode; visible: boolean; onClick: () => void }) {
    const [alert, setAlert] = useState<{ message: string; type: string; } | null>(null);

    const handleCloseAlert = () => {
        setAlert(null);
    };
    useEffect(() => {
        AOS.init();
    
    }, []);

    const handleCopy = (node: ApiNode) => {
        const data = {
            identifier: node.identifier,
            password: node.password,
            host: node.host,
            port: node.port,
            secure: node.secure,
        };

        navigator.clipboard.writeText(JSON.stringify(data, null, 2))
            .then(() => {
                // Show success alert
                setAlert({ message: 'Node details copied successfully!', type: 'success' });
            })
            .catch((error) => {
                console.error('Copy failed: ', error);
                // Show error alert
                setAlert({ message: 'Failed to copy node details. Please try again.', type: 'error' });
            });
    };

    if (!visible) return null;

    const handleOnClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClick();
        }
    };

    return (
        <>
            <div id="container" onClick={handleOnClose} className="fixed inset-0 bg-card/10 backdrop-blur-sm flex justify-center items-center">
                {alert && <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />}
                <div className="bg-card max-w-md  xs:max-w-xs mx-auto p-2 rounded-lg shadow-md dark:border dark:border-gray-700/30 dark:text-card-foreground hover:dark:border-gray-700/50 transition-all duration-300 relative" data-aos="zoom-in">
                    {/* Close button */}
                    <button onClick={onClick} className="absolute top-0 right-0 p-1 dark:text-white dark:hover:text-gray-400 text-gray-700 hover:text-gray-600 focus:outline-none">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    {/* user */}
                    <div className="flex items-center justify-center mt-2">
                        {/* user avatar */}
                        <img className="w-10 h-10 rounded-full shadow-lg" src={node.author.avatar} alt="profile" />
                    </div>
                    <div className="flex flex-col items-center justify-center mt-2">
                        <h2 className="text-sm font-semibold">Hosted by {node.author.username}</h2>
                        <a href={node.author.url} target="_blank" className="text-xs text-blue-500 font-semibold">Visit Profile</a>
                    </div>
                    <ul className="grid grid-cols-1 gap-2 px-4 w-full items-center justify-center mt-2 p-2">
                        <li className="flex items-center">
                            <span className="w-full h-0.5 dark:bg-white/10 bg-gray-400 rounded-full"></span>
                        </li>
                        {/* node */}
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-xs font-semibold mb-2">Node</h2>
                            <div className="bg-gray-500 bg-opacity-10 rounded-lg p-2 flex items-center">
                                <code className="text-xs font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.lime.800),theme(colors.lime.600),theme(colors.emerald.700),theme(colors.green.800),theme(colors.emerald.700),theme(colors.lime.600),theme(colors.lime.800))] animate-gradient dark:bg-[linear-gradient(to_right,theme(colors.lime.500),theme(colors.lime.300),theme(colors.emerald.400),theme(colors.green.500),theme(colors.emerald.400),theme(colors.lime.300),theme(colors.lime.500))] bg-[length:200%_auto]">{node.identifier}</code>
                                {/* Move the button outside of the code box */}
                                <button className="p-1 dark:text-white dark:hover:text-gray-400 text-gray-700 hover:text-gray-600 focus:outline-none ml-2" onClick={() => handleCopy(node)}>
                                    <FontAwesomeIcon icon={faCopy as any} />
                                </button>
                            </div>
                        </div>
                        {/* Source */}
                        {node.info.sourceManagers.length > 0 && (
                            <div className="flex flex-col items-center justify-center">
                                <h2 className="text-xs font-semibold mb-2">Source</h2>
                                <div className="bg-gray-500 bg-opacity-10 rounded-lg p-2 flex">
                                    <code className="text-xs">{node.info.sourceManagers.map((source) => capitalizeFirstLetter(source)).join(', ')}</code>
                                </div>
                            </div>
                        )}
                        {/* Plugins */}
                        {node.info.plugins.length > 0 && (
                            <div className="flex flex-col items-center justify-center">
                                <h2 className="text-xs font-semibold mb-2">Plugins</h2>
                                <div className="bg-gray-500 bg-opacity-10 rounded-lg p-2 flex">
                                    <code className="text-xs">{node.info.plugins.map((plugin) => `${plugin.name}@${plugin.version}`).join(', ')}</code>
                                </div>
                            </div>
                        )}
                        {/* filters */}
                        {node.info.filters.length > 0 && (
                            <div className="flex flex-col items-center justify-center">
                                <h2 className="text-xs font-semibold mb-2">Filters</h2>
                                <div className="bg-gray-500 bg-opacity-10 rounded-lg p-2 flex">
                                    <code className="text-xs">{node.info.filters.map((filter) => capitalizeFirstLetter(filter)).join(', ')}</code>
                                </div>
                            </div>
                        )}
                    </ul>
                    
                </div>
            </div>
        </>
    );
}


function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}