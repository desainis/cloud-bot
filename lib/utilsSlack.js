require('dotenv').config();

var request = require('request')

module.exports = {

    // Dialogs for Interactive Messages

    openDialogForGCPServiceAccountSetup: function (triggerId, responseURL) {

        JSONmessage = {
            trigger_id: triggerId,
            dialog: {
              callback_id: process.env.GCP_SERVICE_ACCOUNT_DIALOG_SUBMISSION_CALLBACK_ID,
              title: "Service Account Setup",
              submit_label: "Submit",
              notify_on_cancel: false,
              state: "Submit",
              elements: [
                {
                    "label": "Google Cloud Platform Secrets (JSON)",
                    "name": "secrets",
                    "type": "textarea",
                    "hint": "Learn more about GCP Service Accounts https://cloud.google.com/compute/docs/access/service-accounts",
                    "placeholder": `{
"type": "service_account",
"project_id": "project_id",
"private_key_id": "uuid",
"private_key": "secrete-private-key",
"client_id": "id",
...
}`
                }
              ]
            }
          }

          var postOptions = {
            uri: 'https://slack.com/api/dialog.open',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + process.env.SLACK_TOKEN
            },
            json: JSONmessage
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
        (async () => {
            // See: https://api.slack.com/methods/chat.postMessage

            const res = await web.chat.postMessage({
                channel: slackChannel,
                text: text,
                attachments: params
            });

            // `res` contains information about the posted message
            console.log('Message sent');
        })();
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