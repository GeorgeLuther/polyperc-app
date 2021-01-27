//TODO: When finished this will be used in the pattern component
import { samples, masterVolume } from './audioSetup'
import { Volume, Solo, Sampler, Loop } from 'tone'

export default function toneInstance(component){
    let vol = null
    let solo= null
    let sampler= null
    let index= null
    let inst= null
    let pattern= null
    let length= null
    let loop = null

    //initialize sampler instance - MAKE it a function for async call1 from setState
     vol = new Volume()
     solo = new Solo()
     sampler = new Sampler(
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
            component.setState({isLoaded: true})
        }}
    ).chain(vol, masterVolume)


     index = 0
     inst="C-1"
     pattern = component.state.pattern.pattern
     length = component.state.pattern.pattern.length
    
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
    
    //listens to transport/context time and triggers callback at interval - MAKE it a function for async call1 from onLoad ... maybe just the loop.start() ?
     loop = new Loop((time) => {
        playhead(time)
    }, `${length}n`).start()

    return {vol, solo, sampler, inst, loop}
    
}