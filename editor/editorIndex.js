dojo.require('editor.schemaEditor');

var jsonic = {};

function main() {

    
    var schemaGridLayout =  [
        { name: 'Game Name', field: 'name', width: "50%" },
        { name: 'Id', field: '_id', width: "50%" } ];
    
    uow.getDatabase({database:'Hark', collection:'notarealcollection'}).addCallback(function(db) {
        var se = new editor.schemaEditor({
            store: db,
            gridLayout: schemaGridLayout
        });
        dojo.place(se.domNode, 'editorGoesHere');
        se.startup();
    });
    
    setupAudio();

}

function setupAudio() {
    
    uow.getAudio().then(function(a) {
        jsonic = a;
        
        dojo.subscribe('playAudio', function(args) {
            console.log("pub recieved", args); 
            console.log("jsonic obj:", jsonic);
            
            //clear the previous sounds and let this one play
            jsonic.stop();
            jsonic.play({url : args});
        });
        
    });
    
}

dojo.ready(main);
