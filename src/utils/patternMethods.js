const patternMethods = {
    pulse: {
        description: 'every beat is active (this is the only method that ignores active beats)',
        method(pattern){
            pattern.pattern = new Array(pattern.pattern_length).fill(1)
            console.log('pulse applied')
            pattern.original_pattern = pattern.pattern
        }
    },
    beat: {
        description: 'active beat occurs on specified beat (allows negative numbers)',
        method(pattern){
            pattern.pattern = new Array(pattern.pattern_length).fill(0)
            let L = pattern.pattern_length
            let t = pattern.active_beats
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
            pattern.original_pattern = pattern.pattern
        }
    },
    random: {
        description: 'active beats are dispersed randomly throughout the pattern (allows negative numbers)',
        method(pattern){
            pattern.pattern = new Array(pattern.pattern_length).fill(0)
            let L = pattern.pattern_length
            let t = pattern.active_beats
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
            console.log('random applied')
            pattern.original_pattern = pattern.pattern
        }
    },
    even: {
        description: 'active beats are dispersed as evenly as possible throughout the pattern (euclidean/bresenham)',
        method(pattern){
            let previous = null
            let newPattern = []
            //bresenham dispersion
            for (let i = 0; i < pattern.pattern_length; i++) {
                let x = Math.floor((pattern.active_beats  / pattern.pattern_length) * i)
                newPattern.push(x === previous ? 0 : 1)
                previous = x
            }
            pattern.pattern = newPattern
            console.log('even applied')
            pattern.original_pattern = pattern.pattern
        }
    },
    periodic: {
        description: 'active beat on every Xth beat regardless of pattern length',
        method(pattern){
            let L = pattern.pattern_length
            let t = pattern.active_beats
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
            pattern.original_pattern = pattern.pattern
        }
    },
    cyclic: {
        description: 'active beat on every Xth beat within the pattern length',
        method(pattern){
            pattern.pattern = new Array(pattern.pattern_length).fill(0)
            let o = Math.abs(pattern.active_beats)%pattern.pattern_length
            if (o > 0){
                for (let cycle = o; cycle <= pattern.pattern_length; cycle = cycle+o){
                    pattern.pattern[cycle-1] = 1
                }
            }
            if (pattern.active_beats < 0) {pattern.pattern.reverse()}
            console.log('cyclic applied')
            pattern.original_pattern = pattern.pattern
        }
    },
    subdivision: {
        description: 'active beats are dispersed at a division of the pattern length (unlike even, remainder is ignored)',
        method(pattern){
            pattern.pattern = new Array(pattern.pattern_length).fill(0)
            let o = Math.abs(pattern.active_beats)%pattern.pattern_length
            let division = (Math.round(pattern.pattern_length / o))//use floor?
            for (let point = division; point < pattern.pattern_length; point = point + division){
                pattern.bar[point-1] = 1
            }
            if (pattern.active_beats < 0) {pattern.pattern.reverse()}
            console.log('subdivision applied')
            pattern.original_pattern = pattern.pattern
        }
    },
    first: {
        description: 'active beats are distributed from left to right',
        method(pattern){
            let o = Math.abs(pattern.active_beats)%pattern.pattern_length
            pattern.pattern = new Array(o).fill(1)
            for (let zeds = 0; zeds < (pattern.pattern_length - o); zeds++) {
                pattern.pattern.push(0)
            }
            if (pattern.active_beats < 0) {pattern.pattern.reverse()}
            if (o===0) {pattern.pattern = new Array(pattern.pattern_length).fill(1)}
            if (pattern.active_beats===0) {pattern.pattern = new Array(pattern.pattern_length).fill(0)}
            console.log('first applied')
            pattern.original_pattern = pattern.pattern
        }
    },
    last: {
        description: 'active beats are distributed from right to left',
        method(pattern){
            let o = Math.abs(pattern.active_beats)%pattern.pattern_length
            pattern.pattern = new Array(pattern.pattern_length-o).fill(0)
            for (let peds = 0; peds < (o); peds++) {
                pattern.pattern.push(1)
            }
            if (pattern.active_beats < 0) {pattern.pattern.reverse()}
            if (o===0) {pattern.pattern = new Array(pattern.pattern_length).fill(1)}
            if (pattern.active_beats===0) {pattern.pattern = new Array(pattern.pattern_length).fill(0)}
            console.log('last applied')
            pattern.original_pattern = pattern.pattern
        }
    },
    reverse: {
        description: 'the existing pattern is flipped to its mirror image',
        method(pattern){
            pattern.pattern.reverse()
        }
    },
    rotation: {
        description: 'the existing bar is rotated by X beats (accepts negative numbers)',
        method(pattern){
            let L = pattern.pattern.length
            let k = pattern.rotation
            let absK = Math.abs(k)
            let n;
            if (k>=0) {
                n = L-(k%L)
            } else {
            n = absK%L
            }
            pattern.pattern = pattern.original_pattern.slice(n).concat(pattern.original_pattern.slice(0, n))
            console.log(`rotation ${pattern.rotation} applied`)
        }
    },
    opposite: {
        description: 'all active beats become inactive and vice versa',
        method(pattern){
            let temp =[]
            pattern.bar.forEach(function(i){
                if (i===0) {
                    temp.push(1)
                } else {
                    temp.push(0)
                }
            })
            pattern.bar = temp
        }
    }
}

export default patternMethods