import { ChatInputCommandInteraction } from 'discord.js';
import { DiscordCommand } from './interface';

export class PingCommand implements DiscordCommand {
    public name = 'ping';
    public description = 'Replies with Pong!';

    public async run(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.reply('Pong!');
    }
}
