'use strict';

const Controller = require('egg').Controller;

class SegmentationController extends Controller {
    async seg() {
        const { ctx } = this;
        const data = ctx.request.body;

        // 异步执行任务，无需等待任务完成
        const id = res._id;
        const start = +new Date();
        getComponent(data)
            .then(async json => {
                const file = await fs.write(
                    JSON.stringify(json),
                    `${data.site}-${+new Date()}`
                );
            })
            .catch(e => {
                
            });
        ctx.body = {
            success: true
        };
    }
}

module.exports = SegmentationController;
