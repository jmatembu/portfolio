(function(window) {

	"use strict";

	var shoppingCartSection = document.getElementById('shoppingCart'),
		toggleBtn = document.getElementById('toggleShoppingCart'),
		totalCartItemLabel = document.getElementById('totalCartItemsLabel'),
		cartSubTotalLabel = document.getElementById('cartSubTotal'),
		cartShippingLabel = document.getElementById('cartShipping'),
		cartTotalLabel = document.getElementById('cartTotal'),
		addCouponElement = document.getElementById('addCoupon'),
		couponInput = document.getElementById('couponInput'),
		toCartProducts = document.getElementsByClassName('add-to-cart'),
		storeElement = document.querySelector('.store'),
		store = {
			items: [
				{
					id: "p101",
					title: "Product 101",
					price: 24.99,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "assets/images/product-1.jpg",
					thumbnail: "assets/images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p102",
					title: "Product 102",
					price: 19.99,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "assets/images/product-1.jpg",
					thumbnail: "assets/images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p103",
					title: "Product 103",
					price: 9.99,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "assets/images/product-1.jpg",
					thumbnail: "assets/images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p104",
					title: "Product 104",
					price: 29.99,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "assets/images/product-1.jpg",
					thumbnail: "assets/images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p105",
					title: "Product 105",
					price: 20,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "assets/images/product-1.jpg",
					thumbnail: "assets/images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p106",
					title: "Product 106",
					price: 24.99,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "assets/images/product-1.jpg",
					thumbnail: "assets/images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p107",
					title: "Product 107",
					price: 22,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "assets/images/product-1.jpg",
					thumbnail: "assets/images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p108",
					title: "Product 108",
					price: 18,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "assets/images/product-1.jpg",
					thumbnail: "assets/images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p109",
					title: "Product 109",
					price: 19,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "assets/images/product-1.jpg",
					thumbnail: "assets/images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p110",
					title: "Product 110",
					price: 12,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "assets/images/product-1.jpg",
					thumbnail: "assets/images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p111",
					title: "Product 111",
					price: 26,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "assets/images/product-1.jpg",
					thumbnail: "assets/images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p112",
					title: "Product 112",
					price: 12,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "assets/images/product-1.jpg",
					thumbnail: "assets/images/product_thumbnail.jpg",
					quantity: 1
				}
			],
			promos: [
				{
					name: "MEGABLAST",
					amount: 0.05
				},
				{
					name: "IWANTTHIS",
					amount: 0.1,
					product: "p112"
				},
				{
					name: "GETTHEM",
					amount: 0.15,
					products: ["p112", "p111", "p110", "p109", "p101"]
				}
			],
			getItem: function(id) {

				var i;

				for (i = this.items.length - 1; i >= 0; i--) {
					if (this.items[i].id === id) {
						return this.items[i];
					}
				}

				throw "Product " + id + " was not found in store";
			},
			getPromo: function(code) {

				for (var i = this.promos.length - 1; i >= 0; i--) {
					if (code == this.promos[i].name) {
						return this.promos[i];
					}
				}

				return false;
			}
		},
		cart = {},
		toggleVisibility = function(element) {

			var classes = element.classList;

			if (classes.contains('hidden')) {

				element.classList.remove('hidden');
				setLabel(toggleBtn, 'Hide Cart');

			} else {

				element.classList.add('hidden');
				setLabel(toggleBtn, 'View Cart');

			}
		},

		/**
		 * Build the HTML structure of the product to be added 
		 * into the cart and on to the page.
		 *
		 * @params Object product
		 * return DOM Nodes
		 */
		buildProductHTML = function(product) {
			// Create elements
			var liCartProduct = document.createElement('li'),
				ulCartProductDetails = document.createElement('ul'),
				liCartProductName = document.createElement('li'),
				imgProduct = document.createElement('img'),
				spanProductName = document.createElement('span'),
				productName = document.createTextNode(product.title),

				liCartProductQuantity = document.createElement('li'),
				inputQuantity = document.createElement('input'),
				liCartProductPrice = document.createElement('li'),
				spanProductPrice = document.createElement('span'),
				productPrice = document.createTextNode('$' + product.price),
				liCartProductAction = document.createElement('li'),
				buttonRemove = document.createElement('button'),
				iconRemove = document.createElement('i');
				
			/**
			 * Create HTML structure
			 */

			// List item with product name and image
			liCartProductName.setAttribute('class', 'cartProductName');
			imgProduct.setAttribute('src', product.thumbnail);
			liCartProductName.appendChild(imgProduct);
			spanProductName.appendChild(productName);
			liCartProductName.appendChild(spanProductName);
			
			// List item with product quantity
			liCartProductQuantity.setAttribute('class', 'cartProductQuantity');
			inputQuantity.setAttribute('type', 'number');
			inputQuantity.setAttribute('value', '1');
			inputQuantity.setAttribute('min', '0');
			inputQuantity.setAttribute('id', 'quantity_' + product.id);
			inputQuantity.addEventListener('change', changeItemQuantity, false);
			liCartProductQuantity.appendChild(inputQuantity);

			// List item with product price
			liCartProductPrice.setAttribute('class', 'cartProductPrice');
			spanProductPrice.appendChild(productPrice);
			liCartProductPrice.appendChild(spanProductPrice);
			
			// List item with product remove action.
			liCartProductAction.setAttribute('class', 'cartProductAction');
			buttonRemove.setAttribute('class', 'close');
			buttonRemove.setAttribute('title', 'Remove ' + product.title + ' from Shopping Cart');
			buttonRemove.setAttribute('id', 'remove_' + product.id);
			iconRemove.setAttribute('class', 'ti-trash');
			buttonRemove.appendChild(iconRemove);
			buttonRemove.addEventListener('click', removeProductHTML, false);
			liCartProductAction.appendChild(buttonRemove);
			
			// Product Details
			ulCartProductDetails.setAttribute('class', 'cartProductDetails');
			ulCartProductDetails.appendChild(liCartProductName);
			ulCartProductDetails.appendChild(liCartProductQuantity);
			ulCartProductDetails.appendChild(liCartProductPrice);
			ulCartProductDetails.appendChild(liCartProductAction);

			// Cart product list item
			liCartProduct.setAttribute('class', 'cartProduct');
			liCartProduct.appendChild(ulCartProductDetails);

			return liCartProduct;
		},

		/**
		 * Render the HTML of a product into the cart.
		 *
		 * @params Object product
		 */
		renderCartItemHTML = function(product) {
			
			var listOfProductsInCart = document.querySelector('.cartProductList');

			listOfProductsInCart.appendChild(buildProductHTML(product));

		},

		/**
		 * Extract id embedded in an element's id attribute
		 *
		 * @params Event event
		 * return String id
		 */
		extractProductId = function(event) {

			var id;

			// Check is user clicked on icon or what a parent element to the icon
			// Then get id attribute from element that has been clicked on
			if (event.target.nodeName === "I") {
			
				id = event.target.parentElement.getAttribute('id');
			
			} else {
			
				id = event.target.getAttribute('id');
			
			}

			id = id.substr(id.indexOf('_') + 1);

			return id;
		},

		/**
		 * Remove the HTML of the product
		 *
		 * @params Event event
		 */
		removeProductHTML = function(event) {

			var product, id = extractProductId(event);
			
			

			product = store.getItem.call(cart, id);
			cart.removeItem(product.id);
			setLabel(totalCartItemLabel, cart.count());
			setLabel(cartTotalLabel, cart.getTotal()); // Total amount of items in cart
			event.target.parentElement.parentElement.parentElement.remove();

			if (cart.count() === 0) {
				
				toggleVisibility(shoppingCartSection);
			
			}

		},

		/**
		 * Recalculate total amount when the shopper changes the item quantity.
		 *
		 * @params Event event
		 */
		changeItemQuantity = function(event) {

			var id = event.target.getAttribute('id').substr(9),
				quantity = event.target.value * 1, // Convert the value to a number
				product = store.getItem.call(cart, id);
			
			product.quantity = quantity;
			setLabel(cartTotalLabel, cart.getTotal()); // Total amount of items in cart
			
			if (quantity === 0) {
				// Remove product if user reduces quantity to zero.
				removeProductHTML(event);

			}
			
		},
		
		/**
		 * Set the text content of any element
		 */
		setLabel = function(element, label) {

			element.innerText = label;
		
		},

		/**
		 * Round off numbers
		 */
		round = function(value, decimals) {
		
		  	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
		
		};
	// Promo code used by shopper
	cart.promo = ""; 
	// Items selected by shopper
	cart.items = [];
	
	/**
	 * Count the number of items in the cart
	 *
	 * return Number
	 */
	cart.count = function() {
	
		return this.items.length;
	
	};

	/**
	 * Remove an item from cart
	 *
	 * params @id String The unique identifier for each item in the cart
	 */
	cart.removeItem = function(id) {

		for (var i = this.items.length - 1; i >= 0; i--) {
			if (this.items[i].id === id) {
				// I think this is a bit hacky and there must be a better way
				// Without this, I get wrong total when an item is removed and added back to cart.
				this.items[i].quantity = 1; // Reset quantity to 1, the initial value 
				// Remove item from the cart
				this.items.splice(i, 1);
			}
		}

	};

	/**
	 * Calculate the total order amount taking into consideration
	 * possibility of shoppers with promo codes
	 */
	cart.getTotal = function() {

		var result = 0,
			discount = 0;
		// Calculate the total if we have one or more items in the cart
		if (this.count() > 0) {
			// TODO: Refactor this code
			for (var i = this.items.length - 1; i >= 0; i--) {
				
				discount = this.items[i].price - (this.items[i].price * this.promo.amount);
				
				if (this.promo !== "" && this.promo.name === "IWANTTHIS" && this.items[i].id === this.promo.product) {
					
					result += discount * this.items[i].quantity;

				} else if (this.promo !== "" && this.promo.name === "GETTHEM") {

					if (this.promo.products.indexOf(this.items[i].id) >= 0) {

						result += discount * this.items[i].quantity;

					} else {

						result += this.items[i].price * this.items[i].quantity;

					}

				} else if (this.promo !== "" && this.promo.name === "MEGABLAST") {
					
					result += discount * this.items[i].quantity;

				} else {

					result += this.items[i].price * this.items[i].quantity;

				}
								
			}
			// Resetting the promo code back to an empty string
			// allows shopper to use a better coupon
			this.promo = "";

		}

		// Final total order amount rounded off to 2 decimal places
		return round(result, 2);
	};

	/**
	 * Add product to cart
	 *
	 * @params Event
	 */
	cart.addToCart = function(event) {

		event.preventDefault();

		var id = "", product = {};

		// The shopper might click on the icon or the link itself
		// either way, we need to get the id
		if (event.target.nodeName === "I") {
		
			id = event.target.parentElement.parentElement.parentElement.getAttribute('id');
		
		} else if (event.target.nodeName === "A") {
		
			id = event.target.parentElement.parentElement.getAttribute('id');
		
		}

		// Pick the product from the store
		product = store.getItem(id);
		// Add the product to the cart object
		cart.items.push(product);
		// Render the HTML with product info into the cart
		renderCartItemHTML(product);
		// Show number or items in the cart
		setLabel(totalCartItemLabel, cart.count());
		// Calculate and show the total amount of products in cart
		setLabel(cartTotalLabel, cart.getTotal()); 

		event.stopPropagation();
	};

	toggleBtn.addEventListener('click', function(event) {
		
		toggleVisibility(shoppingCartSection);
	
	});

	toggleVisibility(shoppingCartSection);

	addCouponElement.addEventListener('click', function(event) {
		
		var promoInput = event.target.previousElementSibling.value,
			promo = store.getPromo(promoInput);

		if (promo) {
			// Add the promo code to cart
			cart.promo = promo;
			// Calculate the total amount
			setLabel(cartTotalLabel, cart.getTotal());
		
		}

		
	});

	// Listen to those shopper "add-to-cart" clicks
	storeElement.addEventListener('click', cart.addToCart, false);
	
	// The initial number products in cart, which is usually 0.
	// Could just set the element text to 0. :)
	setLabel(totalCartItemLabel, cart.count());

})(window);