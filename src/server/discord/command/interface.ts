import { ChatInputCommandInteraction } from 'discord.js';

export interface DiscordCommand {
    name: string;
    description: string;
    run(interaction: ChatInputCommandInteraction): Promise<void>;
}
