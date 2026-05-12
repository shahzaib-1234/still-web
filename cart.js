
const productList=[
    {
        id:1,
        name:'Stoneware Mug',
        price:'$28',
        img:'https://picsum.photos/seed/mug/600/750',
        
        },
        
    {   
        id:2,
        name:'Linen Apron',
        price:'$64',
        img:'https://picsum.photos/seed/apron/600/750',
        
      },
        
    {   
        id:3,
        name:'Olive Wood Board',
        price:'$42',
        img:'https://picsum.photos/seed/board/600/750'
    },
    {
        id:4,
        name:'Brass Candle Holder',
        price:'$36', 
        img:'https://picsum.photos/seed/candle/600/750'},
    {
        id:5,
        name:'Wool Throw Blanket',
        price:'$118',
        img:'https://picsum.photos/seed/throw/600/750'},
    {
        id:6,
        name:'Ceramic Vase',
        price:'$54',
        img:'https://picsum.photos/seed/vase/600/750',
    },
    {
        id:7,
        name:'Brass Woood',
        price:'$66',
        img:'https://picsum.photos/seed/vase/600/750'

    }
];


const searchId = new URLSearchParams(window.location.search);
const productId = Number(searchId.get("id"));

const product = productList.find(p => p.id === productId);
const container = document.querySelector('.product-detail');


if (product && container) {
  container.innerHTML = `
    <img src="${product.img}" alt="Product image" />

    <div class="info">
      <h1>${product.name}</h1>

      <div class="price-large">${product.price}</div>
      <p class="description" data-product-description>
          Hand-thrown by a small studio in Lisbon. Each piece carries the
          subtle marks of its maker — slight variations in glaze and form
          are intentional.
        </p>

      <div class="qty-row">
          <label for="qty">${product.quantity}</label>
          <input type="number" id="qty" class="qty-input"
                 value="1" min="1" max="99" data-qty-input />
        </div>


      <button class="btn btn-accent btn-block add-to-cart">
        Add to cart
      </button>
    </div>
  `;
  
  }

const button = document.querySelector(".add-to-cart");

if (button) {
  button.addEventListener("click", function () {

    const qty = Number(document.getElementById("qty").value);

   
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

   
    let existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({
        id: product.id,
        quantity: qty,
        price: Number(product.price.replace("$", "")),
        name: product.name,
        img: product.img
      });
    }

    
    localStorage.setItem("cart", JSON.stringify(cart));

  
    updateCartCount();

   
    button.textContent = "Item Added!";
  });
}


function updateCartCount() {
  const countElement = document.querySelector(".cart-count");
  if (!countElement) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  countElement.textContent = total;
}
updateCartCount();




function renderCartItems() {

  const containerItems = document.querySelector(".cart-items");

  const cardText=document.querySelector('.cart-empty')
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
   if(cardText){
 console.log(cardText);
   
  if (cart.length === 0) {

    cardText.innerHTML = "<p>Cart is empty</p>";

    return;

  }else{
    
     cardText.innerHTML = "";
    
  }
  }
if(!containerItems) return;
  containerItems.innerHTML = cart.map(item => {

  const product = productList.find(p => p.id === item.id);

    return `
      <article class="cart-item" data-product-id="${item.id}">
        
        <div class="thumb">
          <img src="${item.img}" alt="" />
        </div>

        <div class="info">
          <div class="name">${item.name}</div>
          <div class="price">$${item.price}</div>
        </div>

        <div class="controls">

          <div class="qty-stepper">
            <button data-qty-decrease>−</button>

            <span class="qty">${item.quantity}</span>

            <button data-qty-increase>+</button>
          </div>

          <button class="remove-item" data-remove-item>
            Remove
          </button>

        </div>

      </article>
    `;
    
  }).join('');
}
renderCartItems()


document.addEventListener("click", function (e) {

  // const removeBtn = e.target.closest("[data-remove-item]");
  const removeBtn=document.querySelector("[data-remove-item]");
  console.log(removeBtn);
  

  if (!removeBtn) return;

  const cartItem = removeBtn.closest(".cart-item");

  const id = Number(cartItem.dataset.productId);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  cartItem.remove();

  updateCartCount();

  updateCartSummary();
  renderCartItems()
});


// const orderSummary=document.querySelector('.cart-summary');
// const summaryRow=document.querySelector('.summary-row');
// const subTotal=document.querySelector("[data-subtotal]");
// const dataShipping=document.querySelector("[data-shipping]");
// const dataTotal=document.querySelector("[data-total]");


const subtotalEl = document.querySelector("[data-subtotal]");
  const shippingEl = document.querySelector("[data-shipping]");
  const totalEl = document.querySelector("[data-total]");


function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  

  let subtotal = 0;
  if(subtotalEl){
  cart.forEach(item => {
    subtotal += Number(item.price) * Number(item.quantity);
  });

  let shipping = 0;

  let total = subtotal + shipping;

  subtotalEl.innerText = subtotal.toFixed(2);
  shippingEl.innerText = shipping.toFixed(2);
  totalEl.innerText = total.toFixed(2);
  }
  
}
updateCartSummary();


// function storeFormData(){
// const orderPlaced=JSON.parse(localStorage.getItem("form-section"))||{};
// console.log(orderPlaced)
// orderPlaced.forEach(item=>{
//   orderPlaced
// })

// }

let storeFormData=document.querySelector('.form-data');
storeFormData.addEventListener('click',function(e){
  e.preventDefault();
    
    const UserData={
      email:document.getElementById('email').value,
      firstName:document.getElementById('firstName').value,
      lastName:document.getElementById('lastName').value,
      address:document.getElementById('address').value,
      city:document.getElementById('city').value,
      postalCOde:document.getElementById('zip').value,
      country:document.getElementById('country').value,
      cardName:document.getElementById('cardName').value,
      cardNumber:document.getElementById('cardNumber').value,
      expiry:document.getElementById('expiry').value,
      cvc:document.getElementById('cvc').value,
      total:subtotalEl.textContent,
      cart:localStorage.getItem("cart"),

    }
    localStorage.setItem('formData',JSON.stringify(UserData));
    // let storeData=localStorage.getItem('formData');
   
    

    
    
    
    // console.log(storeFormData);
  console.log(UserData);
  // console.log(localStorage);
  
  
  

})





