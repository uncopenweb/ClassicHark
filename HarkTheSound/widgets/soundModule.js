dojo.provide('soundModule');

dojo.declare('soundModule', null, 
{
	masterVolume: 0,
	speechVolume: 0,
	soundVolume: 0,
	musicVolume: 0,
	_audio: null,
	
    constructor: function() 
	{
		//Create audio object
		var def = uow.getAudio({defaultCaching: true});
		
        def.addCallback(dojo.hitch(this, function(audio) 
        { 
            this._audio = audio;
		}));
	},
	
	//Speaks an utterance over a certain audio channel
	speak: function(string, audioChannel, shouldStop, afterFunction)
	{
		if(shouldStop)
			this._audio.stop({channel : audioChannel});
				
		this._audio.setProperty({name : 'volume', channel : audioChannel, value : this.masterVolume*this.speechVolume, immediate : true});
		this._audio.say({text : string, channel : audioChannel}).callAfter(afterFunction);
	},

	//Plays a certain sound over a certain audio channel
	playSound: function(urlString, audioChannel, shouldStop, afterFunction)
	{
		if(shouldStop)
			this._audio.stop({channel : audioChannel});
			
		this._audio.setProperty({name : 'volume', channel : audioChannel, value : this.masterVolume*this.soundVolume, immediate : true});
		this._audio.play({url : urlString, channel : audioChannel}).callAfter(afterFunction);
	},
	
	//Plays a certain musical track over a certain audio channel
	playMusic: function(urlString, audioChannel, shouldStop, afterFunction)
	{
		if(shouldStop)
			this._audio.stop({channel : audioChannel});
			
		this._audio.setProperty({name : 'volume', channel : audioChannel, value : this.masterVolume*this.musicVolume, immediate : true});
		this._audio.play({url : urlString, channel : audioChannel}).callAfter(afterFunction);
	},

	//Set the speech rate of a list of audio channels
	setSpeechRate: function(channelList, rate)
	{
		var i;
		
		for(i=0;i<channelList.length;i++)
			this._audio.setProperty({name : 'rate', channel : channelList[i], value : rate, immediate : true});
	}
});