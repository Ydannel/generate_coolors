//locked or not the color

class Colour {
    constructor(hex, element){
        this.hex = hex
        this.element = element
        this.locked = false
    }
    setHex(hex){
        this.hex = hex
        this.element.style.backgroundColor = hex
        this.element.querySelector('.colour-input').value = hex
    }
    // add or remove class icon if is locked
    setlocked(Locked){
        this.locked = Locked

        if(Locked){
            this.element.classList.add('locked')
            this.element.querySelector('img').src='icons/lock-closed.svg'
        }
        else{ 
            this.element.classList.remove('locked')
            this.element.querySelector('img').src='icons/lock-open.svg'
         }
    }
    toggleLocked (){this.setlocked(!this.locked)}
    
    //generate colors (hex code)

    generateHex(){
        if (this.locked)return;

        const chars = '123456789ABCDEF'

        let hex ='#'
        for (let i = 0; i < 6; i++) {
                hex+= chars[Math.floor(Math.random() * 16)]
        }
        this.setHex(hex)
    }

    //copy the colors
    copyToClipboard(){
        const input = this.element.querySelector('.colour-input')
        input.select()
        document.execCommand('copy')
        input.blur()
        this.element.classList.add('copied')
        setTimeout(() => {
            this.element.classList.remove('copied')
        }, 1000);
    }
}

const colour_elements = document.querySelectorAll('.colours .colour')
const colours = []

for (let i = 0; i < colour_elements.length; i++) {
    const colour_element = colour_elements[i]
    const input = colour_element.querySelector('.colour-input')
    const lock_toggle = colour_element.querySelector('.lock-toggle')

    const copy_hex = colour_element.querySelector('.copy-hex')

    const hex = input.value

    //new class colour

    const colour = new Colour(hex, colour_element)

    input.addEventListener('input', () => colour.setHex(e.target.value))
    lock_toggle.addEventListener('click', () => colour.toggleLocked())
    copy_hex.addEventListener('click', () => colour.copyToClipboard())

    colour.generateHex()
    colours.push(colour)
}
// generate when you clicked
document.querySelector('.generator-button').addEventListener('click', () => {
    for (let i = 0; i < colours.length; i++) {
        colours[i].generateHex();
        
    }
})
//generate when you press [spacekey]
document.addEventListener('keypress', () => {
    if (e.code.toLowerCase() ==='space') {
        for (let i = 0; i < colours.length; i++) {
             colours[i].generateHex();
            
        }
    }
})