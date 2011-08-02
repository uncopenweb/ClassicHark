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
	{
		if(shouldStop)
			this._audio.stop({channel : audioChannel});
				
		//this._audio.setProperty({name : 'volume', channel : audioChannel, value : this.masterVolume*this.speechVolume, immediate : true});
		return this._audio.say({text : string, channel : audioChannel}).callAfter(afterFunction);
	},

	//Plays a certain sound over a certain audio channel
	playSound: function(urlString, audioChannel, shouldStop, afterFunction)
	{
		if(shouldStop)
			this._audio.stop({channel : audioChannel});
			
		//this._audio.setProperty({name : 'volume', channel : audioChannel, value : this.masterVolume*this.soundVolume, immediate : true});
		return this._audio.play({url : urlString, channel : audioChannel}).callAfter(afterFunction);
	},
	
	//Sets the speech rate of all the channels in a list of audio channels
	setSpeechRate: function(speechRate, channelList)
	{
		//for(var audioChannel in channelList)
			//this._audio.setProperty({name : 'rate', channel : audioChannel, value : speechRate, immediate : true});
	}
});