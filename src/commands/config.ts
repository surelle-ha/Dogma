import { Command } from "commander";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import os from "os";

const CONFIG_PATH = path.join(os.homedir(), ".github_crawler_config.json");

export function loadConfig() {
    if (fs.existsSync(CONFIG_PATH)) {
        const configData = fs.readFileSync(CONFIG_PATH, "utf-8");
        return JSON.parse(configData);
    }
    return {};
}

export function saveConfig(config: Record<string, string>) {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
}

export const configCommand = new Command("config")
    .description("Configure GitHub token for API requests.")
    .option("-t, --token <token>", "GitHub Personal Access Token")
    .action((options) => {
        const { token } = options;
        if (token) {
            saveConfig({ token });
            console.log(chalk.green("GitHub token saved successfully."));
        } else {
            console.error(chalk.red("Please provide a valid GitHub token."));
        }
    });
