const fs = require("fs");
const os = require("os")

console.log(os.hostname())

fs.appendFile("my_server.js","Welcome",()=> {
    console.log("Server file created");
})

fs.appendFile("db.js","", ()=>{
    console.log("file created")
})




/////////////    connecting another file //////////////////////////////

// const notes = require("./notes.js")

// console.log(notes)

// const result = notes.fn(3,5)

// console.log(result)
