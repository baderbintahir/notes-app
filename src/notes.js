const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const duplicateNotes = (notes, title) => {
    return notes.filter((note) => {
        return note.title === title
    })
}

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

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
};