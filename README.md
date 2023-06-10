# Lilith Discord Bot

A [Discord.js](https://discord.js.org/#/) bot for Diablo 4 that allows tracking events, news and more.

## Contributing

If you want to contribute to this project, please mind joining the [Discord server](https://discord.gg/Mv2yCrJK87) first.

## Installation

### Requirements

- [Node.js](https://nodejs.org/en/) (v14.17.0 or higher)
- [npm](https://www.npmjs.com/) (v7.16.0 or higher)

### Setup

> If running using Docker, use `docker-compose -p "lilith" --env-file .env -f .docker/docker-compose.yml up --build -d` (**don't forget about the `.env` file!!**)

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

#API
ARMORY_URL=api_url
ARMORY_API_URL=api_url

#Database
POSTGRES_HOST=postgres_database_host # Doesn't need to be set if running with Docker.
POSTGRES_USER=postgres_database_user
POSTGRES_PASSWORD=postgres_database_password
POSTGRES_DATABASE=postgres_database

#Cache
REDIS_HOST=redis_host # Doesn't need to be set if running with Docker.
REDIS_PASSWORD=redis_password
```

5. Start the bot

```bash
npm run bot:up
```

Other commands:

- `npm run bot:down` - Stop the bot
- `npm run bot:restart` - Restart the bot
- `npm run bot:rebuild` - Rebuild the bot

## Roadmap

- [x] Handle interactions (commands)
- [x] Create a database (redis or mongodb or both ?)
- [x] Add the worker to fetch data
- [ ] Create Scheduled event Discord system

## License

This project is licensed under the [MIT License](LICENSE).
