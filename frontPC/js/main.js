const backgroundImg = document.querySelector('#main-section');
const trapezoid1 = document.querySelector('#trapezoid1');
const trapezoid2 = document.querySelector('#trapezoid2');
const feedbackContent = document.querySelector('#feedback-content');
const sIItem = document.querySelector('.si-item');
const sliderImage = document.querySelector('#slider-image');
const sliderNum = document.querySelector('#slider-num');
const control = document.querySelector('#control');


let list = carousel.querySelector('ul');
let listElems = carousel.querySelectorAll('li');
let currentElem = null;
let i = 1;
let numOfSlide = 1;
let width = 130; // ширина картинки
let count = 6; // видимое количество изображений
let position = 0; // положение ленты прокрутки
let classActive = null;
let arrayClassActive = [];


for (let li of carousel.querySelectorAll('li')) {
    li.style.position = 'relative';
    li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
    i++;
}

/* конфигурация */
carousel.querySelector('.prev').onclick = function () {
    // сдвиг влево
    position += width * count;
    // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
    position = Math.min(position, 0)
    list.style.marginLeft = position + 'px';
};

carousel.querySelector('.next').onclick = function () {
    // сдвиг вправо
    position -= width * count;
    // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
    position = Math.max(position, -width * (listElems.length - count));
    list.style.marginLeft = position + 'px';
};

feedbackContent.onmouseover = function (event) {
    if (currentElem) return;
    let target = event.target.closest('.fc-item');
    if (!target) return;
    if (!feedbackContent.contains(target)) return;

    currentElem = target;
    target.style.background = 'pink';
    target.style.position = 'relative'
    target.style.bottom = '5px'
    target.style.boxShadow = '9px 20px 10px rgba(0,0,0,0.5)';
};

feedbackContent.onmouseout = function (event) {
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
};

function imageShow() {
    let arr = []
    let items = document.querySelectorAll('.si-item')
    items.forEach(item => arr.push(item));
    let active = arr[numOfSlide - 2];
    active.classList.add('active');
    arrayClassActive.push(active);
}

function sliderNumSpan() {
    if (sliderNum.firstElementChild !== null) {
        sliderNum.firstElementChild.remove()
    }
    let text = `0${numOfSlide} / 06`;
    let span = document.createElement('span');
    span.append(text);
    sliderNum.append(span);
}

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


sliderNumSpan();