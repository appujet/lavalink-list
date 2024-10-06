
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMemory,
    faPlug,
    faServer,
    faMicrochip,
    faClock,
    faTags,
    faHourglassEnd,
    faVolcano,
    faMusic,
    faWifi
} from '@fortawesome/free-solid-svg-icons';
import {
    faJava
} from '@fortawesome/free-brands-svg-icons'
import { ApiNode } from '../../types';


export default function NodeList({ node, setClickedNode, setClicked }: { node: ApiNode; setClickedNode: (node: ApiNode) => void, setClicked: (state: boolean) => void }) {
    
    const [updateTime, setUpdateTime] = useState<number>(0);

    const getStatusClasses = () => {
        const baseClasses = 'inline-flex items-center text-xs font-medium ml-2 px-2.5 py-0.5 rounded-full';
        const commonClasses = `w-2 h-2 rounded-full absolute`;

        if (node.isConnected) {
            return {
                container: ` dark:bg-green-800 bg-green-200 ${baseClasses} dark:text-green-100 text-green-800 dark:bg-opacity-50`,
                dotNormal: `bg-green-500 ${commonClasses}`,
                dot: `bg-green-500 ${commonClasses} animate-ping`,
            };
        } else {
            return {
                container: `dark:bg-red-800 bg-red-200 ${baseClasses} dark:text-red-100 text-red-800 dark:bg-opacity-50`,
                dotNormal: `bg-red-500 ${commonClasses}`,
                dot: `bg-red-500 ${commonClasses} animate-ping`,
            };
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setUpdateTime(Date.now() - new Date(node.updatedAt).getTime());
        }, 1000);
        return () => clearInterval(interval);
    }
        , [node.updatedAt]);

    const { container, dotNormal, dot } = getStatusClasses();

    return (
        <>
            <div
                className={`p-4 justify-center text-center bg-card/50 backdrop-filter backdrop-blur-sm text-card-foreground light:border light:border-gray-200 rounded-lg shadow mt-4 hover:shadow-lg hover:border-gray-300 dark:bg-card/50 dark:border dark:border-gray-700/30 dark:text-card-foreground hover:dark:border-gray-700/50 transition-all duration-300`}
                style={{
                    animation: `slide-in 0.5s cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
                onClick={() => {
                    setClickedNode(node);
                    setClicked(true);
                }}
            >
                <div className="flex flex-col items-center">
                    <div className="flex justify-center left-0 right-0 mx-auto mb-4 relative">
                        <span className={container}>
                            <span className={dot} style={{ animationDuration: '1.5s' }}></span>
                            <span className={dotNormal}></span>
                            <span className="ml-4">{node.isConnected ? 'Online' : 'Offline'}</span>
                        </span>
                        {/* icon of author */}

                        <div className="text-sm font-semibold flex items-center">
                            <p className="text-xs ml-1 mr-1">Hosted by</p>
                            <img
                                className="w-5 h-5 rounded-full"
                                src={node.author.avatar || 'https://cdn.discordapp.com/avatars/959276033683628122/b18ad5d0d916f96416fd57c5ecb9bceb.png?size=4096&ignore=true'}
                                alt="avatar"
                            />
                            <a
                                className='cursor-pointer ml-1 text-blue-500'
                                href={node.author.url}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {node.author.username || 'Unknown'}
                            </a>
                        </div>
                    </div>
                    {/* show update time */}
                    <div className="mt-2">
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            Last Updated: {getTime(updateTime)}
                        </span>
                    </div>
                    {/* Enhanced status with icons */}
                    <ul className="grid grid-cols-2 gap-2 flex-wrap justify-center mt-6 items-center pb-2">
                        <li className="flex items-center">
                            <span className="text-sm font-semibold mr-2"><FontAwesomeIcon icon={faServer as any} className="text-green-500 mr-1" />Identifier:</span>
                            <span className="text-sm">{wordFormat(node.identifier)}</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-sm font-semibold mr-2"><FontAwesomeIcon icon={faMemory as any} className="text-blue-500 mr-1" />Memory:</span>
                            <span className="text-sm">{node.memory}</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-sm font-semibold mr-2"><FontAwesomeIcon icon={faWifi as any} className="text-yellow-500 mr-1" />Connections:</span>
                            <span className="text-sm">{node.connections}</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-sm font-semibold mr-2"><FontAwesomeIcon icon={faMicrochip as any} className="text-red-500 mr-1" />System Load:</span>
                            <span className="text-sm">{node.systemLoad}</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-sm font-semibold mr-2"><FontAwesomeIcon icon={faMicrochip as any} className="text-purple-500 mr-1" />CPU Cores:</span>
                            <span className="text-sm">{node.cpuCores}</span>
                        </li>
                        <li className="flex items-center mt-2">
                            <span className="text-sm font-semibold mr-2"><FontAwesomeIcon icon={faClock as any} className="text-indigo-500 mr-1" />Uptime:</span>
                            <span className="text-sm">{node.uptime}</span>
                        </li>
                        <li className="flex items-center mt-2 mb-2">
                            <span className="w-40 h-0.5 mr-2 dark:bg-white/10 bg-gray-400 rounded-full"></span>
                        </li>
                        <li className="flex items-center mt-2 mb-2">
                            <span className="w-40 h-0.5 mr-2 dark:bg-white/10 bg-gray-400 rounded-full"></span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-sm font-semibold mr-2"><FontAwesomeIcon icon={faTags as any} className="text-green-500 mr-1" />Version:</span>
                            <span className="text-sm">{wordFormat(node.restVersion)}</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-sm font-semibold mr-2"><FontAwesomeIcon icon={faHourglassEnd as any} className="text-blue-500 mr-1" />BuildTime:</span>
                            <span className="text-sm">{timeAgo(node.info.buildTime)}</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-sm font-semibold mr-2"><FontAwesomeIcon icon={faJava as any} className="text-blue-500 mr-1" />Java:</span>
                            <span className="text-sm">{node.info.jvm}</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-sm font-semibold mr-2"><FontAwesomeIcon icon={faVolcano as any} className="text-purple-500 mr-1" />Lavaplayer:</span>
                            <span className="text-sm">{wordFormat(node.info.lavaplayer)}</span>
                        </li>
                        {/* sourceManagers */}
                        <li className="flex items-center">
                            <span className="text-sm font-semibold mr-2"><FontAwesomeIcon icon={faMusic as any} className="text-red-500 mr-1" />Source:</span>
                            <span className="text-sm mr-2">{node.info.sourceManagers.length}</span>
                        </li>
                        {/* plugins: string[]; */}
                        <li className="flex items-center">
                            <span className="text-sm font-semibold mr-2"><FontAwesomeIcon icon={faPlug as any} className="text-yellow-500 mr-1" />Plugins:</span>
                            <span className="text-sm mr-2">{node.info.plugins.length}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

function timeAgo(ms: number) {
    if (typeof ms !== 'number') return 'Unknown';
    const date = new Date(ms);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}


function wordFormat(str: string) {
    if (!str) return 'Unknown';
    if (str.length > 10) {
        return str.slice(0, 10) + '...';
    }
    return str;
}

function getTime(ms: number) {
    if (typeof ms !== 'number') return 'Unknown';
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s ago`;
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s ago`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s ago`;
    if (seconds > 0) return `${seconds}s ago`;
    return 'Unknown';
}

