const fetch = require('node-fetch');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const channels = [
  ['1497104837643604079', `# 🌹 Rose Club SA-MP Community
—————————————-
📦 sharing-sharing sa-mp kebutuhan server like mappings, scripting & textdraws. pasaran? oh tentu tidak.
——————————————
🧰 rose clubs juga menyediakan products, seperti jasa sa-mp, discord.js (bot) dan lain-lain.
————————————————-

[© 2022 Rose Club](https://cdn.discordapp.com/...gif)

[Discord Links](https://discord.gg/tfYT6BC832)`, 15],

  ['1497104837643604079', `# 🌹 Rose Club SA-MP Community
—————————————-
📦 sharing-sharing sa-mp kebutuhan server like mappings, scripting & textdraws. pasaran? oh tentu tidak.
——————————————
🧰 rose clubs juga menyediakan products, seperti jasa sa-mp, discord.js (bot) dan lain-lain.
————————————————-

[© 2022 Rose Club](https://cdn.discordapp.com/...gif)

[Discord Links](https://discord.gg/tfYT6BC832)`, 15]
];

const DISCORD_TOKEN = "putyourdiscordtoken"

async function sendMessage(channel, content) {
  try {
    const res = await fetch(`https://discord.com/api/v9/channels/${channel}/messages`, {
      method: 'POST',
      headers: {
        'authorization': DISCORD_TOKEN,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        content,
        tts: false
      })
    });

    if (res.status === 429) {
      const data = await res.json();
      console.log(`Rate limited. Retry after ${data.retry_after}s`);
      await delay(data.retry_after * 1000);
      return false;
    }

    if (res.status === 200) {
      console.log(`🟢 Message Sended ${channel}`);
      return true;
    } else {
      console.log(`🔴 Failed Message Sended (${res.status})`);
      return false;
    }

  } catch (err) {
    console.log("Error:", err.message);
    return false;
  }
}

async function start(channel, content, wait) {
  while (true) {
    const success = await sendMessage(channel, content);

    if (success) {
      await delay(wait * 1000);
    } else {
      await delay(10000);
    }
  }
}

async function main() {
  for (let i = 0; i < channels.length; i++) {
    const [channel, content, wait] = channels[i];

    start(channel, content, wait);
  }
}

main();