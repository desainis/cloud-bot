
module.exports = {
    listVMs: function (secrets, projectId, iconEmoji, slackChannel, bot,) {
        const Compute = require('@google-cloud/compute');
        const compute = new Compute({
            projectId: projectId,
            keyFilename: secrets
        });

        compute.getVMs().then(function(data) {
            var vms = data[0];
            console.log(vms);
            var arrayLength = vms.length;
            var res = '';
            for (var i = 0; i < arrayLength; i++) {
                res = res.concat("• `", vms[i].name, "`\n");
                //Do something
            }

            const params = {
                icon_emoji: iconEmoji
            }

            var response = 'List of VM(s) for Project `' + projectId + '`:\n' + res;

            bot.postMessageToChannel(
                slackChannel, 
                response,
                params
            );
        });
    }
}