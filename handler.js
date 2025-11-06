

import "./settings/config.js";
import { qtext, metaai } from "./source/quoted.js";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to load plugins from a directory recursively
export const pluginsLoader = async (directory) => {
  const plugins = [];

  try {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      // If entry is a directory, load all JS files inside
      if (entry.isDirectory()) {
        const subEntries = fs.readdirSync(fullPath, { withFileTypes: true });

        for (const subFile of subEntries) {
          const subPath = path.join(fullPath, subFile.name);
          if (subFile.isFile() && subPath.endsWith(".js")) {
            try {
              const pluginModule = await import(`${subPath}`);
              pluginModule.default.filename = subFile.name;
              plugins.push(pluginModule.default);
            } catch (error) {
              console.log(chalk.red(`Failed to load plugin at ${subPath}:`), error);
            }
          }
        }
      }
      // If entry is a file and ends with .js, load it
      else if (entry.isFile() && fullPath.endsWith(".js")) {
        try {
          const pluginModule = await import(`${fullPath}`);
          pluginModule.default.filename = entry.name;
          plugins.push(pluginModule.default);
        } catch (error) {
          console.log(chalk.red(`Failed to load plugin at ${fullPath}:`), error);
        }
      }
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.log(chalk.red("Failed to read plugin directory:"), error);
    }
  }

  return plugins;
};

// Function to execute the loaded plugins based on command
export const runPlugins = async (m, plug) => {
  const pluginsDisable = false;
  if (pluginsDisable) return false;

  const plugins = await pluginsLoader(path.resolve(__dirname, "./cmd"));

  for (const plugin of plugins) {
    if (plugin.command && plugin.command.find((e) => e === plug.command.toLowerCase())) {
      if (typeof plugin !== "function") continue;

      const isOwner = global.owner.includes(plug.sender.split("@")[0]);
      if (plugin.owner && !isOwner) {
        await m.reply("Sorry, this command is only for the Owner.");
        return true;
      }

      const user = global.db.users[plug.sender];
      const limitCost = plugin.limit || 0;

      // Check if user has enough limit to use the command
      if (!isOwner && user.limit < limitCost) {
        await m.reply(
          `Sorry, your limit is insufficient to use this command.\n` +
          `🪙 Your Limit: ${user.limit}\n` +
          `💰 Required: ${limitCost}`
        );
        return true;
      }

      try {
        plug.user = user;
        await plugin(m, plug);

        // Deduct limit if applicable
        if (limitCost > 0 && !isOwner) {
          user.limit -= limitCost;
          console.log(chalk.yellow(`Deducted ${limitCost} limit from ${plug.pushName}`));

          await new Promise((resolve) => setTimeout(resolve, 5000));

          await conn.sendMessage(
            m.chat,
            {
              text: `🫐 -${limitCost} Limit used.\n✨ Remaining limit: ${user.limit}`,
              contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: "1203634047412@newsletter",
                  serverMessageId: 103,
                  newsletterName: `${global.namebotz}`,
                },
              },
            },
            { quoted: metaai }
          );
        }

        return true;
      } catch (error) {
        console.log(chalk.red("An error occurred while running the plugin:"), error);
        return true;
      }
    }
  }

  return false;
};

// Watch this file for changes and reload automatically
fs.watchFile(__filename, () => {
  fs.unwatchFile(__filename);
  console.log(chalk.cyan(`~> File updated: ${__filename}`));
  import(`${__filename}`);
});