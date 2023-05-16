import { Client, TextChannel } from "discord.js";
import { Vulkava , NodeOptions} from "vulkava";
import si from "systeminformation";
import os from "os";
import config from "./config.json";
import moment from "moment";
import pretty from "prettysize";
import "moment-duration-format";
import { fetch } from "undici";


const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildMessageReactions",
        "GuildMessageTyping",
        "GuildVoiceStates",
    ]
})

async function main() {
    await client.login(config.token);

    const channel = config.channelId ? await client.channels.fetch(config.channelId) as TextChannel : null;
    const vulkava = new Vulkava({
        nodes: config.nodes as unknown as NodeOptions[],
        sendWS: (id, payload) => {
            client.guilds.cache.get(id)?.shard.send(payload)
        }
    });
   
    client.on('ready', async () => {
        console.log("Bot is ready!");
        vulkava.start(client.user.id);
        await channel.bulkDelete(100).catch(() => { });

       const msg = await channel.send({ embeds: [{ title: "Bot is ready!\nplease wait for 10 seconds to get the stats", color: 0x2F3136 }] });
        let cl = await si.currentLoad();
        setInterval(async () => {
            let netdata = await si.networkStats();
            let memdata = await si.mem();
            let diskdata = await si.fsSize();
            let osdata = await si.osInfo();
            let cpudata = await si.cpu();
            let uptime = os.uptime();
            const res = await fetch('https://api.waifu.pics/sfw/neko');
            const json = await res.json() as any;

            let hookImage = json.url;
            let embed = {
                title: "Server Stats",
                color: 0x2F3136,
                timestamp: new Date().toISOString(),
                thumbnail: {
                    url: hookImage
                },
                fields: [
                    {
                        name: "**Lavalink**", value: `\`\`\`nim\n${vulkava.nodes.map((node) =>
                            `Node : ${node.connect ? "🟢" : "🔴"} ${node.options.id}
Memory Usage : ${formatBytes(node.stats.memory.allocated)} - ${node.stats.cpu.lavalinkLoad.toFixed(2)}%
Connections : ${node.stats.playingPlayers} / ${node.stats.players}
System Load : ${node.stats.cpu.systemLoad.toFixed(2)}%
Cpu cores : ${node.stats.cpu.cores}
Uptime : ${moment(node.stats.uptime).format(
                                "D[ days], H[ hours], M[ minutes], S[ seconds]"
                            )}`).join('\n\n')}\`\`\``, inline: true
                    },

                    { name: "**CPU**", value: `\`\`\`nim\nCpu: ${cpudata.manufacturer + " " + cpudata.brand}\nLoad: ${cl.currentLoad.toFixed(2)}%\nCores: ${cpudata.cores}\nPlatform: ${osdata.platform}\`\`\``, inline: true },
                    { name: "**RAM**", value: `\`\`\`nim\nAvailable: ${pretty(memdata.total)}\nMemory Used: ${pretty(memdata.active)}\`\`\``, inline: true },
                    { name: "**DISK**", value: `\`\`\`nim\nDisk Used: ${pretty(diskdata[0].size)} / ${pretty(diskdata[0].used)}\`\`\``, inline: true },
                    { name: "**NETWORK**", value: `\`\`\`nim\nPing: ${Math.round(netdata[0].ms)}ms\nUp: ${pretty(netdata[0].tx_sec)}/s\nDown: ${pretty(netdata[0].rx_sec)}/s\n\nTotal Up: ${pretty(netdata[0].tx_bytes)}\nTotal Down: ${pretty(netdata[0].rx_bytes)}\`\`\`` },
                    { name: "**Discord API websocket ping**", value: `\`\`\`nim\n${Math.round(client.ws.ping)}ms\`\`\``, inline: true },
                    { name: "**Uptime**", value: `\`\`\`nim\n${uptimer(uptime)}\`\`\``, inline: true }
                ]
            } as any;
            if (msg) {
               await msg.edit({ embeds: [embed] });
            }
        }, 10000);
    })

}
console.log("Starting...");
main().catch(console.error);

process.on('unhandledRejection', (reason, p) => {
    console.log(reason, p);
});

process.on('uncaughtException', (err, origin) => {
    console.log(err, origin);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(err, origin);
});



function uptimer(seconds: number) {
    seconds = seconds || 0;
    seconds = Number(seconds);
    seconds = Math.abs(seconds);

    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    let parts: any = new Array();

    if (d > 0) {
        var dDisplay = d > 0 ? d + ' ' + (d == 1 ? "day" : "days") : "";
        parts.push(dDisplay);
    }

    if (h > 0) {
        var hDisplay = h > 0 ? h + ' ' + (h == 1 ? "hour" : "hours") : "";
        parts.push(hDisplay)
    }

    if (m > 0) {
        var mDisplay = m > 0 ? m + ' ' + (m == 1 ? "minute" : "minutes") : "";
        parts.push(mDisplay)
    }

    if (s > 0) {
        var sDisplay = s > 0 ? s + ' ' + (s == 1 ? "second" : "seconds") : "";
        parts.push(sDisplay)
    }

    return parts.join(', ', parts);
}
function formatBytes(bytes: number) {
    if (bytes === 0) return "0 B";
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    return `${(
        bytes / Math.pow(1024, Math.floor(Math.log(bytes) / Math.log(1024)))
    ).toFixed(2)} ${sizes[Math.floor(Math.log(bytes) / Math.log(1024))]}`;
}

