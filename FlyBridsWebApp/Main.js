//初始化整个游戏的精灵，作为游戏开始的入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";
import {API} from "./js/API.js";

export class Main {

    constructor() {
        //在导演类中装入要用到的对象，包括canvas对象和对应的canvas上下文对象，数据缓存器dataStore对象，资源加载器。
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }

    //创建背景音乐
    createBackgroundMusic() {
        //微信小程序接口 ：wx.createInnerAudioContext();
        //设置自动播放 autoplay = true；
        //设置循环播放 loop = true；
        const bgm = wx.createInnerAudioContext();
        bgm.autoplay = true;
        bgm.loop = true;
        bgm.src = 'audios/bgm.mp3';
    }

    //资源加载完成初始化操作
    onResourceFirstLoaded(map) {
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        // this.createBackgroundMusic();


        const examples = new API();
        //获取用户打开小游戏的时间获取。
        let userInfo = examples.getTime();
        examples.login();
        
        examples.httpExample("www.baidu.com",userInfo);



        this.init();
    }

    init() {

        //首先重置游戏是没有结束的
        this.director.isGameOver = false;

        //载入需要的数据，数据存在数据缓存对象中DataStore中
        this.dataStore
            .put('pencils', [])//铅笔数组，一共有4个项目，分别代表界面中的4个铅笔
            .put('background', BackGround)
            .put('land', Land)
            .put('birds', Birds)
            .put('score', Score)
            .put('startButton', StartButton);
        this.registerEvent();
        //创建铅笔要在游戏逻辑运行之前
        this.director.createPencil();
        this.director.run();
    }
    

    //注册事件，点击屏幕小鸟起飞和游戏开始时点击开始按钮开始游戏的事件
    //接口：wx.onTouchStart
    registerEvent() {
        wx.onTouchStart(() => {
            if (this.director.isGameOver) {
                console.log('游戏开始');
                this.init();
            } else {
                this.director.birdsEvent();
            }
        });
    }
}