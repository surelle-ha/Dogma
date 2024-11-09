import { Command } from "commander";
import chalk from "chalk";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { loadConfig } from "./config.js";

export const searchCommand = new Command("crawl")
    .description("Search for .env files on GitHub with specified keywords.")
    .option(
        "-k, --keyword <string>",
        "Keyword to search in .env files",
        "API_KEY"
    )
    .option("--not-empty", "Search for non-empty key values", false)
    .option("--empty", "Search for empty key values (default)", true)
    .option("-v, --verbose", "Enable verbose output", true)
    .option("--log <file>", "Save results to a log file")
    .action(async (options) => {
        const { keyword, notEmpty, verbose, log } = options;
        const config = loadConfig();
        const GITHUB_TOKEN = config.token;

        if (!GITHUB_TOKEN) {
            console.error(
                chalk.red(
                    "GitHub token not found. Please set it using the config command."
                )
            );
            return;
        }

        try {
            console.log(
                chalk.green(
                    `Starting GitHub search for .env files containing: "${keyword}"`
                )
            );

            const query = notEmpty
                ? `${keyword}= in:file filename:.env`
                : `${keyword}= in:file filename:.env NOT *`;
            if (verbose) console.log(chalk.gray(`Search query: ${query}`));

            const response = await axios.get(
                "https://api.github.com/search/code",
                {
                    headers: {
                        Authorization: `token ${GITHUB_TOKEN}`,
                        Accept: "application/vnd.github.v3+json",
                    },
                    params: {
                        q: query,
                        per_page: 10,
                        page: 1,
                    },
                }
            );

            if (response.status !== 200) {
                throw new Error(
                    `GitHub API request failed with status ${response.status}`
                );
            }

            const searchResults: { items: any[] } = response.data;
            if (!searchResults || searchResults.items.length === 0) {
                console.log(chalk.yellow("No matching .env files found."));
                return;
            }

            const results = searchResults.items.map((item, index) => {
                const result = {
                    id: uuidv4(),
                    repository: item.repository.full_name,
                    path: item.path,
                    url: item.html_url,
                };
                if (verbose) {
                    console.log(chalk.blue(`Result ${index + 1}:`));
                    console.log(chalk.cyan(`Repository: ${result.repository}`));
                    console.log(chalk.magenta(`File Path: ${result.path}`));
                    console.log(chalk.green(`File URL: ${result.url}\n`));
                }
                return result;
            });

            if (log) {
                fs.writeFileSync(
                    log,
                    JSON.stringify(results, null, 2),
                    "utf-8"
                );
                console.log(chalk.green(`Results saved to log file: ${log}`));
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(chalk.red(`Unexpected Error: ${error.message}`));
            } else {
                console.error(chalk.red("An unknown error occurred."));
            }
        }
    });
