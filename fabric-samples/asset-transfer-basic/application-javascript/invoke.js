'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'basic';

const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'javascriptAppUser';

function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
}

async function checkAndEnrollUserAndAdmin(caClient, wallet, mspId, userId, adminId) {
    // Check if the admin is already enrolled
    const adminExists = await wallet.get(adminId);
    if (!adminExists) {
        console.log(`Enrolling admin ${adminId}...`);
        await enrollAdmin(caClient, wallet, mspId);
        console.log(`Admin ${adminId} enrolled successfully.`);
    } else {
        console.log(`Admin ${adminId} is already enrolled.`);
    }

    // Check if the user is already enrolled
    const userExists = await wallet.get(userId);
    if (!userExists) {
        console.log(`Enrolling user ${userId}...`);
        await registerAndEnrollUser(caClient, wallet, mspId, userId, 'org1.department1');
        console.log(`User ${userId} enrolled successfully.`);
    } else {
        console.log(`User ${userId} is already enrolled.`);
    }
}

async function connectToGateway() {
    const ccp = buildCCPOrg1();
    const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
    const wallet = await buildWallet(Wallets, walletPath);

    await checkAndEnrollUserAndAdmin(caClient, wallet, mspOrg1, org1UserId, 'admin');

    const gateway = new Gateway();

    try {
        await gateway.connect(ccp, {
            wallet,
            identity: org1UserId,
            discovery: { enabled: true, asLocalhost: true }
        });

        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        return { gateway, contract };
    } catch (error) {
        console.error(`Failed to connect to the gateway: ${error}`);
        throw error;
    }
}

async function disconnectFromGateway(gateway) {
    try {
        await gateway.disconnect();
    } catch (error) {
        console.error(`Failed to disconnect from the gateway: ${error}`);
        throw error;
    }
}

async function addReports(report){
    console.log(report, " - is invoke data and you are in addReports");
    let gateway;
    try {
        // Connect to the gateway and get the contract
        const { gateway: connectedGateway, contract } = await connectToGateway();
        gateway = connectedGateway;

        // Checking for whether the asset exists or not.
        console.log('\n--> Evaluate Transaction: AssetExists, function returns "true" if an asset with the given assetID exists');
        let check = await contract.evaluateTransaction('AssetExists', report.email);
        console.log(`*** Result: ${prettyJSONString(check.toString())}`);

        //code
        if (check == "true") {
            console.log('\n--> Submit Transaction: UpdateAsset, update asset with ID email, and update name and/or add new file and fileName');
            console.log(report.email);
            let result = await contract.submitTransaction('AddReport', report.email, report.patientName, report.file, report.fileName);
            console.log('*** Result: committed');
            if (`${result}` !== '') {
                console.log(`*** Result: ${prettyJSONString(result.toString())}`);
                return "Successfully updated the asset on the ledger";
            }
        } else if (check == "false") {
            console.log('\n--> Submit Transaction: CreateAsset, creates new asset with ID email, name, file, and filename arguments');
            let result = await contract.submitTransaction('CreateReport', report.email, report.patientName, report.file, report.fileName);
            console.log('*** Result: committed');
            if (`${result}` !== '') {
                console.log(`*** Result: ${prettyJSONString(result.toString())}`);
                return "Successfully committed the change to the ledger by the peer";
            }
        }
        //code end

    } catch (error) {
        console.error(`******** FAILED to run the application: ${error}`);
        process.exit(1);
    } finally {
        // Disconnect from the gateway when done
        if (gateway) {
            await disconnectFromGateway(gateway);
        }
    }
}

async function displayReports(report){
      console.log(report, " - is invoke data and you are in displayReports");
    let gateway;
    try {
        // Connect to the gateway and get the contract
        const { gateway: connectedGateway, contract } = await connectToGateway();
        gateway = connectedGateway;

        // Checking for whether the asset exists or not.
        console.log('\n--> Evaluate Transaction: AssetExists, function returns "true" if an asset with the given assetID exists');
        let check = await contract.evaluateTransaction('AssetExists', report.email);
        console.log(`*** Result: ${prettyJSONString(check.toString())}`);

        //Start.
        if (check == "true") {
            console.log('\n--> Evaluate Transaction: ReadAsset, function returns an asset with a given assetID');
            let result = await contract.evaluateTransaction('FetchReports', report.email);
            console.log('*** Result: ID searching');
            let r = result.toJSON();
            console.log("Invoke Result:- ", r);
            return r;
        } else {
            return "No Reports Available";
        }
        // End

    } catch (error) {
        console.error(`******** FAILED to run the application: ${error}`);
        process.exit(1);
    } finally {
        // Disconnect from the gateway when done
        if (gateway) {
            await disconnectFromGateway(gateway);
        }
    }  
}

async function downloadReport(report){
    console.log(report, " - is invoke data and you are in downloadReports");
    let gateway;
    try {
        // Connect to the gateway and get the contract
        const { gateway: connectedGateway, contract } = await connectToGateway();
        gateway = connectedGateway;

        // Checking for whether the asset exists or not.
        console.log('\n--> Evaluate Transaction: AssetExists, function returns "true" if an asset with the given assetID exists');
        let check = await contract.evaluateTransaction('AssetExists', report.email);
        console.log(`*** Result: ${prettyJSONString(check.toString())}`);

        //start.
        if (check == "true") {
            console.log('\n--> Evaluate Transaction: ReadAsset, function returns an asset with a given assetID');
            let result = await contract.evaluateTransaction('DownloadReport', report.email, report.index);
            console.log('*** Result: ID searching');
            let r = result.toJSON();
            return r;
        } else {
            return "No Reports Available";
        }
        //end.

    } catch (error) {
        console.error(`******** FAILED to run the application: ${error}`);
        process.exit(1);
    } finally {
        // Disconnect from the gateway when done
        if (gateway) {
            await disconnectFromGateway(gateway);
        }
    }
}

module.exports = {addReports,downloadReport, displayReports};