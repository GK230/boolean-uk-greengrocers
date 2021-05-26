/*

This is how an item object should look like

{
      id: "001-beetroot", <- the item id matches the icon name in the assets/icons folder
      name: "beetroot",
      price: 0.35 <- You can come up with your own prices
    }

*/

const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.40
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.45
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.50
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.55
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.60
    },
    {
      id: "007-bell-pepper",
      name: "bell-pepper",
      price: 0.65
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.70
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.75
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.80
    }
  ],
  cart: [],
  total: 0
}

cartEl = document.querySelector('.item-list.cart--item-list')
storeEl = document.querySelector('.item-list.store--item-list')
totalEl = document.querySelector('.total-number')

function addItemToCart(targetItem) {

  const foundItem = state.cart.find(function (cartItem) {
    return cartItem.id === targetItem.id;
  });

  if (foundItem === undefined) {
    const cartItem = {
      id: targetItem.id,
      name: targetItem.name,
      quantity: 1
    };
    state.cart.push(cartItem);
    renderCart()
    // calculateTotal()

  } else {
    foundItem.quantity++
    renderCart()
    // calculateTotal()


  }
}

function removeItemFromCart(itemToRemove) {

  console.log(itemToRemove)

  let indexToRemove = 0

  for (const item in state.cart) {
    if (item.quantity === 0) {
      indexToRemove = state.cart.findIndex(function () {
        return item.id === state.cart.item.id;
      });
    }
    state.cart.splice(indexToRemove + 1, 1);

  }

}

// function calculateTotal() {

//   let total = 0

//     for (let item in state.cart) {
//       console.log(item)
//       console.log(item.price)
//       price = item.quantity * state.items.item.price
//       console.log(price)
//       total = total + price
//     }
    
//   console.log(total)
//   total = state.total
//   return total
// }

function renderStoreItem(item) {

  liEl = document.createElement('li')

  divEl = document.createElement('div')
  divEl.setAttribute('class', "store--item-icon")

  imgEl = document.createElement('img')
  imgEl.setAttribute('src', `assets/icons/${item.id}.svg`)
  imgEl.setAttribute('alt', item.name)

  btnEl = document.createElement('button')
  btnEl.innerText = "Add to cart"
  btnEl.addEventListener("click", function() {
    addItemToCart(item)
  })

  divEl.append(imgEl, btnEl)

  liEl.append(divEl)

  return liEl
}


function renderStore() {


  for (const item of state.items) {

    const liEl = renderStoreItem(item)
    storeEl.append(liEl)

  }
}

function renderCartItem(item) {

  liEl = document.createElement('li')

  imgEl = document.createElement('img')
  imgEl.setAttribute('class', "cart--item-icon")
  imgEl.setAttribute('src', `assets/icons/${item.id}.svg`)
  imgEl.setAttribute('alt', item.name)

  pEl = document.createElement('p')
  pEl.innerText = item.name

  cartBtnMinusEl = document.createElement('button')
  cartBtnMinusEl.classList.add('quantity-btn', 'remove-btn', 'center')
  cartBtnMinusEl.innerText = "-"
  cartBtnMinusEl.addEventListener('click', function() {
    decreaseItemQuantity(item)
    renderCart()
  })

  spanEl = document.createElement('span')
  spanEl.classList.add('quantity-text', 'center')
  spanEl.innerText = item.quantity

  cartBtnPlusEl = document.createElement('button')
  cartBtnPlusEl.classList.add('quantity-btn', 'add-btn', 'center')
  cartBtnPlusEl.innerText = "+"
  cartBtnPlusEl.addEventListener('click', function () {
    incrementItemQuantity(item)
    renderCart()
  })

  liEl.append(imgEl, pEl, cartBtnMinusEl, spanEl, cartBtnPlusEl)

  return liEl
}

function renderCart() {

  cartEl.innerHTML = "";


  for (const item of state.cart) {

      const liEl = renderCartItem(item)
      cartEl.append(liEl)

  }
}

function renderTotal(total) {
  totalEl = document.querySelector(".total-number")
  totalEl.innerText = total
}

function incrementItemQuantity(item) {
  item.quantity++
}

function decreaseItemQuantity(item) {
  item.quantity--
  if (item.quantity === 0) {
    removeItemFromCart(item)
    // cartEl.remove(liEl)
  }
}

renderStore()
renderCart()
renderTotal()


