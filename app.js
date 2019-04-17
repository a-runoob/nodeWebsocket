let ws= require('nodejs-websocket');

var server = ws.createServer(function(conn){
    //服务端接受数据
    conn.on('text',(str)=>{
        console.log(str);

        //调用广播   发送数据
        boardCast(str);
    })


    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });

}).listen(80,()=>{console.log('server listen 80')});

//服务器接收的数据  再广播出去  所有人都能看见
function boardCast(str){  
    var str=JSON.parse(str);
    if(str.type=='user'){
        username=str.content;
        server.connections.forEach(item=>{
            item.sendText(username+'加入了群聊');
        })
    }
    if(str.type=='msg'){
        server.connections.forEach(item=>{
            item.sendText(str.username+' : '+str.content);
        })
    }

}