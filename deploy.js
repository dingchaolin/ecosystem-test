"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
let shell = require("shelljs");
class Cmd {
    static exec(command) {
        let msg = child_process.execSync(command);
        return msg.toString().trim();
    }
}
class NodeDeploy extends Cmd {
    static updateCode() {
        this.exec("git pull origin master");
        let success = this.exec("git pull origin master");
        if (success.endsWith("Already up-to-date.")) {
            return "success";
        }
        return success;
    }
    static deploy() {
        let password = "artron.net";
        var child = shell.exec("pm2 deploy ecosystem.json dev setup ", { async: true });
        child.stdin.write(password + '\n');
        child.stdin.end();
    }
    static updateDeploy() {
        let success = this.exec("pm2 deploy ecosystem.json dev update");
        console.log(success);
    }
}
NodeDeploy.deploy();
