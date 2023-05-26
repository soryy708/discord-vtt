import { Client, REST, Routes } from 'discord.js';
import { getConfig } from '../config';
import commands from './command';

export async function bootstrapDiscord(): Promise<void> {
    const restApi = new REST({ version: '10' }).setToken(
        getConfig('DISCORD_TOKEN'),
    );
    await restApi.put(
        Routes.applicationCommands(getConfig('DISCORD_CLIENT_ID')),
        {
            body: commands.map((command) => {
                return {
                    name: command.name,
                    description: command.description,
                };
            }),
        },
    );

    const client = new Client({
        intents: [],
    });

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) {
            return;
        }

        await Promise.all(
            commands.map(async (command) => {
                if (interaction.commandName === command.name) {
                    await command.run(interaction);
                }
            }),
        );
    });

    client.login(getConfig('DISCORD_TOKEN'));
}
