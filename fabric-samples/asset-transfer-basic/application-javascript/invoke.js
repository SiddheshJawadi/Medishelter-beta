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

async function main(report) {
    console.log(report, "is invoke data");
    try {
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
        const wallet = await buildWallet(Wallets, walletPath);


        //await enrollAdmin(caClient, wallet, mspOrg1);
        //await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');


        const gateway = new Gateway();

        try {
            await gateway.connect(ccp, {
                wallet,
                identity: org1UserId,
                discovery: { enabled: true, asLocalhost: true }
            });

            const network = await gateway.getNetwork(channelName);
            const contract = network.getContract(chaincodeName);

            console.log('\n--> Evaluate Transaction: AssetExists, function returns "true" if an asset with given assetID exists');
            let check = await contract.evaluateTransaction('AssetExists', report.email);
            console.log(`*** Result: ${prettyJSONString(check.toString())}`);

            if(check == "true"){
                console.log('\n--> Submit Transaction: UpdateAsset, update asset with ID email, and update name and/or add new file and fileName');
                console.log(report.email);
                let result = await contract.submitTransaction('UpdateAsset', report.email, report.patientName, report.file, report.fileName);
                console.log('*** Result: committed');
                if (`${result}` !== '') {
                    console.log(`*** Result: ${prettyJSONString(result.toString())}`);
                    return "Successfully updated the asset on the ledger";
                }
            }
            else if(check == "false"){
                console.log('\n--> Submit Transaction: CreateAsset, creates new asset with ID email, name, file and filename arguments');
                let result = await contract.submitTransaction('CreateAsset', report.email, report.patientName, report.file,report.fileName);
                console.log('*** Result: committed');
                if (`${result}` !== '') {
                    console.log(`*** Result: ${prettyJSONString(result.toString())}`);
                    return "Successfully committed the change to the ledger by the peer";
                }
            }

    
            // console.log('\n--> Submit Transaction: CreateAsset, creates new asset with ID email, name, file and filename arguments');
            // let result = await contract.submitTransaction('CreateAsset', report.email, report.patientName, report.file,report.fileName);
            // console.log('*** Result: committed');
            // if (`${result}` !== '') {
            //     console.log(`*** Result: ${prettyJSONString(result.toString())}`);
            //     return "Successfully committed the change to the ledger by the peer";
            // }

            // console.log('\n--> Submit Transaction: UpdateAsset, update asset with ID email, and update name and/or add new file and fileName');
            // console.log(report.email);
            // let result = await contract.submitTransaction('UpdateAsset', report.email, report.patientName, report.file, report.fileName);
            // console.log('*** Result: committed');
            // if (`${result}` !== '') {
            //     console.log(`*** Result: ${prettyJSONString(result.toString())}`);
            //     return "Successfully updated the asset on the ledger";
            // }

            
            
            
            // console.log('\n--> Evaluate Transaction: ReadAsset, function returns an asset with a given assetID');
            // let result = await contract.evaluateTransaction('ReadAsset', data);
            // console.log('*** Result: ID searching');


            // console.log('\n--> Evaluate Transaction: ReadAsset, function returns "asset1" attributes');
            // result = await contract.evaluateTransaction('ReadAsset', data);
            // console.log(`*** Result: ${prettyJSONString(result.toString())}`);
            // return result;
            
        } finally {
            gateway.disconnect();
        }
    } catch (error) {
        console.error(`******** FAILED to run the application: ${error}`);
        process.exit(1);
    }
}

module.exports = main;
