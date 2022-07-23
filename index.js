const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");
const { Manager } = require("erela.js");
const { nodes, token, logs } = require("./config.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,

    ],
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});
client.manager = new Manager({
    nodes: nodes,
    send: (id, payload) => {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
}).on("nodeConnect", node => console.log(`Node "${node.options.identifier}" connected.`));

client.on("ready", async () => {

    const channel = await client.channels.fetch(logs);
    const embed = new EmbedBuilder()
        .setColor("#2F3136")
        .setDescription("Please wait for a minute!\nStatus is being ready!")
    channel.bulkDelete(10);
    channel.send({ embeds: [embed] }).then((msg) => {
        setInterval(() => {
            let all = []
            client.manager.nodes.forEach(node => {
                let info = []
                info.push(`Status: ${node.connected ? "🟢" : "🔴"}`)
                info.push(`Node: ${(node.options.identifier)}`)
                info.push(`Player: ${node.stats.players}`)
                info.push(`Playing Players: ${node.stats.playingPlayers}`)
                info.push(`Uptime: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}`)
                info.push("\nCPU")
                info.push(`Cores: ${node.stats.cpu.cores}`)
                info.push(`System Load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%`)
                info.push(`Lavalink Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`)
                all.push(info.join('\n'))
            });
            const rembed = new EmbedBuilder()
                .setAuthor({ name: 'Lavalink Node', iconURL: client.user.displayAvatarURL() })
                .setURL(`https://discord.gg/ns8CTk9J3e`)
                .setDescription(`\`\`\`${all.join('\n\n----------------------------\n')}\n\n` +
                    `Total Memory  :: ${Math.round(require('os').totalmem() / 1024 / 1024)} mb\n` +
                    `Free Memory   :: ${Math.round(require('os').freemem() / 1024 / 1024)} mb\n` +
                    `RSS           :: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} mb\n` +
                    `Heap Total    :: ${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} mb\n` +
                    `Heap Used     :: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} mb\n` +
                    `External      :: ${Math.round(process.memoryUsage().external / 1024 / 1024)} mb\n` +
                    `Array Buffer  :: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} mb\n` +
                    `CPU Model     :: ${require('os').cpus()[0].model}\n` +
                    `Cores         :: ${require('os').cpus().length}\n` +
                    `Speed         :: ${require('os').cpus()[0].speed}Mhz\n` +
                    `Platform      :: ${process.platform}\n` +
                    `PID           :: ${process.pid}\n` +
                    `\n` + `\`\`\``)
                .setColor("#9966ff")
                .setTimestamp(Date.now());
            msg.edit({ embeds: [rembed] });
        }, 2000);
    })

    client.manager.init(client.user.id);
    console.log(`${client.user.username} online!`);

})
client.login(token);

