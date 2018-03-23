const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    console.log('events', req.body.events[0])
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 7NOT+yYEOQQM2QMFxwG+4Jg+RAA0iKiqPFG/BlKXTHUug5+xjcrlg2uDayjzNZe0RrrmIpHct0XiSgZp4o2G8DM8B1I+Ih5gHdPd/tgd519YQc0B5+gnAHiP6D4ZNEJ0LLhMybZl++xkNDBRbLg6yQdB04t89/1O/w1cDnyilFU='
    }
   
    request.get({
        url: 'https://api.line.me/v2/bot/profile/' + req.body.events[0].source.userId,
        headers: headers,
    }, (err, res, body) => {
        reply(reply_token, msg, JSON.parse(body))
    })

    res.sendStatus(200)
})
app.listen(port)

function reply(reply_token, msg, user) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 7NOT+yYEOQQM2QMFxwG+4Jg+RAA0iKiqPFG/BlKXTHUug5+xjcrlg2uDayjzNZe0RrrmIpHct0XiSgZp4o2G8DM8B1I+Ih5gHdPd/tgd519YQc0B5+gnAHiP6D4ZNEJ0LLhMybZl++xkNDBRbLg6yQdB04t89/1O/w1cDnyilFU='
    }
    
    if (msg === 'build core') {
        let body = JSON.stringify({
            replyToken: reply_token,
            messages: [{
                type: 'text',
                text: `เริ่มโปรเซส ${msg.toUpperCase()}`
            }]
        })
        request.post({
            url: 'https://api.line.me/v2/bot/message/reply',
            headers: headers,
            body: body
        }, (err, res, body) => {
            request.post({
                url: 'https://songshake:iL0veFungj%40i123@ci.songshakes.com/job/core/job/build/build?delay=0sec'
            }, (err2, res2, body2) => {
                
                if (err2) {
                    let body = JSON.stringify({
                        replyToken: reply_token,
                        messages: [{
                            type: 'text',
                            text: `โปรเซส ${msg.toUpperCase()} มีปัญหาลองทำรายการใหม่`
                        }]
                    })
                }
                else {
                    let body = JSON.stringify({
                        replyToken: reply_token,
                        messages: [{
                            type: 'text',
                            text: `โปรเซส ${msg.toUpperCase()} สำเร็จจ้า`
                        }]
                    })
                }

                request.post({
                    url: 'https://api.line.me/v2/bot/message/reply',
                    headers: headers,
                    body: body
                }, (err, res, body) => {
                    
                });
            })
        });
        
        
    }
    else {
        let text = `รักนะ ${user.displayName} อึ้บๆ`

        let body = JSON.stringify({
            replyToken: reply_token,
            messages: [{
                type: 'text',
                text: text
            }]
        })
        request.post({
            url: 'https://api.line.me/v2/bot/message/reply',
            headers: headers,
            body: body
        }, (err, res, body) => {
            console.log('status = ' + res.statusCode);
        });
    }
}