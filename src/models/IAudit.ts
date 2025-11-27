export interface IAudit {
    os: {
        name: string;
        version: string;
    }
    packages: string[][]
}