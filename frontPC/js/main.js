const iconVk = document.querySelector('.vk');
const iconInst = document.querySelector('.inst');
const backgroundImg = document.querySelector('#main-section');
const trapezoid1 = document.querySelector('#trapezoid1');
const trapezoid2 = document.querySelector('#trapezoid2');
const feedbackContent = document.querySelector('#feedback-content');
const sIItem = document.querySelector('.si-item');
const stButton = document.querySelector('#st-button');
const sliderImage = document.querySelector('#slider-image');
const sliderNum = document.querySelector('#slider-num');
const control = document.querySelector('#control');
const carousel = document.querySelector('#carousel');
const prevPartners = carousel.querySelector('.prev');
const nextPartners = carousel.querySelector('.next');
const list = carousel.querySelector('ul');
const listElems = carousel.querySelectorAll('li');
const gallery = document.querySelector('.gallery');
const prevShare = document.querySelector('.prev-share');
const nextShare = document.querySelector('.next-share');
const shares = document.querySelector('.shares');
const lengthShare = shares.querySelectorAll('li').length;
const capsule = document.querySelector('.capsule');


let currentElem = null;
let numOfSlide = 1; // номер нынешенго слайда на первом блоке
let position = 0; // положение ленты прокрутки в партнерах
let classActive = null;
let positionShare = 0; // положение ленты прокрутки в акциях
let lastShareElOnDisplay = 4; // номер крайне правого элемента 


const countElem = 6; // видимое количество изображений
const arrayClassActive = [];
const widthOfGallery = gallery.clientWidth;


const carouselOfPartners = (count = 6) => {
    const arr = [];
    listElems.forEach((el) => arr.push(el));
    while (arr != 0) {
        let width = 0;
        let countItem = arr.splice(0, count);
        countItem.forEach((el) => {
            width += el.clientWidth;
            width += 74;
        });

        let padLeftAndRight = ((widthOfGallery - width) / 2) + 37;
        countItem[0].style.marginLeft = padLeftAndRight + 'px';
        countItem[countItem.length - 1].style.marginRight = padLeftAndRight + 'px';
    }
}

const imageShow = () => {
    let arr = []
    let items = document.querySelectorAll('.si-item')
    items.forEach(item => arr.push(item));
    let active = arr[numOfSlide - 2];
    active.classList.add('active');
    arrayClassActive.push(active);
}

const sliderNumSpan = () => {
    if (sliderNum.firstElementChild !== null) {
        sliderNum.firstElementChild.remove()
    }
    let text = `0${numOfSlide} / 06`;
    let span = document.createElement('span');
    span.append(text);
    sliderNum.append(span);
}

stButton.addEventListener('mouseover', () => {
    stButton.style.backgroundColor = '#fff';
    stButton.querySelector('span').style.color = 'red';
})

stButton.addEventListener('mouseout', () => {
    stButton.style.backgroundColor = '';
    stButton.querySelector('span').style.color = '';
})
// наложение картинок 1 блок
sliderImage.addEventListener('click', (e) => {
    let target = e.target.closest('.si-item');
    if (!target) return;
    if (!e.target.classList.contains('one')) return;

    numOfSlide += 1
    classActive = e.target;
    arrayClassActive.push(classActive);
    classActive.classList.add('active');
    classActive.style.zIndex = -100 + numOfSlide;

    sliderNumSpan();
})
// управление 1 блок
control.addEventListener('click', (e) => {
    let target = e.target.closest('a');
    if (!target) return;

    if (target.id == 'prevEl' && numOfSlide > 1) {
        let item = arrayClassActive.pop();
        item.classList.remove('active')
        numOfSlide -= 1;
    }

    if (target.id == 'nextEl' && numOfSlide < 6) numOfSlide += 1;

    sliderNumSpan();
    imageShow();
})
// сдвиг вправо
nextShare.addEventListener('click', () => {
    if (lastShareElOnDisplay == lengthShare) return;
    lastShareElOnDisplay += 1;
    positionShare -= 295;
    shares.style.marginLeft = positionShare + 'px';
})
// сдвиг влево
prevShare.addEventListener('click', () => {
    if (lastShareElOnDisplay == 4) return;
    lastShareElOnDisplay -= 1;
    positionShare += 295;
    shares.style.marginLeft = positionShare + 'px';
})
// сдвиг влево
prevPartners.addEventListener('click', () => {
    position += widthOfGallery;
    position = Math.min(position, 0)
    list.style.marginLeft = position + 'px';
})
// сдвиг вправо
nextPartners.addEventListener('click', () => {
    if (list.style.marginLeft === `${(-widthOfGallery * Math.floor(listElems.length / countElem))}px`) return;
    position -= widthOfGallery;
    list.style.marginLeft = position + 'px';
})
// наведение
feedbackContent.addEventListener('mouseover', (event) => {
    if (currentElem) return;
    let target = event.target.closest('.fc-item');
    if (!target) return;
    if (!feedbackContent.contains(target)) return;

    currentElem = target;
    target.style.background = 'pink';
    target.style.position = 'relative'
    target.style.bottom = '5px'
    target.style.boxShadow = '9px 20px 10px rgba(0,0,0,0.5)';
})
// отпуск 
feedbackContent.addEventListener('mouseout', (event) => {
    if (!currentElem) return;
    let relatedTarget = event.relatedTarget;
    while (relatedTarget) {
        if (relatedTarget == currentElem) return;
        relatedTarget = relatedTarget.parentNode;
    }

    currentElem.style.background = '';
    currentElem.style.position = '';
    currentElem.style.bottom = '';
    currentElem.style.boxShadow = '';
    currentElem = null;
})
// наведение
capsule.addEventListener('mouseover', () => {
    capsule.style.backgroundColor = 'red';
    capsule.querySelector('p').style.color = 'white';
})
// отпуск
capsule.addEventListener('mouseout', () => {
    capsule.style.backgroundColor = '';
    capsule.querySelector('p').style.color = '';
})

iconVk.addEventListener('mouseover', () => {
    iconVk.style.backgroundColor = '#c51d38';
})

iconVk.addEventListener('mouseout', () => {
    iconVk.style.backgroundColor = '';
})

iconInst.addEventListener('mouseover', () => {
    iconInst.style.backgroundColor = '#c51d38';
})

iconInst.addEventListener('mouseout', () => {
    iconInst.style.backgroundColor = '';
})


const init = () => {
    sliderNumSpan();
    setTimeout(() => carouselOfPartners(countElem), 0);
}
init();