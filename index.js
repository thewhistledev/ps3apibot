const { Client, GatewayIntentBits, Collection } = require("discord.js");
const preventCrash = require("./src/lib/handler");
const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.Guilds,
    ]
});

preventCrash; // Prevents the app from hanging when an error occurs. (Usually node just crashes and you have to restart the app, this prevents that and continues the script.)

client.config = require("./src/data/config.js");
client.utils = {
    CCAPINotify: require("./src/functions/CCAPI"),
    console: require("./src/utils/console.json"),
    successEmbed: require("./src/functions/successEmbed"),
    errorEmbed: require("./src/functions/errorEmbed"),
    logger: require("./src/utils/logger.js"),
};
client.commands = new Collection();

client.pkg = {
    fetch: require("cross-fetch"), // using cross-fetch instead of node-fetch because node-fetch lacks support for commonjs implementations in later versions.
}

setTimeout(() => {
    require("./src/handlers/commands")(client);
    require("./src/handlers/events")(client);
}, 1000);

client.login(client.config.token).catch((e) => {
    client.utils.logger(e, "error");
});
