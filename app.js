const addProduct = document.getElementById('addProduct');
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const productList = document.getElementById('productList');
const totalProductCount = document.getElementById('totalProductCount');
const totalPriceElement = document.getElementById('totalPrice');

let totalProducts = 0;
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateSummary();
});

function addProductfunc() {
    const productName = productNameInput.value.trim();
    const productPrice = parseFloat(productPriceInput.value.trim());

    if (productName && !isNaN(productPrice)) {
        createProductElement(productName, productPrice);
        productNameInput.value = '';
        productPriceInput.value = '';
        totalProducts++;
        totalPrice += productPrice;

        updateSummary();

        saveProducts();
    } else {
        alert('Zəhmət olmasa duzgun məlumat daxil edin');
    }
}

addProduct.addEventListener('click', addProductfunc);

function createProductElement(productName, productPrice) {
    const productItem = document.createElement('li');
    productItem.textContent = `${productName} - ${productPrice.toFixed(2)} AZN`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Sil';
    deleteButton.style.backgroundColor = 'red';
    deleteButton.style.color = 'white';

    deleteButton.addEventListener('click', function () {
        if (confirm('Məhsulu silmək istəyirsiz?')) {
            productList.removeChild(productItem);
            totalProducts--;
            totalPrice -= productPrice;

            updateSummary();
            saveProducts();
        }
    });

    productItem.appendChild(deleteButton);
    productItem.style.width = '100%'; 
    productItem.style.display = 'flex';
    productItem.style.justifyContent = 'space-between';
    productList.appendChild(productItem);
}

function updateSummary() {
    totalProductCount.textContent = `Ümumi məhsul sayı: ${totalProducts}`;
    totalPriceElement.textContent = `Məhsulların ümumi dəyəri: ${totalPrice.toFixed(2)} AZN`;
}

function saveProducts() {
    const products = [];
    const items = productList.querySelectorAll('li');
    items.forEach(item => {
        const [productText, priceText] = item.textContent.split(' - ');
        const price = parseFloat(priceText.replace(' AZN', ''));
        products.push({ name: productText, price: price });
    });
    localStorage.setItem('products', JSON.stringify(products));
}

function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => {
        createProductElement(product.name, product.price);
        totalProducts++;
        totalPrice += product.price;
    });
    updateSummary();
}
