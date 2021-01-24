import * as Tone from 'tone';

const masterVolume = new Tone.Volume().toDestination()

//TODO: Dynamically get all samples in source folder?
//Use express.static to get samples from public folder on server?
//Ultimately create an upload / buffer service

const sampleURL="https://georgeluther.github.io/polyperc-samples/"

const samples = {
	kick: sampleURL+"kick.wav",
	snare: sampleURL+"snare.wav",
	hihatC: sampleURL+"hihatC.wav",
	hihatO: sampleURL+"hihatO.wav",
	shaker: sampleURL+"shaker.wav",
	clap: sampleURL+"clap.wav",
	crash: sampleURL+"crash.wav",
	ride:sampleURL+"ride.wav"
} 
export {masterVolume, samples}