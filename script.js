let menuItems = [];
let order = [];

async function loadMenu() {
    const response = await fetch('menu.json');
    menuItems = await response.json();
    displayMenu();
}

function displayMenu() {
    const menu = document.getElementById('menu');
    menu.innerHTML = '';
    menuItems.forEach(item => {
        menu.innerHTML += `
        <div class="col-md-3 mb-3">
            <div class="card p-3" onclick="addItem(${item.id})">
                <h5>${item.name}</h5>
                <p>$${item.price.toFixed(2)}</p>
            </div>
        </div>`;
    });
}

function addItem(id) {
    const item = menuItems.find(i => i.id === id);
    order.push(item);
    updateOrder();
}

function removeItem(index) {
    order.splice(index, 1);
    updateOrder();
}

function updateOrder() {
    const orderList = document.getElementById('order-list');
    const totalElement = document.getElementById('total');
    orderList.innerHTML = '';
    
    let total = 0;
    order.forEach((item, index) => {
        total += item.price;
        orderList.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            ${item.name} - $${item.price.toFixed(2)}
            <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</button>
        </li>`;
    });

    totalElement.textContent = total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', loadMenu);

