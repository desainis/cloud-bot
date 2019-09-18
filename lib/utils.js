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
Hello there! My name is Splink. I can help you manage all of your cloud resources. 

*Setup* 
Let's get you up and running as soon as possible. 

1. Create a service account for the cloud platform of your choice.
  • <https://cloud.google.com/compute/docs/access/service-accounts|Google Cloud Platform>
  • <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html#id_users_service_accounts|Amazon Web Services>
  • <https://developers.digitalocean.com/documentation/v2/#authentication|Digital Ocean>
  • <https://cloud.ibm.com/docs/iam?topic=iam-serviceids|IBM Cloud> 
2. Use our PGP key below to send us your encrypted credentials.
\`\`\`
-----BEGIN PGP PUBLIC KEY BLOCK-----

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
FkaHV9aIFYKdouhNwNobiUcQdig/KAOPYQ==
=oaoH
-----END PGP PUBLIC KEY BLOCK-----
\`\`\`


*Mac / Linux Users*: 

  • Copy our public key above to a file. We decided to name our public key \`public_key\`
  • Import our public key by:
      \`gpg --import public_key\`
  • Encrypt your credentials as json (\`secrets.json\`) by: 
      \`gpg --armor --recipient splink-setup@splink.com --encrypt secrets.json\`
  • Click the respective cloud platform below and input the *encrypted message* and click submit.
`;

        const params = [{
            "callback_id": process.env.GCP_SETUP_SERVICE_ACCOUNT_CALLBACK_ID,
            "text": help,
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