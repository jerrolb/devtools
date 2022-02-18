import { watch } from './watch/index.js';
import { Command } from 'commander';

const program = new Command();

program
  .option('-w, --watch', 'watch directory to refresh chrome tab')
  .option('--p, --path <type>', 'path to watch')
  .option('--t, --tab <type>', 'tab name to refresh');

program.parse(process.argv);

const options = program.opts();

if (options.watch && options.path && options.tab) {
  watch(options.path, options.tab);
} else {
  console.info(`Example usage: node index.js -w --tab='myTab' --path=/path/to/folder`);
}
