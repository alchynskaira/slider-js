const pictures = [
    'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg'
];

const wrapper = document.getElementById("container");

 // wrapper.addEventListener('mousedown', handleTouchStart, false);
 // wrapper.addEventListener('mousemove', handleTouchMove, false);

// let clickX  = null;
//
// function  handleTouchStart(e){
//
//     clickX = e.clientX;
//     console.log(clickX)
// }
// function handleTouchMove (e){
//
//     console.log(clickX)
// if(!clickX){
//    return false;
// }
// let clickX2 = e.clientX;
// let xDifference = clickX2 - clickX;
// if(xDifference > 0) {
//     switchSlides(true);
// }
//     else {
//         switchSlides(false);
// }
// }
// clickX = null;



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
        let itemImg = `<div class="fade image-item ${index === 0 ? 'active' : ''}" data-img-index= "${index}" >
                       <img class="slide-img" src= "${item}" alt="image">
                       </div>`;

        imgList.innerHTML += itemImg;
        dotBox.innerHTML +=  createDot(index);

    });

    createButtonWrapper()
}



function createButtonWrapper() {
    const buttonWrapper = document.createElement("div");
    const sliderWrapper = document.querySelector(".slider");
    buttonWrapper.classList.add("button-wrapper");
    buttonWrapper.append(createButton(true, ["btn", "right-btn", "fas", "fa-chevron-right"]));
    buttonWrapper.append(createButton(false, ["btn", "left-btn", "fas", "fa-chevron-left"]));
    sliderWrapper.append(buttonWrapper);
}

function createButton(isRight, btnClass) {
    const button = document.createElement("button");
    button.setAttribute("onclick", "switchSlides("+ isRight +")")
    const icon = document.createElement("i");
    button.classList.add(...btnClass);
    button.appendChild(icon);
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

renderSlides(pictures);



// let isDrawing = false;
// let x = 1000;
const slides = document.getElementsByClassName('slider')[0];
const slides_1 = document.getElementsByClassName("image-list")[0];
console.log(slides_1)


// slides_1.addEventListener('mousedown', e => {
//     x = e.offsetX;
//     isDrawing = true;
//     console.log(x);
// });
//
// slides_1.addEventListener('mousemove', e => {
//     if (isDrawing === true) {
//         x = e.offsetX;
//         slides_1.style.transform = `translate(calc(1000px - ${x}px), 0)`;
//         console.log(x);
//     }
// });
//
// slides.addEventListener('mouseup', e => {
//     if (isDrawing === true) {
//         x = 0;
//         isDrawing = false;
//     }
// });

function slide (wrapper, items) {
    let posX1 = null;

    let posX2 = null;
    let posInitial;
    let posFinal;
    let slides = items.getElementsByClassName("image-item");
    let slidesLength = slides.length;
    let slidesSize = items.getElementsByClassName("image-item")[0].offsetWidth;

    let index = 0;
    let isDrawing = true;
    items.onmousedown = dragStart;
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);

    //items.addEventListener("transitionend", checkIndex);
    function  dragStart(e){
        e.preventDefault();
        posInitial = items.offsetLeft;
        console.log(posInitial)
        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction (e) {
        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
    }

    function dragEnd (e) {
        posFinal = items.offsetLeft;

        if (posFinal - posInitial < - slidesSize) {
            console.log('dragRight')
            // switchSlides(true);
        } else if (posFinal - posInitial > slidesSize) {
            console.log("dragLeft")
        } else {
            items.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }
    // function checkIndex (){
    //     items.classList.remove('shifting');
    //
    //     if (index == -1) {
    //         items.style.left = -(slidesLength * slidesSize) + "px";
    //         index = slidesLength - 1;
    //     }
    //
    //     if (index == slidesLength) {
    //         items.style.left = -(1 * slidesSize) + "px";
    //         index = 0;
    //     }
    //
    //     isDrawing = true;
    // }
}
slide(slides, slides_1)
