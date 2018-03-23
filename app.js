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
    console.log('events', req.body.events[0].source.userId)
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 7NOT+yYEOQQM2QMFxwG+4Jg+RAA0iKiqPFG/BlKXTHUug5+xjcrlg2uDayjzNZe0RrrmIpHct0XiSgZp4o2G8DM8B1I+Ih5gHdPd/tgd519YQc0B5+gnAHiP6D4ZNEJ0LLhMybZl++xkNDBRbLg6yQdB04t89/1O/w1cDnyilFU='
    }
    request.get({
        url: 'https://api.line.me/v2/bot/profile/' + req.body.events[0].source.userId,
        headers: headers,

    }, (err, res, body) => {
        reply(reply_token, msg, body)
    })

    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token, user) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 7NOT+yYEOQQM2QMFxwG+4Jg+RAA0iKiqPFG/BlKXTHUug5+xjcrlg2uDayjzNZe0RrrmIpHct0XiSgZp4o2G8DM8B1I+Ih5gHdPd/tgd519YQc0B5+gnAHiP6D4ZNEJ0LLhMybZl++xkNDBRbLg6yQdB04t89/1O/w1cDnyilFU='
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: `ควยไร ${user.displayName}`
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