
const createPattern = {
    pulse: {
        description: 'every beat is active (this is the only method that ignores active beats)',
        method(pattern){
            pattern.pattern = new Array(pattern.patternLength).fill(1)
            console.log('pulse applied')
            pattern.originalPattern = pattern.pattern
        }
    },
    beat: {
        description: 'active beat occurs on specified beat (allows negative numbers)',
        method(pattern){
            pattern.pattern = new Array(pattern.patternLength).fill(0)
            let L = pattern.patternLength
            let t = pattern.activeBeats
            let absT = Math.abs(t)
            let index;
            if (t>0) {
                index = (t%L)-1
                if (index < 0) {index = L-1}
                pattern.pattern[index] = 1
            } else if (t<0) {
                index = (L-(absT%L))
                pattern.pattern[index] = 1
            }
            console.log('beat applied')
            pattern.originalPattern = pattern.pattern
        }
    },
    random: {
        description: 'active beats are dispersed randomly throughout the pattern (allows negative numbers)',
        method(pattern){
            pattern.pattern = new Array(pattern.patternLength).fill(0)
            let slotArray = []
            for (let slot = 0; slot < pattern.patternLength; slot++){
                slotArray.push(slot)
            }
            for (let currTrig = 0; currTrig < pattern.activeBeats; currTrig++){
            let available = slotArray.length
            let myRand = Math.floor(Math.random() * (available))
            pattern.pattern[slotArray[myRand]]=1
            slotArray.splice(myRand, 1)
            }
            console.log('random applied')
            pattern.originalPattern = pattern.pattern
        }
    },
    even: {
        description: 'active beats are dispersed as evenly as possible throughout the pattern (euclidean/bresenham)',
        method(pattern){
            let previous = null
            let newPattern = []
            //bresenham dispersion
            for (let i = 0; i < pattern.patternLength; i++) {
                let x = Math.floor((pattern.activeBeats  / pattern.patternLength) * i)
                newPattern.push(x === previous ? 0 : 1)
                previous = x
            }
            pattern.pattern = newPattern
            console.log('even applied')
            pattern.originalPattern = pattern.pattern
        }
    },
    periodic: {
        description: 'active beat on every Xth beat regardless of pattern length',
        method(pattern){
            let L = pattern.patternLength
            let t = pattern.activeBeats
            let absT = Math.abs(t)
            pattern.pattern = new Array(absT).fill(0)
            let index
            if (t>0) {
                index = (t%L)-1
                if (index < 0) {index = L-1}
                pattern.pattern[index] = 1
            } else if (t<0) {
                index = (L-(absT%L))
                pattern.pattern[0] = 1
            }
            console.log('periodic applied')
            pattern.originalPattern = pattern.pattern
        }
    },
    cyclic: {
        description: 'active beat on every Xth beat within the pattern length',
        method(pattern){
            pattern.pattern = new Array(pattern.patternLength).fill(0)
            let o = Math.abs(pattern.activeBeats)%pattern.patternLength
            if (o > 0){
                for (let cycle = o; cycle <= pattern.patternLength; cycle = cycle+o){
                    pattern.pattern[cycle-1] = 1
                }
            }
            if (pattern.activeBeats < 0) {pattern.pattern.reverse()}
            console.log('cyclic applied')
            pattern.originalPattern = pattern.pattern
        }
    },
    subdivision: {
        description: 'active beats are dispersed at a division of the pattern length (unlike even, remainder is ignored)',
        method(pattern){
            pattern.pattern = new Array(pattern.patternLength).fill(0)
            let o = Math.abs(pattern.activeBeats)%pattern.patternLength
            let division = (Math.round(pattern.patternLength / o))//use floor?
            for (let point = division; point < pattern.patternLength; point = point + division){
                pattern.pattern[point-1] = 1
            }
            if (pattern.activeBeats < 0) {pattern.pattern.reverse()}
            console.log('subdivision applied')
            pattern.originalPattern = pattern.pattern
        }
    },
    first: {
        description: 'active beats are distributed from left to right',
        method(pattern){
            let o = Math.abs(pattern.activeBeats)%pattern.patternLength
            pattern.pattern = new Array(o).fill(1)
            for (let zeds = 0; zeds < (pattern.patternLength - o); zeds++) {
                pattern.pattern.push(0)
            }
            if (pattern.activeBeats < 0) {pattern.pattern.reverse()}
            if (o===0) {pattern.pattern = new Array(pattern.patternLength).fill(1)}
            if (pattern.activeBeats===0) {pattern.pattern = new Array(pattern.patternLength).fill(0)}
            console.log('first applied')
            pattern.originalPattern = pattern.pattern
        }
    },
    last: {
        description: 'active beats are distributed from right to left',
        method(pattern){
            let o = Math.abs(pattern.activeBeats)%pattern.patternLength
            pattern.pattern = new Array(pattern.patternLength-o).fill(0)
            for (let peds = 0; peds < (o); peds++) {
                pattern.pattern.push(1)
            }
            if (pattern.activeBeats < 0) {pattern.pattern.reverse()}
            if (o===0) {pattern.pattern = new Array(pattern.patternLength).fill(1)}
            if (pattern.activeBeats===0) {pattern.pattern = new Array(pattern.patternLength).fill(0)}
            console.log('last applied')
            pattern.originalPattern = pattern.pattern
        }
    },
}
export default createPattern
