[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![Forks][forks-shield]][forks-url]
[![Stars][stars-shield]][stars-url]

<!-- jumbotron with links -->
<div align="center">
  <a href="https://lavalinks-list.vercel.app/">
    <img src="https://raw.githubusercontent.com/appujet/lavalink-list/main/assets/logo.png" alt="logo" width="80" height="80">
  </a>
  <h3 align="center">Lavalink list</h3>
  <p align="center">
    A list of free and available public Lavalink nodes with their live status. Feel free to make a pull request!
    <br />
    <br />
    <a href="https://lavalinks-list.vercel.app/">View Website</a>
    .
    <a href="https://github.com/appujet/lavalink-list/pulls">Make a pull request</a>
    ·
    <a href="https://discord.gg/uRJD4XBPes">Support Server</a>
  </p>
</div>

<!-- website preview using i frames -->
<div style="overflow-x: auto; white-space: nowrap;">
  <img src="https://raw.githubusercontent.com/appujet/lavalink-list/main/assets/non-ssl.png" alt="preview" width="400">
  <img src="https://raw.githubusercontent.com/appujet/lavalink-list/main/assets/ssl.png" alt="preview" width="400">
  <img src="https://raw.githubusercontent.com/appujet/lavalink-list/main/assets/faq.png" alt="preview" width="400">
  <img src="https://raw.githubusercontent.com/appujet/lavalink-list/main/assets/home.png" alt="preview" width="400">
</div>

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

## Contributers

Thanks goes to these wonderful people :

<a href="https://github.com/appujet/lavalink-list/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=appujet/lavalink-list" alt="contributors" width="500" />
</a>

<!-- links -->
[contributors-shield]: https://img.shields.io/github/contributors/appujet/lavalink-list.svg?style=for-the-badge
[issues-shield]: https://img.shields.io/github/issues/appujet/lavalink-list.svg?style=for-the-badge
[forks-shield]: https://img.shields.io/github/forks/appujet/lavalink-list.svg?style=for-the-badge
[stars-shield]: https://img.shields.io/github/stars/appujet/lavalink-list.svg?style=for-the-badge

[contributors-url]: https://github.com/appujet/lavalink-list/graphs/contributors
[issues-url]:  https://github.com/appujet/lavalink-list/issues
[forks-url]:  https://github.com/appujet/lavalink-list/network/members
[stars-url]:  https://github.com/appujet/lavalink-list/stargazers
