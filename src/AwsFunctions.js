import * as AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-east-2',
    secretAccessKey: '0a4iEyeBBZdI8VhntH+2mfSZ0IDJlH1w2r2asueQ',
    accessKeyId: 'AKIATO7GRWGCSLFKOLAA'
});
const docClient = new AWS.DynamoDB.DocumentClient()

export const fetchData = async (tableName) => {
    var params = {
        TableName: tableName
    }

    let scanResults = [];
    let items;
    let i =0;
    do {
        items = await docClient.scan(params).promise();
        items.Items.forEach((item) => item.key = i++);
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
        
    } while (typeof items.LastEvaluatedKey !== "undefined");
    console.log(scanResults);
    return scanResults;
}

export const putData = async (tableName, data) => {
    var params = {
        TableName: tableName,
        Item: data
    }

    docClient.put(params, function (err, data) {
        if (err) {
            console.log('Error', err)
        } else {
            console.log('Success', data)
        }
    }).promise();
}

export const deleteItem = async (tableName, data) => {
    var params = {
        TableName: tableName,
        Key: {"Username": data.Username}
    }

    try {
        await docClient.delete(params).promise();
        console.log("Success - item deleted");
    } catch (err) {
        console.log("Error", err);
    }
};

export const getData = async (tableName, inputData) =>{
    var params = {
        TableName: tableName,
        Key: { "Username": inputData.Username}
    };
    let result = false;
    await docClient.get(params, function (err, data) {
        if (err) {
            result = false;
        } else if (data.Item.Password === inputData.Password) {
            result = true;
        }
    }).promise();
    return result;
}

export const checkSignin = async (tableName, inputData) => {
    var params = {
        TableName: tableName,
        Key: { "Username": inputData.Username }
    };
    let result = true;
    await docClient.get(params, function (err, data) {
        if (err) {
            result = true;
            console.log(err);
        } else if (data.Item == null) {
            result = true;
        }
        else{
            result = false;
        }
    }).promise();
    return result;
}