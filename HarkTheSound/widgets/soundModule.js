dojo.provide('widgets.soundModule');

dojo.declare('widgets.soundModule', null, 
{
	masterVolume: 1.0,
	speechVolume: 1.0,
	soundVolume: 1.0,
	_audio: null,
	
    constructor: function(audio) 
	{
        this._audio = audio;
	},
	
	getAudio: function()
	{
		return this._audio;
	},
	
	//Speaks an utterance over a certain audio channel
	speak: function(string, audioChannel, shouldStop, afterFunction)
	{
		if(shouldStop)
			this._audio.stop({channel : audioChannel});
		
		this._audio.setProperty({name : 'volume', channel : audioChannel, value : this.masterVolume*this.speechVolume, immediate : true});
		return this._audio.say({text : string, channel : audioChannel}).callAfter(afterFunction);
	},

	//Plays a certain sound over a certain audio channel
	playSound: function(urlString, audioChannel, shouldStop, afterFunction)
	{
		if(shouldStop)
			this._audio.stop({channel : audioChannel});
			
		this._audio.setProperty({name : 'volume', channel : audioChannel, value : this.masterVolume*this.soundVolume, immediate : true});
		return this._audio.play({url : urlString, channel : audioChannel}).callAfter(afterFunction);
	}
});