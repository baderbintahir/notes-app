const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => 'Your notes...'

const duplicateNotes = (notes, title) => notes.filter((note) => note.title === title)

const addNote = (title, body) => {
    const notes = loadNotes()

    if(duplicateNotes(notes, title).length === 0){
        notes.push({
            title: title,
            body: body
        })

        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('This title is already taken!'))
    }

    updateNotes(notes);
}

const updateNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    if(duplicateNotes(notes, title).length === 0){
        console.log(chalk.red.inverse('There is no note with this title!'))
    } else{
        for(let i = 0; i < notes.length; i++){
            if(notes[i].title === title){
                notes.splice(i, 1)
            }
        }
    
        console.log(chalk.green.inverse('Removed the note'))
    }

    updateNotes(notes)
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse(getNotes()))

    notes.forEach(note => {
        console.log(`${note.title}: ${note.body}`)
    });
}

const readNote = (title) => {
    const notes = loadNotes();

    if(duplicateNotes(notes, title).length === 0){
        console.log(chalk.red.inverse('Note not found!'))
    } else {
        notes.forEach((note) => {
            if(note.title === title){
                console.log(chalk.inverse(note.title))
                console.log(note.body)
            }
        })
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};