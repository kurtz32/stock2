// Load items from localStorage on page load
window.onload = function() {
    displayItems();
};

document.getElementById('addItem').addEventListener('click', function() {
    const itemName = document.getElementById('itemName').value.trim();
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);

    if (itemName && itemQuantity > 0) {
        addItem(itemName, itemQuantity);
        document.getElementById('itemName').value = '';
        document.getElementById('itemQuantity').value = '';
    }
});

function addItem(name, quantity) {
    let items = JSON.parse(localStorage.getItem('items')) || [];

    const existingItemIndex = items.findIndex(item => item.name === name);
    if (existingItemIndex > -1) {
        items[existingItemIndex].quantity += quantity;
    } else {
        items.push({ name: name, quantity: quantity });
    }

    localStorage.setItem('items', JSON.stringify(items));
    displayItems();
}

function displayItems() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>
                <input type="number" min="1" class="quantityToGet" placeholder="Quantity to Minus" id="minus-${item.name}">
                <button class="btn" onclick="subtractItem('${item.name}')">GET</button>
            </td>
        `;
        itemList.appendChild(row);
    });
}

function subtractItem(name) {
    const quantityToGet = parseInt(document.getElementById(`get-${name}`).value);
    let items = JSON.parse(localStorage.getItem('items')) || [];
    const itemIndex = items.findIndex(item => item.name === name);

    if (itemIndex > -1 && quantityToGet > 0) {
        items[itemIndex].quantity -= quantityToGet;
        if (items[itemIndex].quantity <= 0) {
            items.splice(itemIndex, 1); // Remove item if quantity is 0 or less
        }
        localStorage.setItem('items', JSON.stringify(items));
        displayItems();
    }
}

function searchItem() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#itemList tr');

    rows.forEach(row => {
        const itemName = row.cells[0].textContent.toLowerCase();
        if (itemName.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}
