import { readFileSync, accessSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const _initFile = (__pathFile, __jsonFile) => writeFileSync(__pathFile, JSON.stringify(__jsonFile, null, 2));
const _readJson = (__pathFile) => JSON.parse(readFileSync(__pathFile));
let rootdb = dirname(fileURLToPath(import.meta.url));

const path = {
  user: join(rootdb, "users.json"),
  grup: join(rootdb, "groups.json"),
  set: join(rootdb, "sets.json"),
  cmd: join(rootdb, "cmd.json")
};

try {
  accessSync(path.user);
} catch (e) {
  _initFile(path.user, []);
}
try {
  accessSync(path.grup);
} catch (e) {
  _initFile(path.grup, []);
}
try {
  accessSync(path.set);
} catch (e) {
  _initFile(path.set, []);
}
try {
  accessSync(path.cmd);
} catch (e) {
  _initFile(path.cmd, {});
}

var db = {
  user: _readJson(path.user),
  grup: _readJson(path.grup),
  set: _readJson(path.set),
  cmd: _readJson(path.cmd)
};

async function initDatabase() {
  setInterval(async () => {
    _initFile(path.user, db.user);
    _initFile(path.grup, db.grup);
    _initFile(path.set, db.set);
    _initFile(path.cmd, db.cmd);
  }, 990);
}

export default initDatabase;
export { db };
