export default function patternHandlers(component){
    const handleVolumeChange=(e)=>{
        component.setState({volume: e.target.value})
        component.vol.volume.value = e.target.value
    }
return {handleVolumeChange}
}