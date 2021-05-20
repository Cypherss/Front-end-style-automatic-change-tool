'use strict';
const getComponent = require('../lib/runner/getComponent');
const UUID = require('uuid');
const fs = require('fs');

const Controller = require('egg').Controller;

class SegmentationController extends Controller {
    async seg() {
        const { ctx } = this;
        const data = ctx.request.body;

        await getComponent(data)
            .then(async node => {
                let tree = JSON.stringify(node);
                fs.writeFile('./app/public/' + UUID.v1() + '.json', tree, function(err){
                    if (err) {console.log(err.message)}
                    else {console.log('File written success!')}
                })
            })
            .catch(e => {
                console.log(e.message);
            });
        ctx.body = {
            code: 0,
            message: 'Segmentation Success!'
        };
    }
}

module.exports = SegmentationController;
