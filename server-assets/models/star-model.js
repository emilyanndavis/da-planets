;(function(){

    let dataAdapter = require('./data-adapter'),
        uuid = dataAdapter.uuid,
        schemator = dataAdapter.schemator,
        DS = dataAdapter.DS;

    let Star = DS.defineResource({
        name: 'star',
        filepath: __dirname + '/../data/stars.db',
        relations: {
            belongsTo: {
                galaxy: {
                    localField: 'galaxy',
                    foreignKey: 'galaxyId'
                }
            }
        }
    });  

    schemator.defineRule('isValidColor', function (color, colorArr, cb) {
    // artificial asynchronicity
        setTimeout(function () {
            if (colorArr.indexOf(color) === -1) {
                cb({
                    rule: 'isValidColor',
                    actual: 'color === ' + color + ', which is not a valid option',
                    expected: 'color === one of the following: ' + colorArr
                });
            }
            cb(null);
        }, 1);
    }, true);    

    schemator.defineSchema('Star', {
        id: {type: 'string', nullable: false},
        name: {type: 'string', nullable: false},
        galaxyId: {type: 'string', nullable: false},
        color: {
            type: 'string',
            isValidColor: ['red', 'white', 'yellow', 'blue'],
            nullable: false
        }  
    });

    function createStar(name, galaxyId, color, cb){
        let star = {
            id: uuid.v1(),
            name: name,
            galaxyId: galaxyId,
            color: color
        };
        let count = 0;
        schemator.getSchema('Star').validate(star, function(errors){
            // while loop executes only once, to avoid sending the response twice
            while (count === 0) {
                count++;
                if (errors){
                    cb(errors);
                } else {
                    Star.create(star).then(cb);
                }
            }
        });
    }

    function getAll(cb){
        Star.findAll().then(cb);
    }

    module.exports = {
        getAll,
        createStar
    }

}());