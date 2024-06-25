class SliderItem{
    constructor(imageSrc){
        this.imageSrc = imageSrc;
    }
    htmlElement(){
        let container = document.createElement('div')
        container.classList.add('slider-item')
        let image = document.createElement('img')
        image.src = `${this.imageSrc}`
        container.appendChild(image);
        
        return container;
    }
}

class Slider {
    constructor(sliderItems,menuContainer) {
        this.sliderIndex = 0;
        this.sliderItems = sliderItems;
        this.menuContainer = menuContainer;
        this.menuItems = [];
        this.#initMenu();
        this.play();
    }
    #move() {
        
        this.sliderItems.forEach(item => {
            item.style.transform = `translateX(-${(this.sliderIndex) * 100}%)`;
        });
    }
    #initMenu(){
        let l = this.sliderItems.length;
        for(let i = 0; i < l; i++)
        {
            let item = document.createElement('div')
            item.classList.add('menu-item')
            item.addEventListener('click',()=>{this.moveConcrete(i)})
            this.menuItems.push(item)
            this.menuContainer.appendChild(item)
            this.#updateMenu()
        }
    }
    #updateMenu(){
        this.menuItems.forEach(item =>{
            item.classList.remove('active')
        })
        this.menuItems[this.sliderIndex].classList.add('active')
    }
    moveNext() {
        this.sliderIndex++;
        if (this.sliderIndex == this.sliderItems.length) {
            this.sliderIndex = 0;
        }
        this.#move();
        this.#updateMenu();
    }
    movePrevious() {
        if (this.sliderIndex == 0) {
            return;
        }
        this.sliderIndex--;
        this.#move();
        this.#updateMenu();
    }
    moveConcrete(index) {
        this.sliderIndex = index;
        this.#move();
        this.#updateMenu();
    }
    play(){
        this.animation = setInterval(()=>{
            this.moveNext();
        },2000);
    }
    pause(){
        clearInterval(this.animation)
    }
}
// Init slider items.
const items = [
    new SliderItem("https://picsum.photos/id/242/1440/800"),
    new SliderItem("https://picsum.photos/id/347/1440/800"),
    new SliderItem("https://picsum.photos/id/533/1440/800"),
    new SliderItem("https://picsum.photos/id/633/1440/800"),
    new SliderItem("https://picsum.photos/id/366/1440/800")
]
const sliderItemsContainer = document.querySelector("#slider-items")
items.forEach(item => {
    sliderItemsContainer.appendChild(item.htmlElement())
}) 

// Slider
const sliderItems = document.querySelectorAll(".slider-item")
const menu = document.querySelector("#menu");
let slider = new Slider(sliderItems,menu)

// Move buttons
const moveNextButton = document.querySelector("#next");
const movePreviousButton = document.querySelector("#previous");
moveNextButton.addEventListener('click',()=>{ slider.moveNext()})
movePreviousButton.addEventListener('click',()=>{ slider.movePrevious()})

// Play and pause
const play = document.querySelector("#play")
play.classList.add('disable')
const pause = document.querySelector("#pause")

play.addEventListener('click',()=>{
    play.classList.toggle('disable')
    pause.classList.toggle('disable')
    slider.play()
})
pause.addEventListener('click',()=>{
    play.classList.toggle('disable')
    pause.classList.toggle('disable')
    slider.pause()
})