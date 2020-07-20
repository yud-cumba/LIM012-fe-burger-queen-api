const kill = require('tree-kill');
require('@databases/mysql-test/jest/globalTeardown');

module.exports = () => new Promise((resolve) => {
  if (!global.__e2e.childProcessPid) {
    return resolve();
  }

  kill(global.__e2e.childProcessPid, 'SIGKILL', resolve);
  global.__e2e.childProcessPid = null;
});
