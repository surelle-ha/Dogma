import { Command } from "commander";
import figlet from "figlet";
import chalk from "chalk";
import wrapAnsi from "wrap-ansi";

import { searchCommand } from "./commands/crawl.js";
import { configCommand } from "./commands/config.js";

const program = new Command();

program
    .name("dogma")
    .description(
        chalk.green(wrapAnsi("Dogma is a CLI crawler for Github Secrets.", 65))
    )
    .version("1.0.0");

program.addCommand(configCommand);
program.addCommand(searchCommand);

const isDefaultCommand = process.argv.length === 2;

if (isDefaultCommand) {
    figlet(
        "DOGMA",
        {
            font: "cybermedium",
            width: 80,
        },
        (err, data) => {
            if (err) {
                console.log(chalk.red("Something went wrong..."));
                console.dir(err);
                return;
            }
            console.log(chalk.green(data));
            console.log(chalk.red(`\t  DEVELOPED BY SURELLE`));
            program.parse(process.argv);
        }
    );
} else {
    program.parse(process.argv);
}
