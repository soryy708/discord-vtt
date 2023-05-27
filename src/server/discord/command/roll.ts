import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
} from 'discord.js';
import { DiscordCommand, DiscordCommandOption } from './interface';
import { randomInRange } from '../../entropy';

export class RollCommand implements DiscordCommand {
    public name = 'roll';
    public description = 'Rolls custom-sided dice';

    public getOptions(): Promise<DiscordCommandOption[]> {
        return Promise.resolve([
            {
                type: ApplicationCommandOptionType.Number,
                name: 'count',
                description: 'How many dice we roll?',
                min_value: 1,
            },
            {
                type: ApplicationCommandOptionType.Number,
                name: 'sides',
                description: 'How many sides to each dice?',
                min_value: 1,
            },
            {
                type: ApplicationCommandOptionType.Boolean,
                name: 'paranoia',
                description:
                    'If this is about Paranoia, auto-count successes/fails and add computer dice.',
            },
        ]);
    }

    public async run(interaction: ChatInputCommandInteraction): Promise<void> {
        const count = interaction.options.getNumber('count') || 1;
        const sides = interaction.options.getNumber('sides') || 2;
        const paranoia = interaction.options.getBoolean('paranoia') || false;
        const results = [...Array(count).keys()].map(() =>
            randomInRange(1, paranoia ? 6 + 1 : sides + 1),
        );
        if (paranoia) {
            const computerDice = randomInRange(1, 6 + 1);
            const successes = results.filter((d) => d >= 5);
            const failures = results.filter((d) => d < 5);
            await interaction.reply(
                `${interaction.user.username}: \`${count}D6\` = \`[${results
                    .sort((a, b) => b - a)
                    .join(', ')}]\`\n\`${successes.length}\` success${
                    successes.length !== 1 ? 'es' : ''
                } (\`${failures.length}\` failure${
                    failures.length !== 1 ? 's' : ''
                })\nComputer: \`${computerDice}\` ${
                    computerDice === 6 ? '😈' : '😅'
                }`,
            );
        } else {
            const sum = results.reduce((su, cur) => su + cur, 0);
            await interaction.reply(
                `${
                    interaction.user.username
                }: \`${count}D${sides}\` = \`[${results
                    .sort((a, b) => b - a)
                    .join(', ')}]\` sum \`${sum}\``,
            );
        }
    }
}
