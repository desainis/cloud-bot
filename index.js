require('dotenv').config();

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

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

const {
    createMessageAdapter
} = require('@slack/interactive-messages');
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);
const port = process.env.PORT || 3000;

// Cloud Services
var gcpCompute = require('./gcloud/compute/compute.js');

// Utils Services
var utils = require('./lib/utils.js');
var utilsSlack = require('./lib/utilsSlack.js');

// Connect to MongoDB
mongoose
    .connect(
        'mongodb://mongo:27017/app', {
            useNewUrlParser: true
        }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

rtm.start()
    .catch(console.error);

rtm.on('channel_joined', (event) => {
    utils.getHelp(rtm, web, event.channel.id);

});

rtm.on('message', (event) => {

    //console.log(event);

    if (event.type !== 'message') {
        return;
    }

    if (event.text.includes("splink help")) {
        utils.getHelp(rtm, web, event.channel);
    }

    if (event.text.startsWith("splink vm create")) {
        utilsSlack.openDialogForCreateVM();
        //gcpCreate.createVirtualMachine(process.env.GCP_SECRETS, 'eloquent-walker-177701', 'test');
    }

    if (event.text.startsWith("splink vm list")) {
        gcpCompute.listVMs().then(function (response) {
            utilsSlack.slackResponse(rtm, web, event.channel, response, 'Summary of Available Resources on Google Cloud Platform');
        });

    }
});

var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
};

app.use(bodyParser.json({
    verify: rawBodySaver
}));

app.use(bodyParser.urlencoded({
    verify: rawBodySaver,
    extended: true
}));

app.use(bodyParser.raw({
    verify: rawBodySaver,
    type: function () {
        return true
    }
}));

// Interactive Messages
app.post('/slack/actions', urlencodedParser, (req, res) => {

    res.status(200).end() // best practice to respond with 200 status

    if (utils.isValidSlackRequest(req)) {
        var actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string

        utils.delegateRequestForAction(actionJSONPayload.trigger_id, actionJSONPayload.callback_id, actionJSONPayload.actions, actionJSONPayload.response_url);

        // var message = {
        //     "text": actionJSONPayload.user.name + " clicked: " + actionJSONPayload.actions[0].name,
        //     "replace_original": false
        // };

        // utilsSlack.sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);
    }

});

app.listen(port, () => console.log("Server running..."));