const notes = [{
    title: "My Next Trip",
    body: "I would like to go to spain"
}, {
    title: "Habits to work on",
    body: "excersise"
}, {
    title: "Office Modification",
    body: "Get a new seat"
}]
const filters={
    searchText:''
}
const renderedNotes=function(notes,filters){
    const filteredNotes=notes.filter(function(note){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    console.log(filteredNotes);
    filteredNotes.forEach(function(note){
        const noteEl=document.createElement("p");
        noteEl.textContent=note.title;
        document.querySelector("#notesDiv").appendChild(noteEl);
    })
}
// input event to filter elements
document.querySelector("#search-text").addEventListener("input", function (e) {
    filters.searchText=e.target.value;
    document.querySelector("#notesDiv").innerHTML="";
    renderedNotes(notes, filters);
})

renderedNotes(notes,filters)

document.querySelector("#for-fun").addEventListener("change",function(e){
    console.log(e.target.checked)
})

document.querySelector("#filter-by").addEventListener("change", function (e) {
    console.log(e.target.value)
})
