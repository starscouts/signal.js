# Signal.js

Signal.js is a [Node.js](https://nodejs.org) library that allows you to easily interact with the [Signal Messenger](https://signal.org).

It is:
* object-oriented
* event-driven
* statically typed and compatible with TypeScript
* it aims to cover 100% of Signal's features (in a future version)

## Installation
Node.js 16.9.0 or newer is required.

If you want to install the latest stable version:
```plaintext
npm install --save @equestria.dev/signal.js
```

If you want to install the latest development version:
```plaintext
npm install --save @equestria.dev/signal.js@dev
```

> **Warning:** Development versions are unstable and may change at any time without warning.

[signal-cli](https://github.com/AsamK/signal-cli) will be installed automatically. However, if you use Windows or macOS, you will also need the Java Runtime Environment (JRE) version 17 or later, accessible with the command `java`. You can download an open-source version of Java [here](https://adoptium.net/).

Then, you can register on Signal:
* [If you want to link signal-cli to an installation of Signal on your phone (that means using the same phone number)](https://github.com/AsamK/signal-cli/wiki/Linking-other-devices-(Provisioning))
* [If you want to use signal-cli as a primary device (that means you won't be able to use this phone number with Signal on your phone)](https://github.com/AsamK/signal-cli/wiki/Quickstart#set-up-an-account)

## Example usage
After Signal.js is installed, we can create a simple example bot with this code:

```javascript
const { Client } = require('@equestria.dev/signal.js');

const client = new Client({
    account: "your phone number here"
});

client.on('message', async (message) => {
    if (message.content === "!ping") {
        await message.reply("Pong!");
    }
});
```

Additional information is available on the [documentation](https://signaljs.equestria.dev).

## Links
* [Website and documentation](https://signaljs.equestria.dev)
* [Source code (Gitea)](https://git.equestria.dev/equestria.dev/signal.js)
* [npm](https://npmjs.com/package/@equestria.dev/signal.js)
* [Report a bug](https://bugs.equestria.dev/issues/SGJS), or [email us](mailto:hello@equestria.dev)

## Develop responsibly
Signal is run by a non-profit and moderating it is almost impossible due to the encrypted nature of the application. The Signal.js developers do not encourage using Signal.js for abusive purposes.

Please abide to the [Signal Terms of Service](https://signal.org/legal/#terms-of-service) while using this library, the developers claim absolutely no responsibility in the event your Signal account gets terminated due to abuse.