require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Slack Utilities 
const {
    RTMClient
} = require('@slack/rtm-api');

const {
    WebClient
} = require('@slack/web-api');

const token = process.env.SLACK_TOKEN;
const rtm = new RTMClient(token);
const web = new WebClient(token);

// Cloud Services
var listSvc = require('./services/gcloud/list.js');
var utils = require('./services/utils/utils.js');

// Connect to MongoDB
// mongoose
//     .connect(
//         'mongodb://mongo:27017/splink', {
//             useNewUrlParser: true
//         }
//     )
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));

rtm.start()
    .catch(console.error);

rtm.on('channel_joined', (event) => {
    utils.getHelp(rtm, web, event.channel.id);

});

rtm.on('message', (event) => {

    if (event.type !== 'message') {
        return;
    }

    if (event.text.includes("help")) {
        utils.getHelp(rtm, web, event.channel);
    }

});