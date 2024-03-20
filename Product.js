let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let cart = document.querySelector('.cart');
let list = document.querySelector('.list');
let cardList = document.querySelector('.cardList');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let totalPrice = document.querySelector('.totalPrice');
let itemCount = document.querySelector('.itemCount');
let userSection = document.querySelector('.user-info'); // Get the user information section

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
    userSection.style.display = 'block'; // Show the user information section
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
    userSection.style.display = 'none'; // Hide the user information section
})

let products = [
    {
        id: 1,
        name: 'Dosai',
        image: '1.PNG',
        price: 1200
    },
    {
        id: 2,
        name: 'Hydrabadi Buriyani',
        image: '2.PNG',
        price: 1200
    },
    {
        id: 3,
        name: 'Mughlai Chicken Masala',
        image: '3.PNG',
        price: 2200
    },
    {
        id: 4,
        name: 'North Indian Thali',
        image: '4.PNG',
        price: 1230
    },
    {
        id: 5,
        name: 'Filter Coffee',
        image: '5.PNG',
        price: 320
    },
    {
        id: 6,
        name: 'Almond Lassi',
        image: '6.PNG',
        price: 120
    }
];
let listCards  = [];
function displayProducts(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">Rs. ${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
    document.querySelector('#placeOrderButton').addEventListener('click', function() {
        if (Object.keys(listCards).length !== 0) {
            location.href = 'payments.html';
        }
    });     
}
displayProducts();
function addToCart(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;     
    }
    reloadCart();
    if (listCards.length >0) {
        document.querySelector('.submit-button').removeAttribute('disabled');
    }    
}
function reloadCart(){
    cardList.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="images/${value.image}"/></div>
                <div>${value.name}</div>
                <div>Rs. ${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                cardList.appendChild(newDiv);
        }
    })
    total.innerText = "Rs. " + totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCart();
}
function calculateTotalPrice() {
    let totalPrice = 0;
    Object.values(listCards).forEach((item) => {
        totalPrice += item.price;
    });
    return totalPrice;
}

// Event listener for the "Place Order" button
document.querySelector('#placeOrderButton').addEventListener('click', function() {
    if (Object.keys(listCards).length !== 0) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const totalPrice = calculateTotalPrice();
        const itemCount = Object.keys(listCards).length;
    

         // Construct the URL with parameters
        location.href =`payments.html?totalPrice=${totalPrice}&itemCount=${itemCount}&name=${name}&email=${email}`;
    }
});