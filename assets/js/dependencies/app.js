// example.js
// ===============================
//
// Client-side (browser) example of how you might connect a socket.io client
// to your Sails backend.

// For the latest docs on talking to Sails via socket.io, check out the new reference section in the Sails docs:
// https://github.com/balderdashy/sails-docs/blob/master/reference/SocketClient.md

// As for some great tutorials, my best recommendation would be to check out @irlnathan's sailscasts:
// http://irlnathan.github.io/sailscasts



// MIT License
// c. 2013, Mike McNeil <@mikermcneil>
// <sailsjs.org>




// NOTE
//
// This example expects and/or creates the following global variables:
//
// (1)  `io`
//
//    For this example to work, the socket.io client (`socket.io.js`) must
//    be included on your page BEFORE this file.  This is because we need
//    access to the global `io` variable.
//
//    To see an example, just check out this app.  `sails new` bundles a copy
//    of the socket.io client in `assets/socket.io.js`, and the default Gruntfile
//    includes it in the proper order before this file.
//
//
// (2)  `socket`
//
//    In this example, after we finish connecting to the server, we expose the
//    connected `socket` as a global-- mainly because this makes it easy to access
//    from the browser console.
//
//    Check it out!
//
//    > socket.get('/parrot',      console.log.bind(console));
//    > socket.get('/parrot/3',      console.log.bind(console));
//    > socket.post('/parrot', { name: 'Polly', age: 49 },      console.log.bind(console) );
//    > socket.put('/parrot/4', { age: 50 },      console.log.bind(console) );
//    > socket.delete('/parrot/3',      console.log.bind(console) );
//
//
//    BTW in case you were wondering:       `console.log.bind(console)`
//    is just a Chrome-friendly shortcut for:   `function (response) {console.log(response); }`





// Immediately start connecting
socket = io.connect();

typeof console !== 'undefined' &&
    console.log('Connecting Socket.io to Sails.js...');

// Attach a listener which fires when a connection is established:
io.socket.on('connect', function socketConnected() {

    typeof console !== 'undefined' &&
        console.log(
            'Socket is now connected and globally accessible as `socket`.\n' +
            'e.g. to send a GET request to Sails via Socket.io, try: \n' +
            '`socket.get("/foo", function (response) { console.log(response); })`'
        );

    //Subscribing to the card model
    io.socket.get('/user/subscribe', function (data) {
    });

    io.socket.get('/card/subscribe', function(data){
    });
    // Attach a listener which fires every time the server publishes a message:
    io.socket.on('card', function newMessageFromSails(message) {
      socket.emit('card', message.data);
    });


});
