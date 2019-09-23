require('dotenv').config();

var utilsSlack = require('./utilsSlack.js');
var crypto = require('crypto');

module.exports = {

    // Delegate Request According to Action
    delegateRequestForAction: function (triggerId, callbackId, actions, responseUrl) {
        console.log(triggerId, callbackId, actions, responseUrl);

        if (callbackId == process.env.GCP_SETUP_SERVICE_ACCOUNT_CALLBACK_ID) {
            if (actions[0].name == process.env.GCP_SETUP_SERVICE_ACCOUNT_ACTION_NAME) {
                utilsSlack.openDialogForGCPServiceAccountSetup(triggerId, responseUrl);
            }
        }
    },

    codifyString: function (text) {
        return "`" + text + "`";
    },

    getHelp: function (rtm, web, slackChannel) {
        const help = `
Every *channel* has a dedicated set of projects that are managed by a service account you provide to us. You can also direct message splink in order to manage your compute resources. 

• \`splink help\` Prints this help message
• \`splink setup\` Authorize a service account for your compute resources
• \`splink setup getkey\` Get splink public key for encrypting service account credentials
• \`splink gcp compute list [regex]\` List all compute resources that match _regex_ 
• \`splink gcp k8s list [regex]\` List all kubernetes clusters that match _regex_
• \`splink gcp compute [hostname|hostname regex|privateip] power [on|off|restart]\` Power on/off/restart a set of compute resources
• \`splink gcp compute zone [name] power [on|off|restart]\` Power cycle all compute resources in zone _name_
`;

        const params = [{
            "callback_id": process.env.GCP_SETUP_SERVICE_ACCOUNT_CALLBACK_ID,
            "text": "",
            "ts": (new Date).getTime() / 1000,
            "color": "good",
            "actions": [{
                    "name": process.env.GCP_SETUP_SERVICE_ACCOUNT_ACTION_NAME,
                    "text": "Google Cloud Platform",
                    "type": "button"
                },
                {
                    "name": "aws-service-account-link",
                    "text": "Amazon Web Services",
                    "type": "button"
                },
                {
                    "name": "digital-ocean-service-account-link",
                    "text": "Digital Ocean",
                    "type": "button"
                },
                {
                    "name": "ibm-cloud-service-account-link",
                    "text": "IBM Cloud",
                    "type": "button"
                }
            ]
        }];

        utilsSlack.slackResponse(rtm, web, slackChannel, null, help)
    },

    isValidSlackRequest: function (req) {

        // Verify Request Origin
        var request_body = req.rawBody;
        var timestamp = req.headers['x-slack-request-timestamp'];
        if (Math.abs(Math.floor(new Date() / 1000) - timestamp) > 60 * 5) {
            // The request timestamp is more than five minutes from local time.
            // It could be a replay attack, so let's ignore it.
            return false;
        };

        var sig_basestring = 'v0:' + timestamp + ':' + request_body;
        var compute_signature = 'v0=' + crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET).update(sig_basestring).digest('hex');
        var req_signature = req.headers['x-slack-signature'];
        return compute_signature == req_signature;
    }
}