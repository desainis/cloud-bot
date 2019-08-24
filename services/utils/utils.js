var utilsSlack = require('./utilsSlack.js');

module.exports = {
    getHelp: function (rtm, web, slackChannel) {
        const help = `
Hello there! My name is Splink. I can help you manage all of your cloud resources. 

*Information* 
Let's get you up and running as soon as possible. 

1. Create a service account for the cloud platform of your choice. (Not sure how? We got you covered below.)
2. Run \`splink setup\` to setup authorization for splink
3. Enjoy!
`;

        const params = [{
            "text": help,
            "ts": (new Date).getTime() / 1000,
            "actions": [
                {
                    "name": "gcp-service-account-link",
                    "text": "Google Cloud Platform",
                    "type": "button",
                    "url": "https://cloud.google.com/compute/docs/access/service-accounts"
                },
                {
                    "name": "aws-service-account-link",
                    "text": "Amazon Web Services",
                    "type": "button",
                    "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html#id_users_service_accounts",
                },
                {
                    "name": "digital-ocean-service-account-link",
                    "text": "Digital Ocean",
                    "type": "button",
                    "url": "https://developers.digitalocean.com/documentation/v2/#authentication"
                },
                {
                    "name": "ibm-cloud-service-account-link",
                    "text": "IBM Cloud",
                    "type": "button",
                    "url": "https://cloud.ibm.com/docs/iam?topic=iam-serviceids"
                }
            ]
        }];

        utilsSlack.slackResponse(rtm, web, slackChannel, params, '')
    }
}