;(function(){

    let dataAdapter = require('./data-adapter'),
        uuid = dataAdapter.uuid,
        schemator = dataAdapter.schemator,
        DS = dataAdapter.DS;

    let Planet = require('./planet-model').Planet;

    let Species = DS.defineResource({
        name: 'species',
        filepath: __dirname + '/../data/species.db',
        relations: {
            hasMany: {
                planet: {
                    localField: 'planets',
                    localKeys: 'planetIds'
                },
                galaxy: {
                    localField: 'galaxies',
                    localKeys: 'galaxyIds'
                }
            }
        }
    });  

    schemator.defineSchema('Species', {
        id: {type: 'string', nullable: false},
        name: {type: 'string', nullable: false}
    });

    function createSpecies(name, cb){
        let species = {
            id: uuid.v1(),
            name: name,
            planetIds: {},
            galaxyIds: {}
        };
        let error = schemator.validateSync('Species', species);
        if (error){
            return cb(error);
        }
        Species.create(species).then(cb);
    }

    function inhabitPlanet(speciesId, planetId, cb){
        Species.find(speciesId).then(function(species){
            if (!species){
                return cb({error: 'BAD SPECIES ID'});
            }
            Planet.find(planetId).then(function(planet){
                if (!planet){
                    return cb({error: 'BAD PLANET ID'});
                }
                species.planetIds[planetId] = planetId;
                species.galaxyIds[planet.galaxyId] = planet.galaxyId;
                Species.update(speciesId, species).then(function(sp){
                    return cb(sp);
                });
            });
        });
    }

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
        Species.findAll({}, query).then(cb);
    }

    function getById(id, query, cb){
        query = parseQuery(query);
        Species.find(id, query).then(cb);
    }

    module.exports = {
        getAll,
        getById,
        createSpecies,
        inhabitPlanet
    }

}());