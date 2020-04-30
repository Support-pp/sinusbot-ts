![Publish](https://github.com/Support-pp/sinusbot-ts/workflows/Publish/badge.svg)
# @support-pp/sinusbot-ts

WIP: JavaScript library wrapper to communicate with the SinusBot API (HTTP)

## Installation

```bash
$ npm install @support-pp/sinusbot-ts

# Or, if you prefer yarn
$ yarn add @support-pp/sinusbot-ts
```

## Usage 
The lib is work in progress. But here is a small example.

```javascript
const { SinusBot } = require('@support-pp/sinusbot-ts');

// Host as string to your sinusbot (https://example.de)
const HOST = process.env.Host;
// Port as number to your sinusbot (8087)
const PORT = process.env.PORT;

const bot = new SinusBot(HOST, PORT);

(async () => {
    const botId = await bot.getBotId();
    console.log(`BotID :: ${botId.defaultBotId}`)

    const loginStatus = await bot.login({
        username: "admin",
        password: "foobar",
    })
    if (loginStatus.success){
        console.log(`> SinusBot auth success!`)
    }

})();
```

## Getting Help

If you get stuck, we're here to help.

  * [Issue Tracker](http://github.com/support-pp/sinusbot-ts/issues) for questions, feature requests, bug reports.
  * [Discord](https://discordapp.com/invite/3acZCcu): you can ask for help on our discord server.

