import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
} from 'discord.js';

export interface DiscordCommandOption {
    type: ApplicationCommandOptionType;
    name: string;
    description: string;
    min_value?: number;
    options?: DiscordCommandOption[];
}

export interface DiscordCommand {
    name: string;
    description: string;
    getOptions(): Promise<DiscordCommandOption[]>;
    run(interaction: ChatInputCommandInteraction): Promise<void>;
}
