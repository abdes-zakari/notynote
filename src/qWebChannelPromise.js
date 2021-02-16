import {QWebChannel} from  './qwebchannel'

let qWebChannelPromise = new Promise(function(resolve, reject) {
    new QWebChannel(window.qt.webChannelTransport, (channel) => {
        // console.log("Start qWebChannelPromise");
        resolve(channel);
    });
});

export default qWebChannelPromise
// export {qWebChannelPromise}

