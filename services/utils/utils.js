var utilsSlack = require('./utilsSlack.js');
var crypto = require('crypto');

module.exports = {
    getHelp: function (rtm, web, slackChannel) {
        const help = `
Hello there! My name is Splink. I can help you manage all of your cloud resources. 

*Information* 
Let's get you up and running as soon as possible. 

1. Create a service account for the cloud platform of your choice.
  • <https://cloud.google.com/compute/docs/access/service-accounts|Google Cloud Platform>
  • <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html#id_users_service_accounts|Amazon Web Services>
  • <https://developers.digitalocean.com/documentation/v2/#authentication|Digital Ocean>
  • <https://cloud.ibm.com/docs/iam?topic=iam-serviceids|IBM Cloud> 
2. Select your cloud provider below and we'll get you setup. 
`;

        const params = [{
            "callback_id": "setup_service_account",
            "text": help,
            "ts": (new Date).getTime() / 1000,
            "actions": [{
                    "name": "gcp-service-account-link",
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

        utilsSlack.slackResponse(rtm, web, slackChannel, params, '')
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