function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){

    var App = {
        "init": function() {
            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.nmd.stickynotes'); // Intialize the ApplicationDbContext with the connection string as parameter value
            this.testApplicationDbContext(); // Test DbContext
        },
        "testApplicationDbContext": function() {
            // 1. Get all sticky notes
            let data = this._applicationDbContext.getStickyNotes();
            console.log(data);
            // 2. Create a new sticky note
            let params = (new URL(document.location)).searchParams;
            let name = params.get("q");
            console.log(name);

            let sn = new StickyNote();
            sn.message = name;
            sn = this._applicationDbContext.addStickyNote(sn); // add to db and save it

            let sticky = document.querySelector(".sticky");
            let tempStr = "";
            data.forEach(function(i) {
                tempStr += `<div  class="notitie"><p> ${i.message}</p> 
                <a id="${i.id}" href="#" onClick="replyClick(this.id)">Verwijderen</a> </div>`;
            })
            sticky.innerHTML += tempStr;

            // 3. Get allesticky notes
            data = this._applicationDbContext.getStickyNotes();
            console.log(data);
            // 4. Get sticky note by id
            sn = this._applicationDbContext.getStickyNoteById(2306155430445);
            //console.log(sn);
            // 5. Delete sticky note by id
            const deleted = this._applicationDbContext.deleteStickyNoteById(2306155430445);
            console.log(deleted);
            // 6. Soft Delete sticky note with id: 1551637732407
            const softDeleted = this._applicationDbContext.softDeleteStickyNoteById(1551637732407);
            console.log(softDeleted);
            sn = this._applicationDbContext.getStickyNoteById(1551637732407);
            //console.log(sn);
            // 6. Soft Delete sticky note with id: 1551637732407
            const softUnDeleted = this._applicationDbContext.softUnDeleteStickyNoteById(1551637732407);
            console.log(softUnDeleted);
            sn = this._applicationDbContext.getStickyNoteById(1551637732407);
            console.log(sn);
            // Update sticky note with id: 1902577181167
            sn = this._applicationDbContext.getStickyNoteById(1902577181167);
            console.log(sn);
            //sn.message = 'ik heb zin in een zwarte kat (koffie)...';
            const updated = this._applicationDbContext.updateStickyNote(1902577181167);
            console.log(updated);
            sn = this._applicationDbContext.getStickyNoteById(1902577181167);
            console.log(sn);
        }
    };

    App.init(); // Initialize the application
});