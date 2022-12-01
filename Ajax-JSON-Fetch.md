# Evaluación Técnica de Sistemas Creative Media -- Diferencia entre Ajax, JSON y Fetch

* **Ajax:** Asynchronous JavaScript and XML, sirve para realizar tareas asincrónicas en una página web. Trata de actualizar partes de la página web sin tener que recargarla completamente. Para ello Ajax utiliza el objeto llamado XMLHttpRequest para solicitar datos y funciona a través de callbacks.

    Un ejemplo de una función AJAX, sería de la siguiente forma donde a través de if, se va manejando las respuestas, en este caso la función primero verifica que la función haga la llamada, luego que sea correcta y de acuerdo con ello ejecutar una función que llamamos callback con la respuesta y si no recibe una respuesta correcta genera un error que se envía a través de otra función callback. 

    Luego de todo ese proceso, recién envía una respuesta.


        const XMLHttpRequest = require('xmlhttprequest');
        

        function fetchDataWithAjax(urlApi, callback) {
            let xhttp = new XMLHttpRequest();

            xhttp.open('GET', urlApi, true);
            xhttp.onreadystatechange = function (event) {
                if (xhttp.readyState === 4) {
            
        // Estado 4, siginifica que se completó la llamada y tiene lista una respuesta

                if(xhttp.status === 200) {
            
        // valida que la solicitud es correcta
            
                    callback(null, JSON.parse(xhttp.resposeText))
                }
                } else {
                const error = new Error('Error' + urlApi);
                return callback(error, null);
                }
            }
            xhttp.send();
            }

    Adicionalmente, la estructura de la información que tiene AJAX no es estándar, ya que puede depender de la implementación que se haya hecho de acuerdo con la lógica del negocio.

* **JSON:** JavaScript Object Notation, es una forma de almacenar información de manera organizada y fácilmente entendible para las personas. Es un archivo de texto estandar que consiste en pares "clave - valor". Éstos valores pueden ser boleanos, strings, numeros u otros objetos JSON.

* **Fetch:** Hace llamados asíncronos al igual que Ajax, pero no usa el objeto XMLHttpRequest. En su lugar para manejar esos llamados hace uso de las promesas de Javascript, las cuales pueden ser resueltas o rechazadas.

    El mismo llamado realizado con AJAX, podría realizarse de la siguiente forma:

        fetchDataWithFetch(urlApi)
            .then(response => response.json())
            .then(json => {console.log(json)})
            .catch(err => console.log(err))

    Esto da como resultado una mejor sintaxis para el manejo de llamados y junto con el uso de JSON permite manejar de la mejor forma la información entre distintos sistemas.

