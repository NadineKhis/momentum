// DOM Elements
const day = document.querySelector('.day'),
    time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus');

// Options


// Show Day and Time
function showTime() {
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"]

    let today = new Date(),
        dayOfTheWeek = weekday[today.getDay()],
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    // Output Time
    day.innerHTML = `${dayOfTheWeek}`
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
            "url(./assets/images/night/01.jpg)";
        greeting.textContent = 'Good Night, ';
        document.body.style.color = 'white';
    }else if (hour < 12) {
        // Morning
        document.body.style.backgroundImage =
            "url(./assets/images/morning/01.jpg)";
        greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
        // Afternoon
        document.body.style.backgroundImage =
            "url(./assets/images/day/01.jpg)";
        greeting.textContent = 'Good Afternoon, ';
    } else  {
        // Evening
        document.body.style.backgroundImage =
            "url(./assets/images/evening/01.jpg)";
        greeting.textContent = 'Good Evening, ';
        document.body.style.color = 'white';
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
        if (e.which === 13 || e.keyCode === 13) {
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
        if (e.which === 13 || e.keyCode === 13) {
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
showTime();
setBgGreet();
getName();
getFocus();