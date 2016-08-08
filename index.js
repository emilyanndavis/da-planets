;(function(){

     let express = require('express'), 
        bodyParser = require('body-parser'), 
        cors = require('cors'),
        server = express(), 
        routes = require('./server-assets/routes/index'), 
        port = process.env.PORT || 8888;

    server.use(bodyParser.json());    
    server.use(bodyParser.urlencoded({extended: true}));

    server.use('/', express.static(`${__dirname}/public/planets`));
    // server.use('/pizza', express.static(`${__dirname}/public/pizza`));
    // server.use('/api', routes.router);

    var whitelist = ['http://localhost:8081'];
    var corsOptions = {
        origin: function(origin, callback){
            var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
            callback(null, originIsWhitelisted);
        }
    };
    server.use('/api', cors(corsOptions), routes.router);
    
    server.listen(port, function(){
        console.log(`Creating worlds on port ${port}`)
    });


}());