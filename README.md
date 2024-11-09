<div id="badges" align="center">
    <div align="center">
        <img src="https://raw.githubusercontent.com/gist/vininjr/d29bb07bdadb41e4b0923bc8fa748b1a/raw/88f20c9d749d756be63f22b09f3c4ac570bc5101/programming.gif" width="200"/><br><br>
    </div>
</div>

# DOGMA

This is a personal CLI tool that enables interaction with the GitHub API for the purpose of searching `.env` files with specified keywords. You can configure a GitHub token and use the crawler to search for keys in `.env` files across public repositories.

<div align="center">

</div>

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Commands](#commands)
  - [Config Command](#config-command)
  - [Crawl Command](#crawl-command)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Configure GitHub Token**: Set your GitHub Personal Access Token to make authorized API requests.
- **Search `.env` Files**: Search for `.env` files on GitHub using a keyword and optionally filter for empty or non-empty key values.
- **Quiet Output**: Optionally disable detailed output to see every step of the search.
- **Save Results to Log**: Save search results to a log file for future reference.

## Getting Started

Follow these instructions to get the tool up and running on your local machine:

### Prerequisites

- Node.js installed on your machine.
- A GitHub Personal Access Token (PAT) for making API requests.

### Installing Dependencies

1. Clone the repository:
   ```bash
   git clone https://github.com/surelle-ha/dogma.git
   cd dogma
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

### Set Up GitHub Token

Before using the crawler, you need to configure your GitHub token:

```bash
dogma config -t <your-github-token>
```

This will save your GitHub token in the configuration file located at `~/.github_crawler_config.json`.

## Commands

### Config Command

The `config` command allows you to configure the GitHub Personal Access Token for use in API requests.

```bash
dogma config -t <your-github-token>
```

- `-t, --token <token>`: Set your GitHub token.

**Example**:
```bash
dogma config -t ghp_1234567890abcdefg
```

This command will save your GitHub token in the configuration file and allow you to use the crawler command.

### Crawl Command

The `crawl` command searches for `.env` files on GitHub repositories containing a specified keyword.

```bash
dogma crawl -k <keyword> --not-empty --quiet --log <log-file>
```

- `-k, --keyword <string>`: The keyword to search in `.env` files (default: `API_KEY`).
- `--not-empty`: Only search for keys with non-empty values.
- `--empty`: Search for keys with empty values (default behavior).
- `-q, --quiet`: Disable detailed output for the search.
- `--log <file>`: Save the search results to a log file.

**Example**:
```bash
dogma crawl -k "API_KEY" --not-empty --quiet --log search_results.json
```

This will search for `.env` files containing the `API_KEY` keyword, filter for non-empty values, and save the results to `search_results.json`.

## Contributing

We welcome contributions to improve this project!

### How to Contribute

1. **Fork the Repository:** Fork the repository to your GitHub account.
2. **Clone the Repository:** Clone your fork to your local machine.
3. **Create a Feature Branch:** Create a new branch for your feature or bug fix.
4. **Commit Your Changes:** Make changes and commit them with a descriptive message.
5. **Push Changes:** Push your changes to your forked repository.
6. **Create a Pull Request:** Submit a pull request to the original repository with a detailed description of your changes.

### Code of Conduct

We expect all contributors to follow our Code of Conduct. Please ensure that you contribute in a respectful and inclusive manner.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<a href="https://github.com/surelle-ha/dogma-Boilerplate/graphs/contributors">
<img src="https://contrib.rocks/image?repo=surelle-ha/dogma-Boilerplate" />
</a>

#

<img width="200px" src="https://i.ibb.co/F72MdpH/surellebanner1512.png" alt="surellebanner1512" border="0"/>
