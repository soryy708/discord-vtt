import fs from 'fs';
import path from 'path';
import {
    ApplicationCommandOptionType,
    AttachmentBuilder,
    ChatInputCommandInteraction,
} from 'discord.js';
import { DiscordCommand, DiscordCommandOption } from './interface';
import { randomInRange } from '../../entropy';
import { getFilesInDirectory, getSubdirectories } from '../../file';

export class DrawCommand implements DiscordCommand {
    public name = 'draw';
    public description = 'Draws a playing card from a deck of some game';

    public async getOptions(): Promise<DiscordCommandOption[]> {
        const cardsPath = path.join(process.cwd(), 'cards');
        // eslint-disable-next-line no-sync
        if (!fs.existsSync(cardsPath)) {
            await fs.promises.mkdir(cardsPath);
            console.warn(
                "Cards directory didn't exist. Created empty one at: " +
                    cardsPath,
            );
        }
        const games = await getSubdirectories(
            path.join(process.cwd(), 'cards'),
        );
        const options = [
            {
                type: ApplicationCommandOptionType.SubcommandGroup,
                name: 'game',
                description: 'What game are we drawing from?',
                options: await Promise.all(
                    games.map(async (game) => {
                        const cards = await this.getCardsOfGame(game);
                        return {
                            type: ApplicationCommandOptionType.Subcommand,
                            name: this.directoryToCommand(game),
                            description: game,
                            options: cards.map((card) => ({
                                type: ApplicationCommandOptionType.Number,
                                name: this.directoryToCommand(card),
                                description: card + ' card(s)',
                                min_value: 1,
                            })),
                        };
                    }),
                ),
            },
        ];
        return options;
    }

    public async run(interaction: ChatInputCommandInteraction): Promise<void> {
        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case 'paranoia':
            case 'executive': {
                await this.runGame(subcommand, interaction);
                break;
            }
        }
    }

    private getCardsOfGame(game: string): Promise<string[]> {
        return getSubdirectories(path.join(process.cwd(), 'cards', game));
    }

    private directoryToCommand(directory: string): string {
        return directory.replace(/ /gu, '-').toLowerCase();
    }

    private async runGame(
        game: string,
        interaction: ChatInputCommandInteraction,
    ): Promise<void> {
        const allCards = await this.getCardsOfGame(game);
        await Promise.all(
            allCards.map(async (card) => {
                const count = interaction.options.getNumber(card);
                if (count <= 0) {
                    return;
                }
                const cards = (
                    await Promise.all(
                        [...Array(count).keys()].map((_) =>
                            this.getCard(game, card),
                        ),
                    )
                ).filter((c) => c !== null);
                await interaction.reply({
                    files: cards.map((c) => new AttachmentBuilder(c)),
                });
            }),
        );
    }

    private async getCard(game: string, type: string): Promise<string> {
        const cardsDirectory = path.join(process.cwd(), 'cards', game, type);
        const cardFiles = await getFilesInDirectory(cardsDirectory);
        const images = cardFiles.filter((file) =>
            this.fileExtensionIsImage(file),
        );
        if (images.length === 0) {
            return null;
        }
        const index = randomInRange(0, images.length);
        const imageName = images[index];
        return path.join(cardsDirectory, imageName);
    }

    private fileExtensionIsImage(fileName: string): boolean {
        return ['.png'].includes(path.extname(fileName).toLowerCase());
    }
}
