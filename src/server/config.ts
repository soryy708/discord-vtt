import { config as loadDotenv } from 'dotenv';

const configSchema = ['DISCORD_TOKEN', 'DISCORD_CLIENT_ID'] as const;

type ConfigKey = (typeof configSchema)[number];

export function loadConfig(): void {
    loadDotenv();
}

export function validateConfig(): void {
    let errored = false;
    configSchema.forEach((key) => {
        if (!process.env[key]) {
            console.error('Missing environment variable: ' + key);
            errored = true;
        }
    });
    if (errored) {
        process.exit(1);
    }
}

export function getConfig(key: ConfigKey): string {
    return process.env[key];
}
