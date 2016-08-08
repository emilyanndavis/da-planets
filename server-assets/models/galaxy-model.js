;(function(){

    let dataAdapter = require('./data-adapter'),
        uuid = dataAdapter.uuid,
        schemator = dataAdapter.schemator,
        DS = dataAdapter.DS;

    let Galaxy = DS.defineResource({
        name: 'galaxy',
        filepath: __dirname + '/../data/galaxies.db',
        relations: {
            hasMany: {
                planet: {
                    localField: 'planets',
                    foreignKey: 'galaxyId'
                },
                star: {
                    localField: 'stars',
                    foreignKey: 'galaxyId'
                },
                moon: {
                    localField: 'moons',
                    foreignKey: 'galaxyId'
                },
                species: {
                    localField: 'species',
                    foreignKeys: 'galaxyIds'
                }
            }
        }
    });

    function parseQuery(query){
        if(query) {
            query = query.split(',').join(' ').split(' ');
        }
        let options = {
            with: query
        };
        return options;
    }

    function getAll(query, cb){
        query = parseQuery(query);
        Galaxy.findAll({}, query).then(cb);
    }

    function getById(id, query, cb){
        query = parseQuery(query);
        Galaxy.find(id, query).then(cb);
    }

    function createGalaxy(name, cb){
        Galaxy.create({
            id: uuid.v1(),
            name: name
        }).then(cb);
    }

    module.exports = {
        getAll,
        getById,
        createGalaxy
    }; 


}());