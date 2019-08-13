const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const SlackBot = require('slackbots');
const axios = require('axios');

var listSvc = require('./services/gcloud/list.js');

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/chat-bot',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

require('dotenv').config();

const bot = new SlackBot({
    token: process.env.token,
    name: process.env.botName
});

const help = `
\`cbot vmlist <params>\` - power help
\`cbot power <on|off|reboot> <vm-name>\` - power help
\`cbot help\` - Get Usage Help
`

// Start Handler
bot.on('start', () => {

    const params = {
        icon_emoji: process.env.iconEmoji,
        attachments: [
            {
                "fallback": "Cloud Bot Help",
                "color": "#2eb886",
                "text": help,
                "ts": (new Date).getTime() / 1000
            }
        ]
    };

    bot.postMessageToChannel(
        process.env.channel, 
        'Usage:',
        params
    );

});

// Error Handler 
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', (data) => {

  if (data.type !== 'message') {
      return;
  }

  if (data.text === "cbot help") {
      getHelp(data.text);
  }

  if (data.text === "cbot vmlist") {
    listSvc.listVMs(process.env.gcloudKeyFile, process.env.projectId, process.env.iconEmoji, process.env.channel, bot);
  }

});

// Respond to data
function getHelp(message) {
  const params = {
      icon_emoji: process.env.iconEmoji,
      attachments: [
          {
              "color": "#2eb886",
              "text": help,
              "ts": (new Date).getTime() / 1000
          }
      ]
  };

  bot.postMessageToChannel(
      process.env.channel, 
      'Usage:',
      params
  );
}