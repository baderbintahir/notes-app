const chalk = require('chalk')
const yargs = require('yargs')
const getNotes = require('./notes');

// console.log(process.argv)   //it will return an array with all the aurguments passed after the name of the file like "node app.js add"
// console.log(yargs.argv)     //it will return an object which consists of it's on version of process.argv (which would be parsed)

//Customize yargs version
yargs.version('1.1.0')

//Create command with yargs
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        console.log(`Title: ${argv.title}`);
        console.log(`Body: ${argv.body}`);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    handler: function(){
        console.log('Removing a note');
    }
})

yargs.command({
    command: 'list',
    describe: 'Add a new note',
    handler: function(){
        console.log('Listing all the notes');
    }
})

yargs.command({
    command: 'read',
    describe: 'Add a new note',
    handler: function(){
        console.log('Reading a note');
    }
})

yargs.parse()