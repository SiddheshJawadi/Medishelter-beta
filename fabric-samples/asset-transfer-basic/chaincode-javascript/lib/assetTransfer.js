'use strict';

// Deterministic JSON.stringify()
const stringify = require('json-stringify-deterministic');
const sortKeysRecursive = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {
    async InitLedger(ctx) {
        const reportAssets = [
            {
                email: 'asset1',
                name: 'blue',
                reports: ['5'],
                reportNames: ['Tomoko'],
            },
        ];

        for (const report of reportAssets) {
            report.docType = 'report';
            await ctx.stub.putState(report.email, Buffer.from(stringify(sortKeysRecursive(report))));
        }
    }

    async CreateReport(ctx, email, name, report, reportName) {
    console.log("Entered Create Asset");
    //const exists = await this.ReportExists(ctx, email)
    const reportAsset = {
        name: name,
        reports: [report], // Initialize the arrays with the first file and its name
        reportNames: [reportName],
    };
    await ctx.stub.putState(email, Buffer.from(stringify(sortKeysRecursive(reportAsset))));
    return JSON.stringify(reportAsset);
}


async AddReport(ctx, email, name, report, reportName) {
    console.log("Entered UpdateAsset Function");
    const reportExists = await this.ReportExists(ctx, email);
    if (!reportExists) {
      throw new Error(`The reportAsset ${email} does not exist`);
    }
  
    const ReportAssetString = await this.ReadReportAsset(ctx, email);
    const reportAsset = JSON.parse(ReportAssetString);
  
    // Update the other attributes if needed
    reportAsset.name = name;
  
    // Insert the new file and its name at the beginning of the arrays
    reportAsset.reports.unshift(report);
    reportAsset.reportNames.unshift(reportName);
  
    await ctx.stub.putState(email, Buffer.from(JSON.stringify(reportAsset)));
    return JSON.stringify(reportAsset);
  }

    async FetchReports(ctx, email) {
        const reportAssetJSON = await ctx.stub.getState(email);
        if (!reportAssetJSON || reportAssetJSON.length === 0) {
            throw new Error(`The reportAsset ${email} does not exist`);
        }
    
        const reportAssetString = reportAssetJSON.toString('utf8'); // Convert buffer to a string
        const reportAsset = JSON.parse(reportAssetString); // Parse the JSON string
        
        var data = {
            reportNames: reportAsset.reportNames
        };
        
        return data;
    }

    async DownloadReport(ctx, email,index) {
        const reportAssetJSON = await ctx.stub.getState(email);
        if (!reportAssetJSON || reportAssetJSON.length === 0) {
            throw new Error(`The reportAsset ${email} does not exist`);
        }
        
        const reportAssetString = reportAssetJSON.toString('utf8'); // Convert buffer to a string
        const reportAsset = JSON.parse(reportAssetString); // Parse the JSON string
        
        var data = {
            reportName: reportAsset.reportNames[index],
            report : reportAsset.reports[index]
        }
        
        return data;
    }

    async ReportExists(ctx, email) {
        const reportAssetJSON = await ctx.stub.getState(email);
        return reportAssetJSON && reportAssetJSON.length > 0;
    }

    async ReadReportAsset(ctx, email) {
        const reportAssetJSON = await ctx.stub.getState(email);
        if (!reportAssetJSON || reportAssetJSON.length === 0) {
            throw new Error(`The asset ${email} does not exist`);
        }
    
        return reportAssetJSON.toString();
    }

  


    async DeleteAsset(ctx, email) {
        const exists = await this.ReportExists(ctx, email);
        if (!exists) {
            throw new Error(`The asset ${email} does not exist`);
        }
        return ctx.stub.deleteState(email);
    }


    async TransferAsset(ctx, email, newOwner) {
        const assetString = await this.ReadReportAsset(ctx, email);
        const asset = JSON.parse(assetString);
        const oldOwner = asset.Owner;
        asset.Owner = newOwner;
        await ctx.stub.putState(email, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldOwner;
    }

    async GetAllAssets(ctx) {
        const allResults = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}

module.exports = AssetTransfer;