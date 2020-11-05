const backgroundImg = document.querySelector('#main-section');
const trapezoid1 = document.querySelector('#trapezoid1');
const trapezoid2 = document.querySelector('#trapezoid2');
const feedbackContent = document.querySelector('#feedback-content');
const sIItem = document.querySelector('.si-item');


let list = carousel.querySelector('ul');
let listElems = carousel.querySelectorAll('li');
let currentElem = null;
let i = 1;
let q = 0;
let width = 130; // ширина картинки
let count = 6; // видимое количество изображений
let position = 0; // положение ленты прокрутки


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


function plus() {
    if(q<2){
        q++;
    }
    backgroundChange();
};


function minus() {
    if(q>0){
        q--;
    }
    backgroundChange();
};


function backgroundChange() {
    switch(q) {
        case 0:  
            backgroundImg.style.backgroundImage = 'url(img/3940649684099510_3232.png)';
            trapezoid1.style.visibility = 'visible';
            trapezoid2.style.visibility = 'visible';
            break;

        case 1:
            backgroundImg.style.backgroundImage = 'url(img/57ebbe2b19bae@2x.png)';
            trapezoid1.style.visibility = 'hidden';
            trapezoid2.style.visibility = 'hidden';
            break;

        case 2:
            backgroundImg.style.backgroundImage = 'url(img/009-1-231116.png)';
            trapezoid1.style.visibility = 'hidden';
            trapezoid2.style.visibility = 'hidden';
            break;
        default:
        break;
    }
};