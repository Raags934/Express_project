/**
 * Created by Shumi on 17/5/18.
 */
'use strict';

function saveData(model,data) {
    return new Promise((resolve, reject) => {
        try {
            let saveData = new model(data).save();
            return resolve(saveData);
        } catch (err) {
            return reject(err);
        }
    });
}


function getData(model, query, projection, options) {
    return new Promise((resolve, reject) => {
        try {
            let findData = model.find(query, projection, options);
            return resolve(findData);
        } catch (err) {
            return reject(err);
        }
    });
}

function insert(model, data, options) {
    return new Promise((resolve, reject) => {
        try {
            let data1 = model.collection.insert(data,options);
            return resolve(data1);
        } catch (err) {
            return reject(err);
        }
    });
}




function populateData(model, query, projection, options, collectionOptions) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.find(query, projection, options).populate(collectionOptions).exec();
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}


function findAndUpdate(model, conditions, update, options) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.findOneAndUpdate(conditions, update, options);
            return resolve(data);
        } catch (err) {
            console.log('yyyyyyyyyyyyyyyyyyyyy',err)
            return reject(err);
        }
    });
}
function Update(model,update, options) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.Update(update, options);
            return resolve(data);
        } catch (err) {
            console.log('yyyyyyyyyyyyyyyyyyyyy',err)
            return reject(err);
        }
    });
}

module.exports = {
    saveData : saveData,
    getData : getData,
    //update : update,
    findAndUpdate:findAndUpdate,
   // remove: remove,
    insert: insert,
    Update:Update,
    populateData:populateData


};