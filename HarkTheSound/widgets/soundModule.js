dojo.provide('widgets.soundModule');

dojo.declare('widgets.soundModule', null, 
{
	masterVolume: 0,
	speechVolume: 0,
	soundVolume: 0,
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
	{console.log("Speaking... String: "+string+", Audio Channel: "+audioChannel+", Master Volume: "+this.masterVolume+", Speech Volume: "+this.speechVolume);
		if(shouldStop)
			this._audio.stop({channel : audioChannel});
		
		this._audio.setProperty({name : 'volume', channel : audioChannel, value : this.masterVolume*this.speechVolume});
		return this._audio.say({text : string, channel : audioChannel}).callAfter(afterFunction);
	},

	//Plays a certain sound over a certain audio channel
	playSound: function(urlString, audioChannel, shouldStop, afterFunction)
	{console.log("Playing... Source: "+urlString+", Audio Channel: "+audioChannel+", Master Volume: "+this.masterVolume+", Sound Volume: "+this.soundVolume);
		if(shouldStop)
			this._audio.stop({channel : audioChannel});
			
		this._audio.setProperty({name : 'volume', channel : audioChannel, value : this.masterVolume*this.soundVolume});
		return this._audio.play({url : urlString, channel : audioChannel}).callAfter(afterFunction);
	}
});