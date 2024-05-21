import chalk from "chalk";

/**
 * Logger class to log messages with different colors
 */
class Logger {
  log = (message: string) => {
    return `[${new Date().toISOString()}] -> ${message}`;
  };

  info = (message: string) => {
    console.log(chalk.blue(this.log(message)));
  };

  error = (message: string) => {
    console.error(chalk.red(this.log(message)));
  };

  warn = (message: string) => {
    console.warn(chalk.yellow(this.log(message)));
  };

  success = (message: string) => {
    console.log(chalk.green(this.log(message)));
  };

  debug = (message: string) => {
    console.debug(chalk.gray(this.log(message)));
  };
}

export default new Logger();
