require('dotenv').config();

var request = require('request')

module.exports = {

    // Dialogs for Interactive Messages

    openDialogForGCPServiceAccountSetup: function (triggerId, responseURL, jsonPayload) {

        var postOptions = {
            uri: 'https://slack.com/api/dialog.open',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + process.env.SLACK_TOKEN
            },
            json: jsonPayload
        };

        request(postOptions, (error, response, body) => {
            //console.log(error);
            console.log(response.body);
        });
    },

    openDialogForCreateVM: function () {

    },

    openDialog: function () {

    },

    // Slack Responses
    slackResponse: function (rtm, web, slackChannel, params, text) {
        // See: https://api.slack.com/methods/chat.postMessage

        web.chat.postMessage({
            channel: slackChannel,
            text: text,
            attachments: params
        }).then(function (data) {
            console.log('Message sent');
        });

    },

    sendMessageToSlackResponseURL: function (responseURL, JSONmessage) {
        var postOptions = {
            uri: responseURL,
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            json: JSONmessage
        };

        request(postOptions, (error, response, body) => {
            console.log(error);
        });
    }

}