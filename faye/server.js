var Faye   = require('./lib/faye-node'),
    server = new Faye.NodeAdapter({
                mount: '/'
                , callback: function() {
                  console.log('heyhey');
                }
              });

server.listen(8080);


