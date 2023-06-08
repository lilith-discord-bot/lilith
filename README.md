# Lilith Discord Bot

A [Discord.js](https://discord.js.org/#/) bot for Diablo 4 that allows tracking events, news and more.

## Contributing

If you want to contribute to this project, please mind joining the [Discord server](https://discord.gg/Mv2yCrJK87) first.

## Installation

### Requirements

- [Node.js](https://nodejs.org/en/) (v14.17.0 or higher)
- [npm](https://www.npmjs.com/) (v7.16.0 or higher)

### Setup

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
WORKER_URL=your_worker_url_here (optional)
```

4. Build the bot

```bash
npm run build
```

5. Start the bot

```bash
npm run start
```

## Roadmap

- [ ] Handle interactions (commands)
- [ ] Create a database (redis or mongodb or both ?)
- [ ] Add the worker to fetch data 
- [ ] Create Scheduled event Discord system


## License

This project is licensed under the [MIT License](LICENSE).
