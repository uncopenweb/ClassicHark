dojo.provide('unc.MediaSelector');

dojo.require('unc.AudioBrowser');
dojo.require("dijit.Dialog");

unc.MediaSelector.soundDialog = function(callback) {

    var audioBrowser = new unc.AudioBrowser();

    var dialog = new dijit.Dialog({
        title: "Select a sound...",
        content: [audioBrowser.domNode],
        style: "width: 400px; height:400px;"
    });
    dialog.show();
    
    dojo.connect(audioBrowser, 'soundSelected', function() {
        //function connecting not working how i want... 
        var sound = audioBrowser.selected;
        console.log("SOUND SELECTED? : ", sound);
        dialog.hide();
        dialog.destroyRecursive();
        callback(sound.URL);
    });

};
