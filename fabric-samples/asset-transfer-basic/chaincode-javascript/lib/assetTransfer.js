'use strict';

// Deterministic JSON.stringify()
const stringify = require('json-stringify-deterministic');
const sortKeysRecursive = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {
    async InitLedger(ctx) {
        const assets = [
            {
                email: 'asset1',
                name: 'blue',
                files: ['5'],
                fileNames: ['Tomoko'],
            },
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            await ctx.stub.putState(asset.email, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
    }

    async CreateReport(ctx, email, name, file, fileName) {
    console.log("Entered Create Asset");
    const exists = await this.AssetExists(ctx, email)
    const asset = {
        name: name,
        files: [file], // Initialize the arrays with the first file and its name
        fileNames: [fileName],
    };
    await ctx.stub.putState(email, Buffer.from(stringify(sortKeysRecursive(asset))));
    return JSON.stringify(asset);
}


async AddReport(ctx, email, name, file, fileName) {
    console.log("Entered UpdateAsset Function");
    const exists = await this.AssetExists(ctx, email);
    if (!exists) {
      throw new Error(`The asset ${email} does not exist`);
    }
  
    const assetString = await this.ReadAsset(ctx, email);
    const asset = JSON.parse(assetString);
  
    // Update the other attributes if needed
    asset.name = name;
  
    // Insert the new file and its name at the beginning of the arrays
    asset.files.unshift(file);
    asset.fileNames.unshift(fileName);
  
    await ctx.stub.putState(email, Buffer.from(JSON.stringify(asset)));
    return JSON.stringify(asset);
  }
  


    async DeleteAsset(ctx, email) {
        const exists = await this.AssetExists(ctx, email);
        if (!exists) {
            throw new Error(`The asset ${email} does not exist`);
        }
        return ctx.stub.deleteState(email);
    }

    async AssetExists(ctx, email) {
        const assetJSON = await ctx.stub.getState(email);
        return assetJSON && assetJSON.length > 0;
    }

    async ReadAsset(ctx, email) {
        const assetJSON = await ctx.stub.getState(email);
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${email} does not exist`);
        }
    
        return assetJSON.toString();
    }

    async FetchReports(ctx, email) {
        const assetJSON = await ctx.stub.getState(email);
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${email} does not exist`);
        }
    
        const assetString = assetJSON.toString('utf8'); // Convert buffer to a string
        const asset = JSON.parse(assetString); // Parse the JSON string
        
        var data = {
            fileNames: asset.fileNames
        };
        
        return data;
    }

    async DownloadReport(ctx, email,index) {
        const assetJSON = await ctx.stub.getState(email);
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${email} does not exist`);
        }
        
        const assetString = assetJSON.toString('utf8'); // Convert buffer to a string
        const asset = JSON.parse(assetString); // Parse the JSON string
        
        var data = {
            filename: asset.fileNames[index],
            file : asset.files[index]
        }
        
        return data;
    }

    async TransferAsset(ctx, email, newOwner) {
        const assetString = await this.ReadAsset(ctx, email);
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