const {schema, denormalize} = require('normalizr');

const author = new schema.Entity('author', {}, { idAttribute: 'email' });

const msge = new schema.Entity(
  'message',
  {
    author: author,
  },
  { idAttribute: '_id' }
);

const finalSchema = new schema.Array(msge);


function denormalizeData (data) {
	const denormalizedData = denormalize(data.result, finalSchema, data.entities);

	return denormalizedData;
}

module.exports = {finalSchema, denormalizeData};