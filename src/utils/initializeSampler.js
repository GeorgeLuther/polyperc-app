//TODO: make this a function that instantiates versions of the variables below
vol = new Tone.Volume(1)
solo = new Tone.Solo()
sampler = new Tone.Sampler(
    { 
    "C-1": samples.kick,
    "C#-1": samples.snare,
    "D-1": samples.hihatO,
    "Eb-1": samples.hihatC,
    "E-1": samples.shaker,
    "F-1": samples.clap,
    "Gb-1": samples.crash,
    "G-1": samples.ride,    
    },
    {onLoad: ()=>{
        this.setState({isLoaded: true})
    }}
).chain(this.vol, this.solo, masterVolume)