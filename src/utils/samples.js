import * as Tone from 'tone';

const sampler = new Tone.Sampler({
	urls: {
		A1: "kick.wav",
		B1: "snare.wav",
		C1: "clap.wav",
		D1: "hihatC.wav",
		E1: "hihatO.wav",
		F1: "shaker.wav",
		G1: "crash.wav",
		A2: "ride.wav"
	},
	baseUrl: "https://georgeluther.github.io/polyperc-samples/",
}).toDestination();

export default sampler