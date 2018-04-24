# PM2-NodeJS 自动部署

## 1. 生成配置文件
- pm2 ecosystem
- 此命令会生成一个js配置文件 可以修改为json格式如下
```
{
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  "apps" : [

    // First application
    {
      "name"      : "my-test",
      "script"    : "./bin/www",
      "env": {
        "COMMON_VARIABLE": "true"
      },
      "env_production" : {
        "NODE_ENV": "dev"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  "deploy" : {
    "production" : {
      "user" : "root",
      "host" : "192.168.64.185",
      "ref"  : "origin/master",
      "repo" : "git@github.com:dingchaolin/ecosystem-test.git",
      "path" : "/data/test",
      "pre-setup" : "yum install git",//contos
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env production"
    },
    "dev" : {
      "user" : "root",
      "host" : "192.168.64.185",
      "ref"  : "origin/master",
      "repo" : "git@github.com:dingchaolin/ecosystem-test.git",
      "path" : "/data/test",
      "pre-setup" : "yum install git",
      "post-deploy" : "npm install ; pm2 startOrRestart ecosystem.json --env dev",
      "env"  : {
        "NODE_ENV": "dev"
      }
    }
  }
}

```

## 2. 修改配置文件

### 2.1 配置信息含义
```
 production : {
      user : "登录远程服务器的用户名，此处填写我们创建的root",
      host : "远程服务器的IP或hostname，此处可以是数组同步部署多个服务器，不过鉴于我们只有一个服务器，因此我们填写192.168.64.185",
      ref  : "远端名称及分支名，此处填写origin/master",
      repo : "git仓库地址，此处填写git@github.com:dingchaolin/ecosystem-test.git",
      path : "远程服务器部署目录，需要填写user具备写入权限的目录，此处填写/data/test",
      "post-deploy" : "部署后需要执行的命令，此处填写npm install && pm2 startOrRestart ecosystem.json --env production"
    },
```
- repo 如果使用 git@github.com:dingchaolin/ecosystem-test.git 需要先在服务器生成一个pub key 添加到github上
### 3. 部署
- git@github.com:dingchaolin/ecosystem-test.git



