dojo.provide('unc.Words');

dojo.require("dojox.data.JsonRestStore");

var wordfreq;

dojo.ready(function() {
    wordfreq = new dojox.data.JsonRestStore({target:"/data/BigWords/wordfreq/",
                                             idAttribute:"_id" });
});

unc.Words.SpellCheck = function(word, callback) {
    wordfreq.fetch({
        query: { word: word },
        onComplete: function(words) {
            callback(words.length > 0);
        }
    });
}

        