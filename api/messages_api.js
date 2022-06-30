// const { promises: fs } = require('fs')

//  class MessagesContainer {

//     constructor(ruta) {
//         this.ruta = ruta;
//     }


//     async showAll() {
//         try {
//             const objs = await fs.readFile(this.ruta, 'utf-8')
//             console.log(JSON.parse(objs));
//             return JSON.parse(objs)
//         } catch (error) {
//             return []
//         }
//     }
//     async save(obj) {
//         const objs = await this.showAll()

//         objs.push(obj)

//         try {
//             await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
//             return newId
//         } catch (error) {
//             throw new Error(`Error al guardar: ${error}`)
//         }
//     }

//  }

//  module.exports = MessagesContainer

const util = require('util') ;
const { normalize, schema } =  require('normalizr');
const { MessageModel } =  require('../models/messages');

const author = new schema.Entity('author', {}, { idAttribute: 'email' });
      
const msge = new schema.Entity(
  'message',
  {
    author: author,
  },
  { idAttribute: '_id' }
);

const msgesSchema = new schema.Array(msge);


class MessagesContainer {

    async save(msge) {
        let savedMessage = await MessageModel.create(msge);
        return savedMessage;
      };
      
      async showAll()  {
        try {
          //El lean le dice a mongoose que solo queremos un simple objeto como respuesta
          const messagesOriginalData = await MessageModel.find().lean();
          console.log('ORIGINAL');
          console.log(messagesOriginalData[0]);
          
      
          let normalizedMessages = normalize(messagesOriginalData, msgesSchema);
            
          console.log('NORMALIZED');
          console.log(util.inspect(normalizedMessages, true, 3, true));
          //return normalizedMessages;
          return messagesOriginalData; 
        } catch (err) {
          console.log('ERROR');
          console.log(err);
        }
      };

}

module.exports = MessagesContainer