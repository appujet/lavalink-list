
[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![Forks][forks-shield]][forks-url]
[![Stars][stars-shield]][stars-url]

<!-- jumbotron with links -->
<div align="center">
  <a href="https://lavalink.moebot.pro/">
    <img src="https://media.discordapp.net/attachments/876035356460462090/887728792926290091/20210820_124325.png" alt="logo" width="80" height="80">
  </a>
  <h3 align="center">Lavalink list</h3>
  <p align="center">
    A list of free and available public Lavalink nodes with their live status. Feel free to make a pull request!
    <br />
    <br />
    <a href="https://lavalink.moebot.pro/">View Demo</a>
    .
    <a href="https://github.com/brblacky/lavalink-list/pulls">Make a pull request</a>
    ·
    <a href="https://github.com/brblacky/lavalink-list/issues">Report Bug/Request Feature</a>
    ·
    <a href="https://discord.gg/q45tURe2Pq">Support Server</a>
  </p>
</div>

<!-- previews images -->
## Previews
![preview](https://cdn.discordapp.com/attachments/942120006219624469/1158375903114575872/image.png)
![preview](https://cdn.discordapp.com/attachments/942120006219624469/1158375903399772210/image.png)

<!-- how to add my node -->
## How to add my node?

1. Fork this repository
2. Edit the `nodes.json` file and add your node
3. Create a pull request
<!-- nodes.json example -->
## `nodes.json` example

```json
{
 [
    {
        "identifier": "my-node",
        "host": "lava1.example.com",
        "port": 2333,
        "password": "example.com",
        "secure": false,
        "restVersion": "v3",
        "authorId": "959276033683628122"
    }
  ]
}
```

- `identifier` - The identifier of your node (example: my-node)
- `host` - The host of your node (example: lava1.example.com)
- `port` - The port of your node (default: 2333)
- `password` - The password of your node (if you have one)
- `secure` - If your node is using SSL (true or false)
- `restVersion` - The version of your node (lavalink rest api version) (v3 or v4)
- `authorId` - Your User Discord ID (To get your avatar, name and tag foe display in the list)

## Contributores

Thanks goes to these wonderful people :

<a href="https://github.com/brblacky/lavalink-list/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=brblacky/lavalink-list" />
</a>

<!-- links -->
[contributors-shield]: https://img.shields.io/github/contributors/brblacky/lavalink-list.svg?style=for-the-badge
[issues-shield]: https://img.shields.io/github/issues/brblacky/lavalink-list.svg?style=for-the-badge
[forks-shield]: https://img.shields.io/github/forks/brblacky/lavalink-list.svg?style=for-the-badge
[stars-shield]: https://img.shields.io/github/stars/brblacky/lavalink-list.svg?style=for-the-badge

[contributors-url]: https://github.com/brblacky/lavalink-list/graphs/contributors
[issues-url]:  https://github.com/brblacky/lavalink-list/issues
[forks-url]:  https://github.com/brblacky/lavalink-list/network/members
[stars-url]:  https://github.com/brblacky/lavalink-list/stargazers
