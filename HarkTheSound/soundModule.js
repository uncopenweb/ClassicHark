//Speaks an utterance over a certain audio channel
function speak(string, audioChannel, shouldStop, afterFunction)
{
	if(shouldStop)
		audio.stop({channel : audioChannel});
			
	audio.setProperty({name : 'volume', channel : audioChannel, value : masterVolume*speechVolume, immediate : true});
	audio.say({text : string, channel : audioChannel}).callAfter(afterFunction);
}

//Plays a certain sound over a certain audio channel
function playSound(urlString, audioChannel, relativeVolume, shouldStop, afterFunction)
{
	if(shouldStop)
		audio.stop({channel : audioChannel});
		
	audio.setProperty({name : 'volume', channel : audioChannel, value : masterVolume*soundVolume*relativeVolume, immediate : true});
	audio.play({url : urlString, channel : audioChannel}).callAfter(afterFunction);
}

//Sets the speech rate of all audio channels in paramenter
function setSpeechRate(channelList, rate)
{
	var i;
	
	for(i=0;i<channelList.length;i++)
		audio.setProperty({name : 'rate', channel : channelList[i], value : rate, immediate : true});
}