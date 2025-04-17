const {Client, AttachmentBuilder, QuoteBuilder, MessageFormatting, MessageFormattingRule, UserMention, IUserResolvable, User} = require('..');

const client = new Client({
    account: "+33950984521",
    logEvents: true
});

client.on('message', (message) => {
    if (message.content.startsWith("&")) {
        message.channel.send(message.content, {
            markdown: true
        });
    }
});