const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const port = 3000;

const SlackBot = require('slackbots');
const axios = require('axios');

require('dotenv').config();

const bot = new SlackBot({
    token: process.env.token,
    name: "CBot"
});

const help = `Usage:\n
\`cbot power <on|off|reboot> <vm-name>\` - power help
\`cbot help\` - Get Usage Help
`

// Start Handler
bot.on('start', () => {

    const params = {
        icon_emoji: ':cbot:',
        attachments: [
            {
                "fallback": "CBot Help",
                "color": "#2eb886",
                "text": help,
                "ts": (new Date).getTime() / 1000
            }
        ]
    };

    bot.postMessageToChannel(
        'chatops', 
        '',
        params
    );

});

// Error Handler 
bot.on('error', (err) => console.log(err));

app.listen(port, () => console.log('Server running...'));