import chokidar from 'chokidar';
import { exec } from 'child_process';
import { CMD } from '../constants.js';
import { executeWithCb } from '../utils.js';

function generateTabRegex(tabNameToRefresh) {
  const tabIdRegex = `\\[(?:\\d+\\:+)*(\\d+)\\]`;
  return new RegExp(`${tabIdRegex} ${tabNameToRefresh}`, 'g');
}

function createWatcher(pathToWatch) {
  return chokidar.watch(pathToWatch, { persistent: true });
}

function watch(pathToWatch, tabNameToRefresh) {
  const waitBeforeReload = 300;
  const watcher = createWatcher(pathToWatch);
  const tabRegex = generateTabRegex(tabNameToRefresh);
  let match = null;
  let tabId = -1;

  console.info(`Chrome tab with name ${tabNameToRefresh} will refresh on changes to ${pathToWatch}`);

  watcher.on('change', function() {
    setTimeout(function() {
      executeWithCb(CMD.CHROME_CLI.LIST_TABS, function(tabs) {
        while (match = tabRegex.exec(tabs)) {
          tabId = match[1];
          exec(`${CMD.CHROME_CLI.RELOAD_TAB} ${tabId}`);
        }
      })
    }, waitBeforeReload)}
  )
};

export { watch };
