'use strict';
const getComponent = require('../lib/runner/getComponent');
const UUID = require('uuid');
const fs = require('fs');

const Controller = require('egg').Controller;
const axios = require('axios');
const FormData = require('form-data');

class SegmentationController extends Controller {
    async seg() {
        const { ctx } = this;
        const data = ctx.request.body;
        let st = data.st;
        if (st == 'source') {
            let fileName = './app/public/' + UUID.v1() + '.json';
            let userId = data.userId;


            await getComponent(data)
                .then(async node => {
                    let tree = JSON.stringify(node);
                    fs.writeFile(fileName, tree, function (err) {
                        if (err) { console.log(err.message) }
                        else { console.log('File written success!') }
                    })
                })
                .catch(e => {
                    console.log(e.message);
                });
            let formData = new FormData();
            formData.append("userId", userId);
            formData.append('file', fs.createReadStream(fileName));
            formData.append('name', data.name);
            formData.append('type', 'json');
            console.log(formData);
            console.log(formData.getHeaders());
            await axios.post('http://localhost:10000/core/source', formData, {
                headers: {
                    ...formData.getHeaders(),
                }
            })
                .then(res => {
                    console.log("Upload Success!", res.data);
                    ctx.body = {
                        success: true,
                        message: 'Segmentation Success!',
                        id: res.data.content
                    };
                }).catch(res => {
                    console.log(res.message);
                    ctx.body = {
                        success: false,
                        message: 'Segmentation Failed...'
                    };
                })
        } else {
            let fileName = './app/public/' + data.name + '-' + UUID.v1() + '.json';
            let userId = data.userId;


            await getComponent(data)
                .then(async node => {
                    let tree = JSON.stringify(node);
                    fs.writeFile(fileName, tree, function (err) {
                        if (err) { console.log(err.message) }
                        else { console.log('File written success!') }
                    })
                })
                .catch(e => {
                    console.log(e.message);
                });
            let formData = new FormData();
            formData.append("userId", userId);
            formData.append('file', fs.createReadStream(fileName));
            formData.append('name', data.name);
            formData.append('type', 'json');
            console.log(formData);
            console.log(formData.getHeaders());
            await axios.post('http://localhost:10000/core/target', formData, {
                headers: {
                    ...formData.getHeaders(),
                }
            })
                .then(res => {
                    console.log("Upload Success!", res.data);
                    ctx.body = {
                        success: true,
                        message: 'Segmentation Success!',
                        id: res.data.content
                    };
                }).catch(res => {
                    console.log(res.message);
                    ctx.body = {
                        success: false,
                        message: 'Segmentation Failed...'
                    };
                })
        }


    }
}

module.exports = SegmentationController;
