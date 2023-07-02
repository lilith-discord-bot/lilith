# Lilith Discord Bot <img src="https://s3.glazk0.dev/lilith/lilith_logo_data/LilithSticker.png" height="40" width="40" alt="Lilith's logo" />

A [Discord.js](https://discord.js.org/#/) bot for Diablo 4 that allows tracking events, news and more.

[![Discord](https://img.shields.io/discord/1116374937389764698.svg?logo=discord)](https://discord.gg/Mv2yCrJK87)

## Contributing

If you want to contribute to this project, please mind joining the [Discord server](https://discord.gg/Mv2yCrJK87) first.

## Installation

We recommend using our hosted version of [Lilith](https://lilith.mom/invite), but if you want to host it yourself, follow the instructions below.

### Requirements

- [Node.js](https://nodejs.org/en/) (v14.17.0 or higher)
- [npm](https://www.npmjs.com/) (v7.16.0 or higher)
- [Docker](https://www.docker.com/)

### Setup

1. Clone the repository

```bash
git clone https://github.com/lilith-discord-bot/lilith.git
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with the `.env.template` and refer to the [Environment variables](#environment-variables) section for more information:

```bash
cp .env.template .env
```

5. Start the bot

```bash
npm run bot:up
```

### Other commands:

- `npm run bot:stop` - Stop the bot
- `npm run bot:restart` - Restart the bot
- `npm run bot:rebuild` - Rebuild the bot

---

If you're running docker, you can just use this, but you still have to run Redis and a database, if you don't wanna bother with that, `npm run bot:up` sets everything up for you using compose.

```bash
docker run --name bot \
    -e TOKEN=your_token \
    -e POSTGRES_DATABASE=your_database \
    -e POSTGRES_HOST=your_host \
    -e POSTGRES_PASSWORD=your_password \
    -e POSTGRES_USER=your_user \
    -e POSTGRES_PORT=your_port \
    -e DATABASE_URL=your_database_url \
    -e REDIS_HOST=your_redis_host \
    -e REDIS_PASSWORD=your_redis_password \
    -d ghcr.io/lilith-discord-bot/lilith:main
```

#### Environment variables

| Environment Variable | Description                                                       | Example                                                                    | Default |
| -------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------- | ------- |
| TOKEN                | Your Discord application bot token                                | `MODcxMTY4MgwMFA1MTExNzkzY0.YGm7oQ.AXHbbfpSxi_Cpk1B1Vz_DGV0A0i62NS_XPBCpf` | N\A     |
| POSTGRES_DATABASE    | Postgres database name                                            | `lilith`                                                                   | N\A     |
| POSTGRES_HOST        | Hostname for conneting to Postgres (empty if running with Docker) | `lilith`                                                                   | N\A     |
| POSTGRES_PASSWORD    | Postgres database connection password                             | `lilith`                                                                   | N\A     |
| POSTGRES_USER        | Postgres database connection user                                 | `lilith`                                                                   | N\A     |
| POSTGRES_PORT        | Postgres database connection port                                 | 5432                                                                       | 5432    |
| DATABASE_URL         | Prisma database connection URL                                    | `postgresql://user:password@host:5432/database`                            | N\A     |
| REDIS_HOST           | Hostname for conneting to Redis (empty if running with Docker)    | `lilith`                                                                   | N\A     |
| REDIS_PASSWORD       | Redis database connection password                                | `lilith`                                                                   | N\A     |

## Issues

If you find a bug or have a feature request, please [open an issue](https://github.com/lilith-discord-bot/lilith/issues/new/choose) on GitHub.

## License

This project is licensed under the [MIT License](LICENSE).
