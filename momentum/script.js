// DOM Elements
const day = document.querySelector('.day'),
    time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus');


const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg',
    '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg',
    '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

let i = 0;

// let i = Math.floor(Math.random() * 21);

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}

function getImage(base) {
    const index = i % images.length;
    const imageSrc = base + images[index];
    viewBgImage(imageSrc);
    i++;
}

function refreshImg() {

}

const btn = document.querySelector('.btn');
btn.addEventListener('click', refreshImg);

// Options
// function generatorBg() {
//
//     let i = Math.floor(Math.random() * 21);
//     for () {}
// }

// Show Day
function showDay() {
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]

    let today = new Date(),
        dateDay = today.getDate(),
        dayOfTheWeek = weekday[today.getDay()],
        dayMonth = months[today.getMonth()];

    day.innerHTML = `${dayOfTheWeek}<span>, </span>${dayMonth} ${dateDay}`;
}

// Show Time
function showTime() {

    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
        sec
    )} `;

    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 6) {
        // Night
        document.body.style.backgroundImage =

            "url(./momentum/assets/images/night/01.jpg)";
        greeting.textContent = 'Good Night, ';
        document.body.style.color = 'white';
    } else if (hour < 12) {
        // Morning
        document.body.style.backgroundImage =
            "url(./momentum/assets/images/morning/01.jpg)";
        greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
        // Afternoon
        document.body.style.backgroundImage =
            "url(./momentum/assets/images/day/01.jpg)";
        greeting.textContent = 'Good Afternoon, ';
    } else {
        // Evening
        getImage("./assets/images/evening/");
        document.body.style.backgroundImage =
        "url(./momentum/assets/images/evening/01.jpg)";
        greeting.textContent = 'Good Evening, ';
        // document.body.style.color = 'white';
    }
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (localStorage.getItem('name') === null) {
        localStorage.setItem('name', e.target.innerText);
    }
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        // if (e.which === 13 || e.keyCode === 13) {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else if (e.type === 'click') {
        e.target.innerText = '';
    } else {
        if (e.target.innerText === '') {
            e.target.innerText = localStorage.getItem('name');
        }
        localStorage.setItem('name', e.target.innerText);
    }
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {
    if (localStorage.getItem('focus') === null) {
        localStorage.setItem('focus', e.target.innerText);
    }
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        // if (e.which === 13 || e.keyCode === 13) {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            localStorage.setItem('focus', e.target.innerText);
            name.blur();
        }
    } else if (e.type === 'click') {
        e.target.innerText = '';
    } else {
        if (e.target.innerText === '') {
            e.target.innerText = localStorage.getItem('focus');
        }
        localStorage.setItem('focus', e.target.innerText);
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', setName);


// Run
showDay();
showTime();
setBgGreet();
getName();
getFocus();