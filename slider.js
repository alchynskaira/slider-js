const pictures = [
    'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg'
];

const wrapper = document.getElementById("container");
const rightIcon = "./icons/arrow-right.svg";
const leftIcon = "./icons/arrow-left.svg";
let direction;
let startPosition = 0;
let slides;



function renderSlides(pictures) {
    const slider = document.createElement("div");
    slider.classList.add("slider");
    wrapper.append(slider);
    const imgList = document.createElement('div');
    imgList.classList.add("image-list")
    const dotBox = document.createElement("div");
    dotBox.classList.add("dots-wrapper");
    imgList.setAttribute("id", "image-list");
    slider.appendChild(imgList);
    slider.append(dotBox);

    pictures.map((item, index) => {
        let itemImg = `<span class="fade image-item ${index === 0 ? 'active' : ''}" data-img-index= "${index}" >
                       <img class="slide-img" fade src= "${item}" alt="image">
                       </span>`;

        imgList.innerHTML += itemImg;
        dotBox.innerHTML +=  createDot(index);

    });

    createButtonWrapper()
}


function createButtonWrapper() {
    const buttonWrapper = document.createElement("div");
    const sliderWrapper = document.querySelector(".slider");
    buttonWrapper.classList.add("button-wrapper");
    buttonWrapper.append(createButton(true, ["btn", "right-btn"]));
    buttonWrapper.append(createButton(false, ["btn", "left-btn"]));
    sliderWrapper.append(buttonWrapper);
}

function createButton(isRight, btnClass) {
    const button = document.createElement("button");
    button.setAttribute("onclick", "switchSlides("+ isRight +")")
    button.classList.add(...btnClass);
    return button;
}



function createDot(index) {
    return `<div onclick="moveToSlide(event)" class="dot${index === 0 ? ' active' : ''}" data-dot-index="${index}">
                       </div>`;

}


function markDot(id) {
    document.querySelector('.dot.active').classList.remove('active');
    document.querySelector("[data-dot-index='" + id + "']").classList.add('active');

}

function switchSlides(right) {
    const currentSlide = document.querySelector(".image-item.active");
    const currentSlideIndex = currentSlide.getAttribute('data-img-index');
    let nextSlideIndex = right ? parseInt(currentSlideIndex) + 1 : parseInt(currentSlideIndex) - 1;

    const maxLength = pictures.length;

    if (nextSlideIndex > maxLength - 1) {
        nextSlideIndex = 0;
    } else if (nextSlideIndex < 0) {
        nextSlideIndex = maxLength - 1;
    }

    currentSlide.classList.remove("active");
    document.querySelector("[data-img-index='" + nextSlideIndex + "']").classList.add('active');

    markDot(nextSlideIndex);
}

function moveToSlide(event) {
    document.querySelector(".image-item.active").classList.remove("active");
    document.querySelector("[data-img-index='" + event.target.dataset?.dotIndex + "']").classList.add("active");

    markDot(event.target.dataset?.dotIndex);
}

function addListenersDrag () {
    slides = document.getElementById("image-list");
    slides.onmousedown = dragStart;
    slides.addEventListener('touchstart', dragStart);
    slides.addEventListener('touchend', dragEnd);
    slides.addEventListener('touchmove', dragAction);
}

function  dragStart(e){
    e.preventDefault();
    document.onmouseup = dragEnd;
    document.onmousemove = dragAction;
}

function dragAction (e) {
    if (e.pageX < startPosition) {
        direction = "left";
    } else if (e.pageX > startPosition) {
        direction = "right";
    }
    startPosition = e.pageX;
}

function dragEnd (e) {
    if (direction === 'right') {
        switchSlides(false);
    } else {
        switchSlides(true);
    }

    document.onmouseup = null;
    document.onmousemove = null;
}
renderSlides(pictures);
addListenersDrag()



