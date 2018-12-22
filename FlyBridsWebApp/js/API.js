/**
 *小游戏API的测试
 */
export class API {
 

    constructor(){
      this.openid = "";
    }
    getTime (){
      let time = new Date();
      let timeObj = {
        "year" : "",
        "mouth" : "",
        "day" : ""
      };
      timeObj.year = time.getFullYear();
      timeObj.mouth = time.getMonth() + 1;
      timeObj.day = time.getDate();
      return timeObj;
    }

    login() {
        wx.login({
            success:(res) => {
              this.openid = res.code;
            }
        });
    }

    getSettings() {
        wx.getSetting({
            success: function (res) {
                console.log(JSON.stringify(res));
            }
        });
    }

    openSetiting (){
        wx.openSetting({
            success(res) {
              console.log(res.authSetting)
              // res.authSetting = {
              //   "scope.userInfo": true,
              //   "scope.userLocation": true
              // }
            }
          })
    }

    //Http网络请求的调用
    httpExample(url,data) {
        wx.request({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log(response);
                //这里可以根据服务器的指示来做相应的动作
            }
        });

        // wx.request({
        //     url: 'https://www.baidu.com/',
        //     method: 'GET',
        //     success: function (response) {
        //         console.log(response);
        //         //这里可以根据服务器的指示来做相应的动作
        //     }
        // });
    }

    socketExample() {
        wx.connectSocket({
            url: 'ws://127.0.0.1:8282',
            success: function () {
                console.log('客户端连接成功');
            }
        });

        //注意，我们发送数据必须在wx.onSocketOpen中进行
        wx.onSocketOpen(function () {
            wx.sendSocketMessage({
                data: '这个是来自客户端的实时消息'
            });

            wx.onSocketMessage(function (message) {
                console.log(message);
            });
        });
    }

    download() {
        wx.downloadFile({
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517319437013&di=2ec844cb98f7a6fffacca64df50b2248&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F0df431adcbef7609ddf178bb24dda3cc7cd99e18.jpg',
            success: function (temp) {
                console.log(JSON.stringify(temp));
            }
        });
    }
}