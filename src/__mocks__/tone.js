export const Volume = jest.fn().mockImplementation(()=>{
    return {
        toDestination: jest.fn()
    }
})

export function loaded(){
    return new Promise(() => {})
}

export const Transport = jest.fn()

export const Sampler = jest.fn()

export const Solo = jest.fn()

export const Loop = jest.fn()


