# Discord-VTT

Discord bot to help playing TTRPGs without a VTT.

## Set up

1. Create a `.env` file
2. Go to [Discord Developers Portal](https://discord.com/developers/applications) and create a New Application
3. Set it up with permissions to "Send Messages" and "Attach Files"
4. Under OAth2 generate a "Client ID" and "Client Secret"
5. In `.env` file add "Client ID" under `DISCORD_CLIENT_ID`, and "Client Secret" `DISCORD_TOKEN`. e.g.:
    ```dotenv
    DISCORD_CLIENT_ID=xxx
    DISCORD_TOKEN=yyy
    ```
6. Create a `cards` directory
7. Create a subdirectory for each game
8. Under each, create a subdirectory for each card type
9. In each of those, place images (PNG)
10. Invite your bot to your Discord server via `https://discord.com/api/oauth2/authorize?client_id=YOUR_DISCORD_CLIENT_ID_HERE&permissions=34816&scope=bot%20applications.commands` (replacing `YOUR_DISCORD_CLIENT_ID_HERE` of course)
