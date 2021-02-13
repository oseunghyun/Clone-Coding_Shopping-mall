// Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
        .then(response => response.json())
        .then(json => json.items);
}

// update the list with the given items
function displayItems(items) {
    const container = document.querySelector('.items');
    const html = items.map(item => createHTMLString(item));
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// create HTML list item from the given data
function createHTMLString(item) {
    return `
        <li class="item">
            <img src="${item.image}" alt="${item.type}" class="item__thumnail" />
            <span class="item__description">${item.gender}, ${item.size}</span>
        </li>
        `;
}

function onButtonClick(event, items) {
    console.log(event.target.dataset.key);
    console.log(event.target.dataset.value);
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if(key == null || value == null){
        return;
    }
    const filtered = items.filter(item => item[key] === value);
    displayItems(filtered);
    
}

/*
function onButtonClick(event, items) {
    const target = event.target;
    const key = target.dataset.key;
    const value = target.dataset.value;
    if(key == null || value == null){
        return; }
        updataItems(items, key, value);

function updataItems(items, key, value) {
    items.forEach(item => {
        if (item.dataset[key] === value) {
            item.classList.remove('invisible');
        } else {
            item.classList.add('invisible');
        }
        });
    }

*/

function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}



// main
loadItems() // JSON 에 있는 데이터를 동적으로 읽어올 함수
    .then(items => {
        displayItems(items);
        setEventListeners(items);
    })
    .catch(console.log)