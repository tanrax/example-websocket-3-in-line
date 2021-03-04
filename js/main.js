const miWebSocket = new WebSocket('ws://localhost:8080');
//0 - Bacio
//1 - Jugador 1
//2 - Jugador 2
//3 - Desactivada

const casillasInicio = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

new Vue({
    el: '#app',
    data: {
        jugador: '1',
        casillas: casillasInicio,
    },
    mounted: function (){
        this.iniciarWebSocket();
    },
    methods: {
        marcar: function (x,y){
            this.casillas[x][y] = parseInt(this.jugador);
            this.$forceUpdate();
            this.enviarDatos(x,y);
        },
        iniciarWebSocket: function (){
            function open () {
                // Abre conexión
                console.log("WebSocket abierto.");
            }

            const message = (evento) => {
                // Se recibe un mensaje
                console.log("WebSocket ha recibido un mensaje");
                // Mostrar mensaje en HTML
                const datosRecibidos = JSON.parse(evento.data);
                this.casillas[datosRecibidos.x][datosRecibidos.y] = datosRecibidos.jugador;
                this.$forceUpdate();
            }

            function error (evento) {
                // Ha ocurrido un error
                console.error("WebSocket ha observado un error: ", evento);
            }

            function close () {
                // Cierra la conexión
                console.log("WebSocket cerrado.");
            }


            // Eventos de WebSocket
            miWebSocket.addEventListener('open', open);
            miWebSocket.addEventListener('message', message);
            miWebSocket.addEventListener('error', error);
            miWebSocket.addEventListener('close', close);
        },
        enviarDatos: function (x,y){
            miWebSocket.send(JSON.stringify({
                x: x,
                y: y,
                jugador: parseInt(this.jugador),
            }));

        },
    }
});
