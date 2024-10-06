export type ApiNode = {
    isConnected: boolean;
    identifier: string;
    memory: string;
    cpu: string;
    connections: string;
    systemLoad: string;
    cpuCores: number;
    uptime: string;
    restVersion: string;
    info: {
        version: {
            major: number;
            minor: number;
            patch: number;
            semver: string;
            preRelease: string | null;
        }
        buildTime: number;
        git: {
            branch: string;
            commit: string;
            commitTime: number;
        };
        jvm: string;
        lavaplayer: string;
        sourceManagers: string[];
        filters: string[];
        plugins: {
            name: string;
            version: string;
        }[];
    };
    host: string;
    port: number;
    password: string;
    secure: boolean | null;
    createdAt: Date;
    updatedAt: Date;
    author: {
        username: string;
        url: string;
        avatar: string;
    }
};

// declare module for node environment
