# Lilith Discord Bot

A [Discord.js](https://discord.js.org/#/) bot for Diablo 4 that allows tracking events, news and more.

## Contributing

If you want to contribute to this project, please mind joining the [Discord server](https://discord.gg/Mv2yCrJK87) first.

## Installation

We recommend using our hosted version of [Lilith](https://discord.com/api/oauth2/authorize?client_id=1116120688814723142&permissions=17876191054848&scope=bot%20applications.commands), but if you want to host it yourself, follow the instructions below.

### Requirements

- [Node.js](https://nodejs.org/en/) (v14.17.0 or higher)
- [npm](https://www.npmjs.com/) (v7.16.0 or higher)
- [Docker](https://www.docker.com/)

### Setup

> **Don't forget about the `.env` file !**

1. Clone the repository

```bash
git clone https://github.com/glazk0/lilith.git
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following:

```env
TOKEN=your_token_here

#Database
POSTGRES_HOST=postgres_database_host # Doesn't need to be set if running with Docker.
POSTGRES_USER=postgres_database_user
POSTGRES_PASSWORD=postgres_database_password
POSTGRES_DATABASE=postgres_database
DATABASE_URL="postgresql://user:password@host:5432/database"

#Cache
REDIS_HOST=redis_host # Doesn't need to be set if running with Docker.
REDIS_PORT=0000 # Doesn't need to be set if running with Docker.
REDIS_PASSWORD=redis_password
```

5. Start the bot

```bash
npm run bot:up
```

If you're running docker, you can just use
```bash
docker run --name bot -e REDIS_HOST=redis -e REDIS_PASSWORD=password -e DATABASE_URL=something://user:password@host:port/database ghcr.io/lilith-discord-bot/lilith:latest
```
> you still have to run Redis and a database, if you don't wanna bother with that, `npm run bot:up` sets everything up for you using compose


### Other commands:

- `npm run bot:stop` - Stop the bot
- `npm run bot:restart` - Restart the bot
- `npm run bot:rebuild` - Rebuild the bot

## Issues

If you find a bug or have a feature request, please [open an issue](https://github.com/glazk0/lilith/issues/new/choose) on GitHub.

## License

This project is licensed under the [MIT License](LICENSE).
