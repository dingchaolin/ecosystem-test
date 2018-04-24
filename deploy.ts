/**
 * Created by chaolinding on 2018/4/24.
 */

/*
自动化部署流程
1. git pull origin master 拉取一下最新的代码
2. 首次部署
    pm2 deploy ecosystem.json dev setup
    pm2 deploy ecosystem.json dev
3. 非首次部署
pm2 deploy production update
 */
 import * as child_process from "child_process"
let shell = require("shelljs")


class Cmd {
     static exec( command: string ):string{
         let msg = child_process.execSync(command)
         return msg.toString().trim()
     }
}

class NodeDeploy extends Cmd{

     static updateCode():string{
         this.exec("git pull origin master")
         let success = this.exec("git pull origin master")
         if( success.endsWith("Already up-to-date.")){
             return "success"
         }
         return success
     }

     static deploy(){
         let password = "artron.net"
         var child = shell.exec("pm2 deploy ecosystem.json dev setup ",{async:true});
         child.stdin.write(password+'\n'); //这里输入密码
         child.stdin.end();
         // let success = this.exec("pm2 deploy ecosystem.json dev setup")
         // console.log( success )
         //
         // success = this.exec("pm2 deploy ecosystem.json dev")
         // console.log( success )
     }

     static updateDeploy(){
         let success = this.exec("pm2 deploy ecosystem.json dev update")
         console.log(success)
     }

}

NodeDeploy.deploy()
