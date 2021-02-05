const scpClient = require('scp2')
const ora = require('ora')
const chalk = require('chalk')
const config = require('./uploadconfig')
const word = ora("正在发布到"+config.domain+"\n")
word.start()
console.log(chalk.green(config.domain))
scpClient.scp(
    './devdist',
    {
        host:config.domain,
        username:config.username,
        password:config.password,
        path:config.path,
    },
    (err)=>{
        word.stop()
        if(err){
            console.log(chalk.red('发布失败.\n'+err));
        }else{
            console.log(chalk.green('Success! 成功发布'))
        }
    },
)
