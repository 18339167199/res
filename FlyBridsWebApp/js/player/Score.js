//计分器类

import {DataStore} from "../base/DataStore.js";

export class Score {

    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.scoreNumber = 0;
        /*canvas刷新频率默认是每秒60次，在加分逻辑确认可以加分的时候，开启计分器 ++，
          因为 canvas的刷屏次数 = 计分逻辑的执行次数，
          所以需要一个变量（isScore）控制加分，加分一次置为false。
        */
        this.isScore = true;
    }

    draw() {
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#ffcbeb';
        this.ctx.fillText(
            this.scoreNumber,
            DataStore.getInstance().canvas.width / 2,
            DataStore.getInstance().canvas.height / 18,
            1000
        );
    }
}