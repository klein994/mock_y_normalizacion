//const denormalizeData = require('./normalizer.js');
//import { denormalizeData } from "./normalizer.js";

const socket = io.connect();

const addProduct = document.getElementById('addProduct')
addProduct.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: addProduct[0].value,
        price: addProduct[1].value,
        thumbnail: addProduct[2].value
    }
    socket.emit('update', producto);
    addProduct.reset()
})

socket.on('products', productos => {
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function makeHtmlTable(productos) {
    return fetch('views/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const sendMessage = document.getElementById('sendMessage')
sendMessage.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = { 
        autor: {
            id: inputEmail.value, 
            nombre: inputUsername.value,
            apellido: inputUserLastname.value,
            edad: inputUserAge.value,
            alias: inputUserAlias.value,
            avatar: inputUserAvatar.value
        },
        text: inputMensaje.value 
    }


    socket.emit('newMessage', mensaje);
    sendMessage.reset()
    inputMensaje.focus()
})

socket.on('messages', messages => {
 // console.log('En el front normalizado');
    console.log(messages);
//     console.log('denormalized data');
// 	const denormalizedData = denormalizeData(mensajes)
//   console.log(denormalizedData);

    const html = makeHtmlList(messages)
    document.getElementById('messages').innerHTML = html;
})

function makeHtmlList(messages) {
    return messages.map(mensaje => {
        return (`
            <div>
                <b style="color:blue;">${mensaje.author.id}</b>
                <i style="color:green;">${mensaje.text}</i>
            </div>
        `)
    }).join(" ");
}

inputUsername.addEventListener('input', () => {
    const hayDatos = inputEmail.value.length && inputUsername.value.length && inputUserLastname.value.length && inputUserAge.value.length && inputUserAlias.value.length && inputUserAvatar.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayDatos
    btnEnviar.disabled = !hayDatos || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})
