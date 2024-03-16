class Slider{
    sliderItems;
}
class SliderItem{
    sliderImage;
    sliderContentBox;

    constructor(sliderImage,sliderContentBox){
        this.sliderImage = sliderImage,
        this.sliderContentBox = sliderContentBox;
    }
    get htmlElement(){
        var element = document.createElement('div')
        element.classList.add('slider-item')
        element.appendChild(this.sliderImage.htmlElement)
        element.appendChild(this.sliderContentBox.htmlElement)
        return element;
    }
}
class SliderContentBox{
    title;
    textContent;
    htmlButton;
    constructor(title,textContent,htmlButton){
        this.title = title;
        this.textContent = textContent;
        this.htmlButton = htmlButton;
    }

    get htmlElement(){
        var element = document.createElement('div')
        element.classList.add('slider-content-box')
        var title = document.createElement('h2')
        title.innerText = this.title;
        var content = document.createElement('p')
        content.innerText = this.textContent;

        element.appendChild(title)
        element.appendChild(content)

        if(this.htmlButton !== null)
        {
            element.appendChild(this.htmlButton)
        }

        return element;
    }
}
class SliderImage
{
    contentUrl;
    alternateText;

    constructor(contentUrl,alternateText)
    {
        this.contentUrl = contentUrl;
        this.alternateText = alternateText;
    }

    get htmlElement(){
        var img = document.createElement('img');
        img.src = this.contentUrl;
        img.alt = this.alternateText;
        img.classList.add('slider-image')
        return img;
    }
} 
var silderItems = [
    new SliderItem(
        new SliderImage("https://picsum.photos/1200/400/?blur","welcome"),
        new SliderContentBox("Welcome Home","Welcome our site",null)
    ).htmlElement,
    new SliderItem(
        new SliderImage("https://picsum.photos/1200/400/?blur","welcome"),
        new SliderContentBox("Welcome Home","Welcome our site",null)
    ).htmlElement,
    new SliderItem(
        new SliderImage("https://picsum.photos/1200/400/?blur","welcome"),
        new SliderContentBox("Welcome Home","Welcome our site",null)
    ).htmlElement
]

var slider = document.querySelector('#slider')
var arrowLeft = document.querySelector('#arrow-left')
var arrowRight = document.querySelector('#arrow-right')

function initSlider(){
    let i = 0,
        l = silderItems.length;

    var current = silderItems[i % l]
    var previous = silderItems[(i+l-1)%l]
    var next = silderItems[(i+1)%l]

    slider.appendChild(previous)
    slider.appendChild(current)
    slider.appendChild(next)
}

initSlider()
