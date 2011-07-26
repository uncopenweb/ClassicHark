dojo.provide('soundModule');

dojo.declare('soundModule', null, 
{
    constructor: function() 
	{
		//Create audio object
		var def = uow.getAudio({defaultCaching: true});
		
        def.addCallback(dojo.hitch(this, function(audio) 
        { 
            this._audio = audio;
		}
	}
	
	//Speaks an utterance over a certain audio channel
	speak: function(string, audioChannel, shouldStop, afterFunction)
	{
		if(shouldStop)
			this._audio.stop({channel : audioChannel});
				
		this._audio.setProperty({name : 'volume', channel : audioChannel, value : masterVolume*speechVolume, immediate : true});
		this._audio.say({text : string, channel : audioChannel}).callAfter(afterFunction);
	},

	//Plays a certain sound over a certain audio channel
	playSound: function(urlString, audioChannel, relativeVolume, shouldStop, afterFunction)
	{
		if(shouldStop)
			this._audio.stop({channel : audioChannel});
			
		this._audio.setProperty({name : 'volume', channel : audioChannel, value : masterVolume*soundVolume*relativeVolume, immediate : true});
		this._audio.play({url : urlString, channel : audioChannel}).callAfter(afterFunction);
	}
}