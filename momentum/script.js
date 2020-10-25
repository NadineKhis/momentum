// DOM Elements
const day = document.querySelector('.day'),
    time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus');

const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg',
    '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg',
    '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let todayBg = []

let randIndex = Math.floor(Math.random() * 21);
console.log(randIndex)
console.log(randIndex % images.length)

function todayList() {
    for (let i = 0; i < 6; i++) {
        todayBg.push(getImage('./momentum/assets/images/night/'))
    }
    for (let i = 0; i < 6; i++) {
        todayBg.push(getImage('./momentum/assets/images/morning/'))
    }
    for (let i = 0; i < 6; i++) {
        todayBg.push(getImage('./momentum/assets/images/day/'))
    }
    for (let i = 0; i < 6; i++) {
        todayBg.push(getImage('./momentum/assets/images/evening/'))
    }
}

todayList();

console.log(todayBg)

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
    const index = randIndex % images.length;
    const imageSrc = (base + images[index]).toString();
    console.log(imageSrc)
    randIndex++;
    return imageSrc
}

const btn = document.getElementById('nextBg_btn');
btn.addEventListener('click', nextImg);
let _today = new Date(),
    fakeHour = _today.getHours();

// Next Background Image Button
function nextImg() {
    if (fakeHour < 23) {
        fakeHour = fakeHour + 1
    } else {
        fakeHour = 0
    }
    viewBgImage(`${todayBg[fakeHour]}`);
}

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
        viewBgImage(`${todayBg[hour]}`)
        greeting.textContent = 'Good Night, ';
    } else if (hour < 12) {
        // Morning
        viewBgImage(`${todayBg[hour]}`)
        greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
        // Afternoon
        viewBgImage(`${todayBg[hour]}`)
        greeting.textContent = 'Good Afternoon, ';
    } else {
        // Evening
        viewBgImage(`${todayBg[hour]}`)
        greeting.textContent = 'Good Evening, ';
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
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
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

// CHANGE QUOTE
const blockquote = document.getElementById('blockquote');
const figcaption = document.getElementById('figcaption');
const quote_btn = document.getElementById('quote_btn');

async function getQuote() {
    const url = `https://programming-quotes-api.herokuapp.com/quotes`;
    const res = await fetch(url);
    const data = await res.json();
    let ind = Math.floor(Math.random() * 500)
    blockquote.textContent = data[ind].en;
    figcaption.textContent = data[ind].author;
}

// WEATHER WIDGET
const city = document.querySelector('.city');
const error = document.querySelector('.error-city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const wetness = document.querySelector('.wetness')


function getCity() {
    if (localStorage.getItem('city') === null) {
        city.textContent = 'Минск';
    } else {
        city.textContent = localStorage.getItem('city');
    }
}

function setCity(event) {
    if (localStorage.getItem('city') === null) {
        localStorage.setItem('city', event.target.innerText);
    }
    if (event.type === 'keypress') {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        localStorage.setItem('city', event.target.innerText)
        city.blur();
        getWeather();
        }
    } else if (event.type === 'click') {
        event.target.innerText = '';
    } else {
        if (event.target.innerText === '') {
            event.target.innerText = localStorage.getItem('city');
        }
        localStorage.setItem('city', event.target.innerText);
    }
}

async function getWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=7439863a453c1dcd15097731949f40a1&units=metric`;
        const res = await fetch(url);
        const data = await res.json()

        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${data.wind.speed} m/sec`;
        wetness.textContent = `Humidity: ${data.main.humidity}%`;

        error.innerText = '';
    } catch (e) {
        error.innerText = 'city is not found';
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('click', setCity);
city.addEventListener('blur', setCity)

document.addEventListener('DOMContentLoaded', getQuote);
quote_btn.addEventListener('click', getQuote);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', setFocus);

// Run
showDay();
showTime();
setBgGreet();
getCity();
getName();
getFocus();
getWeather()
