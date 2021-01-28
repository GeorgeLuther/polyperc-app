const alterPattern = {
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
            pattern.pattern = pattern.originalPattern.slice(n).concat(pattern.originalPattern.slice(0, n))
            console.log(`rotation ${pattern.rotation} applied`)
        }
    },
    opposite: {
        description: 'all active beats become inactive and vice versa',
        method(pattern){
            let temp =[]
            pattern.pattern.forEach(function(i){
                if (i===0) {
                    temp.push(1)
                } else {
                    temp.push(0)
                }
            })
            pattern.pattern = temp
        }
    }
}
export default alterPattern