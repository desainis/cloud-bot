module.exports = {
    createVirtualMachine: function (secrets, projectId, vmName) {
        // [START gce_create_vm]
        const Compute = require('@google-cloud/compute');
        const compute = new Compute({
            projectId: projectId,
            keyFilename: secrets
        });
        const zone = compute.zone('us-central1-c');

        async function createVM() {
            // TODO(developer): provide a name for your VM
            // const vmName = 'new-virutal-machine';
            const [vm, operation] = await zone.createVM(vmName, {
                os: 'ubuntu'
            });
            console.log(vm);
            await operation.promise();
            console.log('Virtual machine created!');
        }
        createVM();
        // [END gce_create_vm]
    }
}