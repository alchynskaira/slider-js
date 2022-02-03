const pictures = [
    'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg'
];

const wrapper = document.getElementById("container");
renderSlides(pictures);

function renderSlides (pictures) {
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


    createButton(["right-btn", "fas", "fa-chevron-right"]);
    createButton(["left-btn", "fas", "fa-chevron-left"]);
}



function createButton (btnClass) {
    const button = document.createElement("button");
    const buttonWrapper = document.createElement("div");
    const icon = document.createElement("i");

    button.classList.add(...btnClass);
    button.appendChild(icon);
    buttonWrapper.classList.add("button-wrapper");
    buttonWrapper.append(button);
    wrapper.append(buttonWrapper);
}


 let positionInd = 1;


function switchSlides() {
    const slides = document.getElementsByClassName("image-item");
    const maxLength = slides.length;

    if (positionInd > maxLength) {

        positionInd = 1;

    } else if (positionInd < 1) {

        positionInd = maxLength;

    }


    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[positionInd -1].style.display = 'block';
}

document.querySelector( ".right-btn").addEventListener("click", function () {
    switchSlides(positionInd--)
});
document.querySelector(".left-btn").addEventListener("click", function (){
    switchSlides(positionInd--)
});






