var child_process = require('child_process');
child_process.exec( "http-server&&http://localhost:8080" , function(err, stdout , stderr ) {
console.log( stdout );
});