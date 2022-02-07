const pictures = [
    'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg'
];

const wrapper = document.getElementById("container");


function renderSlides(pictures) {
    const imgList = document.createElement('ul');
    const dotBox = document.createElement("div");
    dotBox.classList.add("dots-wrapper");
    wrapper.append(dotBox);

    imgList.setAttribute("id", "image-list");
    wrapper.appendChild(imgList);

    pictures.map((item, index) => {
        let itemImg = `<li class="image-item ${index === 0 ? 'active' : ''}" data-index= "${index}" >
                       <img class="slide-img" src= "${item}" alt="image">
                       </li>`;

        imgList.innerHTML += itemImg;



        dotBox.innerHTML +=  createDot(index);

    });


    createButtonWrapper()
}

function createButtonWrapper() {
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");
    buttonWrapper.append(createButton(["btn", "right-btn", "fas", "fa-chevron-right"]));
    buttonWrapper.append(createButton(["btn", "left-btn", "fas", "fa-chevron-left"]));
    wrapper.append(buttonWrapper);
}

function createButton(btnClass) {
    const button = document.createElement("button");
    const icon = document.createElement("i");
    button.classList.add(...btnClass);
    button.appendChild(icon);
    return button;
}

function createDot(index) {
    let dot = `<div onclick="moveToSlide(event)" class="dot${index === 0 ? ' active' : ''}" data-dot-index="${index}">
                       </div>`;

    return dot;

}


function markDot(dot) {
    document.querySelector('.dot.active').classList.remove('active');
    dot.classList.add('active');
}

function switchSlides(right) {
    const currentSlide = document.querySelector(".image-item.active");
    const currentSlideIndex = currentSlide.getAttribute('data-index');
    let nextSlideIndex = right ? parseInt(currentSlideIndex) + 1 : parseInt(currentSlideIndex) - 1;

    const maxLength = pictures.length;

    if (nextSlideIndex > maxLength - 1) {
        nextSlideIndex = 0;
    } else if (nextSlideIndex < 0) {
        nextSlideIndex = maxLength - 1;
    }

    const nextSlide = document.querySelector("[data-index='" + nextSlideIndex + "']");
    currentSlide.classList.remove("active");
    nextSlide.classList.add('active');

    const dot = document.querySelector("[data-target='" + nextSlideIndex + "']");
    markDot(dot);
}

function moveToSlide(event) {
    const slides = document.getElementsByClassName("image-item");
    const currentSlide = document.querySelector(".image-item.active");
    currentSlide.classList.remove("active");
    slides[event.currentTarget.value].classList.add("active");
    markDot(event.currentTarget);
}



function addEventListenersToButtons () {
    document.querySelector(".right-btn").addEventListener("click", () => {
        switchSlides(true);
    });
    document.querySelector(".left-btn").addEventListener("click", () => {
        switchSlides(false)
    });
}
renderSlides(pictures);
addEventListenersToButtons()