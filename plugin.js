const pictures = [
    'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg'
];

const wrapper = document.getElementById("slider-plugin");
let direction;
let startPosition = 0;
let slides;


(function() {
     function  SliderPlugin (selector, options) {
             this.arrows= true,
             this.dots= true,
                 this.settings = { ...options };
         console.log(this.settings)
             this.settings.selector = selector


       this.init();
    }



    SliderPlugin.prototype.renderSlides = function (pictures) {
        const slider = document.createElement("div");
        const imgList = document.createElement('div');
        const dotBox = document.createElement("div");

        slider.classList.add("slider");
        imgList.classList.add("image-list")
        dotBox.classList.add("dots-wrapper");
        imgList.setAttribute("id", "image-list");
        wrapper.append(slider);
        slider.appendChild(imgList);
        slider.append(dotBox);

        pictures.map((item, index) => {
            let itemImg = `<span class="fade image-item ${index === 0 ? 'active' : ''}" data-img-index= "${index}" >
                       <img class="slide-img"  src= "${item}" alt="image">
                       </span>`;

            imgList.innerHTML += itemImg;
            if(this.dots === this.settings.dots){
                dotBox.innerHTML +=  this.createDot(index);
            } else return;

        });
        this.addEventToDots()
        this.createButtonWrapper()
    }
    SliderPlugin.prototype.createButtonWrapper = function () {
            const buttonWrapper = document.createElement("div");
            const sliderWrapper = document.querySelector(".slider");
            buttonWrapper.classList.add("button-wrapper");
            if(this.arrows === this.settings.arrows) {
                buttonWrapper.append(this.createButton(true, ["btn", "right-btn"]));
                buttonWrapper.append(this.createButton(false, ["btn", "left-btn"]));
            } else return;
            sliderWrapper.append(buttonWrapper);

            buttonWrapper.querySelector(".right-btn").addEventListener("click", () => this.switchSlides(true));
            buttonWrapper.querySelector(".left-btn").addEventListener("click", () => this.switchSlides(false));

    }

    SliderPlugin.prototype.createButton = function (isRight, btnClass) {
            const button = document.createElement("button");
            button.classList.add(...btnClass);
            return button;
    }

    SliderPlugin.prototype.createDot = function (index) {
            return `<div  class="dot${index === 0 ? ' active' : ''}" data-dot-index="${index}"></div>`;
    }

    SliderPlugin.prototype.addEventToDots = function () {
        const dots = document.getElementsByClassName('dot');
        for (let dot of dots) {
            dot.addEventListener("click", () => this.moveToSlide(dot));
        }
    }

    SliderPlugin.prototype.markDot = function (id) {
            document.querySelector('.dot.active').classList.remove('active');
            document.querySelector("[data-dot-index='" + id + "']").classList.add('active');
    }

    SliderPlugin.prototype.switchSlides = function (right) {
            const currentSlide = document.querySelector(".image-item.active");
            const currentSlideIndex = currentSlide.getAttribute('data-img-index');
            const maxLength = pictures.length;
            let nextSlideIndex = right ? parseInt(currentSlideIndex) + 1 : parseInt(currentSlideIndex) - 1;

            if (nextSlideIndex > maxLength - 1) {
                nextSlideIndex = 0;
            } else if (nextSlideIndex < 0) {
                nextSlideIndex = maxLength - 1;
            }

            currentSlide.classList.remove("active");
            document.querySelector("[data-img-index='" + nextSlideIndex + "']").classList.add('active');

            this.markDot(nextSlideIndex);
        }

    SliderPlugin.prototype.moveToSlide = function (dot) {
            const slide = document.querySelector(".image-item.active");
            slide.classList.remove("active");
            const currentSlide = document.querySelector("[data-img-index='" + dot.dataset.dotIndex + "']");
            currentSlide.classList.add("active")
            this.markDot(dot.dataset.dotIndex);
    }

    SliderPlugin.prototype.addListenersDrag = function () {
            slides = document.getElementById("image-list");
            slides.onmousedown = dragStart;
            slides.addEventListener('touchstart', dragStart);
            slides.addEventListener('touchend', dragEnd);
            slides.addEventListener('touchmove', dragAction);
        }

    const dragStart =  (e) => {
        console.log(e)
            e.preventDefault();

            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;

    }

    const dragAction =  (e) => {
            if (e.pageX < startPosition) {
                direction = "left";
            } else if (e.pageX > startPosition) {
                direction = "right";
            }
            startPosition = e.pageX;
    }

    const dragEnd =  () => {
            if (direction === 'right') {
                SliderPlugin.prototype.switchSlides(false)
            } else {
                SliderPlugin.prototype.switchSlides(true)
            }

            document.onmouseup = null;
            document.onmousemove = null;
    }


    SliderPlugin.prototype.init = function () {

       this.renderSlides(pictures);
       this.addListenersDrag();
    }

    SliderPlugin.defaults = {
            arrows: true,
            dots: true,
    };

    window.SliderPlugin = SliderPlugin;
}())


// new SliderPlugin({
//     pictures: pictures,
//     arrows: true,
//     dots: true,
// })

