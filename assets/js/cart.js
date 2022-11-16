let carts = document.querySelectorAll(".shop-item-button");

let products = [
    {
        name: "Gye Nyame T-shirt Design",
        tag: 'gyenyametshirtdesign',
        price: 18.25,
        inCart: 0
    },
    {
        name: "Gye Nyame Cap Design",
        tag: 'gyenyamecapdesign',
        price: 16.75,
        inCart: 0
    },
    {
        name: "Gye Nyame Shirt Design",
        tag: 'gyenyameshirtdesign',
        price: 22.50,
        inCart: 0
    },
    {
        name: "Gye Nyame Cup Design",
        tag: 'gyenyamecupdesign',
        price: 9.60,
        inCart: 0
    },
    {
        name: "Gye Nyame Cap Design",
        tag: 'gyenyamecapdesigns',
        price: 18.25,
        inCart: 0
    },
    {
        name: "Gye Nyame Cards",
        tag: 'gyenyamecards',
        price: 22.50,
        inCart: 0
    }
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i])
  });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {    
    let productNumbers = localStorage.getItem('cartNumbers');
     
    productNumbers = parseInt(productNumbers);
    
    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', + 1);
        document.querySelector('.cart span').textContent = 1; 
    }   
    
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                 [product.tag]: product
            }
    }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;    
        cartItems = {
            [product.tag]: product
        }
    }    
    localStorage.setItem("productsInCart", JSON.stringify (cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }   
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                 <ion-icon name="close-circle"></ion-icon>
                 <img src="assets/js/images/${item.tag}.jpg">                 
                 
                 <span>${item.name}</span>  
            </div>
            <div class="price">$${item.price}</div>
            <div class="quantity">
                <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
            </div>
            <div class= "total">
                $${item.inCart * item.price}
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="subTotalContainer">
                <h4 class="subTotalTitle">
                    Subtotal:
                </h4>
                <h4 class="subTotal">
                    $${cartCost}
                </h4>
        `;
    }    
} 
/* <img src="assets/js/images/gyenyamecupdesign.jpg">
<img src="./images/${item.tag}.jpg"> */
onLoadCartNumbers();
displayCart();