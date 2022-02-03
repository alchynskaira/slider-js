const pictures = [
    'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg'
];

const wrapper = document.getElementById("container");


function showPictures (pictures) {
    const imgList = document.createElement('ul');
    imgList.classList.add("image-list")
    imgList.setAttribute("id", "image-list");
    wrapper.appendChild(imgList);

    pictures.map((item, index) => {
       let itemImg =  `<li class="image-item" data-index= ${index} style= "display: ${index === 0 ? 'block' : 'none' }">
                       <img class="slide-img" src= ${item} alt="image">
                       </li>`;

         imgList.innerHTML += itemImg;
    });


}
showPictures(pictures);

export const createButtonRight = () => {
    const buttonRight = document.createElement("button");
    buttonRight.classList.add("button", "right-btn");
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-chevron-right")
    buttonRight.appendChild(icon);
    wrapper.appendChild(buttonRight);
    return buttonRight;
}
createButtonRight();

export const createButtonLeft = () => {
    const buttonLeft = document.createElement("button");
    buttonLeft.classList.add("button", "left-btn");
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-chevron-left");
    buttonLeft.appendChild(icon);
    wrapper.appendChild(buttonLeft);
    return buttonLeft;
}
createButtonLeft();


 let positionInd = 1;

function plusSlides() {
    showSlides(positionInd++);
};

function minusSlides() {
    showSlides(positionInd--);
};


function showSlides() {
    const slides = document.getElementsByClassName("image-item");
    const maxLength = slides.length;

    if (positionInd > maxLength) {
        positionInd = 1;
    } else if (positionInd < 1) {
        positionInd = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[positionInd -1].style.display = 'block';
}

const btnRight = document.querySelector( ".right-btn");
const btnLeft = document.querySelector(".left-btn");

btnRight.addEventListener("click", plusSlides)
btnLeft.addEventListener("click", minusSlides)




