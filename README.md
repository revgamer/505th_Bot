# 505th_Bot (Cortana)

A custom Discord bot for the 505th Expeditionary Force Discord server. Cortana automates key community functions including embeds, role selection, weekly updates, moderation, and activity logging.

## Features

- 📌 **Rules Embed**  
  Posts a clean embed in `#rules`. Users are expected to read and comply — no reaction or role is given here.

- 📚 **Handbook Embed**  
  Posts a reference embed linking to the 505th Library, including general guides and radio handbook.

- 🎭 **Role Selection Embed**  
  Offers 4 optional roles via emoji reactions:
  - Game Night
  - Movie Night
  - Mod Update
  - Event Notifications

- 🛰️ **505th Info Embed**  
  Shares core server information including:
  - TeamSpeak IP
  - Unit structure
  - Operation times
  - Key links

- 🧹 **Moderation Commands**  
  Supports custom slash commands for managing the server.

- 🕵️‍♂️ **Bot Logging**  
  Monitors and logs:
  - Message deletions
  - Message edits
  - Member joins and leaves

- 📅 **Weekly Updates**  
  Posts automated deployment summaries every Sunday at midnight UTC.

- 👀 **Status Monitoring**  
  Bot presence is set to: `Watching the 505th Deployment`.

## Slash Commands

| Command       | Description                                 | Permission    |
|---------------|---------------------------------------------|---------------|
| `/purge`      | Bulk deletes messages (1–100)               | Admin only    |
| `/say`        | Makes the bot say a custom message          | Admin only    |
| `/announce`   | Sends an announcement embed to a channel    | Admin only    |
| `/ping`       | Checks if the bot is online and responsive  | Everyone      |

## Setup

### Requirements

- Node.js v18+
- Discord.js v14
- A Discord Bot Token
- `config.json` file with your bot token

### Installation

```bash
git clone https://github.com/revgamer/505th_Bot.git
cd 505th_Bot
npm install

