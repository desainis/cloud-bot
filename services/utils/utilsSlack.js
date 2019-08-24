require('dotenv').config();

module.exports = {

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
    }

}