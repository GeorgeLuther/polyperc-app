//TODO: When finished this will be used in the pattern component
import { samples, masterVolume } from './audioSetup'
import { Volume, Solo, Sampler, Loop } from 'tone'

export default function toneInstance(component){
    console.log(component)
    //initialize sampler instance
    const vol = new Volume(1)
    const solo = new Solo()
    const sampler = new Sampler(
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
    ).chain(vol, solo, masterVolume)


    let index = 0
    let inst="C-1"
//everything below here needs to be asynchronous 
    let pattern = component.state.pattern.pattern
    let length = component.state.pattern.pattern.length
            //this callback reads and performs the pattern array 
    const playhead=(time)=> {
        let step = index % length;
        for (let i = 0; i < length; i++) {          
            if (pattern[step]) {
                sampler.triggerAttackRelease(inst, 0.2, time);
            }
        }
        index++;
    }
    
    //listens to transport/context time and triggers callback at interval
    const loop = new Loop((time) => {
        playhead(time)
    }, `${length}n`)

    return {vol, solo, sampler, inst}
}