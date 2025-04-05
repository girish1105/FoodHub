const foods = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella, basil, and olive oil",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
      category: "Pizza"
    },
    {
      id: 2,
      name: "Classic Burger",
      description: "Beef patty, lettuce, tomato, cheese, and special sauce",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      category: "Burgers"
    },
    {
      id: 3,
      name: "California Roll",
      description: "Crab, avocado, cucumber, and tobiko",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
      category: "Sushi"
    },
    {
      id: 4,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with molten center",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80",
      category: "Desserts"
    },
    {
      id: 5,
      name: "Pepperoni Pizza",
      description: "Classic pepperoni with mozzarella and tomato sauce",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
      category: "Pizza"
    },
    {
      id: 6,
      name: "Dragon Roll",
      description: "Eel, cucumber, avocado, and unagi sauce",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=800&q=80",
      category: "Sushi"
    }
  ];
  
  let cart = [];
  
  function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }
  
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }
  
  function addToCart(foodId) {
    const food = foods.find(f => f.id === foodId);
    if (!food) return;
  
    const existingItem = cart.find(item => item.id === foodId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: food.id,
        name: food.name,
        price: food.price,
        quantity: 1
      });
    }
  
    saveCart();
    showNotification(`Added ${food.name} to cart`);
  }
  
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 2000);
  }
  
  function renderFoods() {
    const foodGrid = document.getElementById('foodGrid');
    const filteredFoods = activeCategory === 'All'
      ? foods
      : foods.filter(food => food.category === activeCategory);
  
    foodGrid.innerHTML = filteredFoods.map(food => `
      <div class="food-card">
        <img src="${food.image}" alt="${food.name}">
        <div class="food-card-content">
          <h3>${food.name}</h3>
          <p>${food.description}</p>
          <div class="food-card-footer">
            <span class="food-card-price">$${food.price.toFixed(2)}</span>
            <button class="add-to-cart" onclick="addToCart(${food.id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  function renderCartModal() {
    const modal = document.getElementById('cart-modal');
    const cartItemsEl = document.getElementById('cart-items');
    
    let cartTotalEl = document.getElementById('cart-total');
    if (!cartTotalEl) {
      cartTotalEl = document.createElement('div');
      cartTotalEl.id = 'cart-total';
      document.querySelector('.cart-modal-content').appendChild(cartTotalEl);
    }
    
    let closeCartBtn = document.getElementById('close-cart');
    if (!closeCartBtn) {
      closeCartBtn = document.createElement('button');
      closeCartBtn.id = 'close-cart';
      closeCartBtn.className = 'close-btn';
      closeCartBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
      document.querySelector('.cart-modal-content').prepend(closeCartBtn);
      
      closeCartBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }
  
    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
      cartTotalEl.textContent = '';
    } else {
      cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
          <span>${item.name} x${item.quantity}</span>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `).join('');
  
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;
    }
  
    modal.classList.remove('hidden');
    console.log('Cart modal should be visible now');
  }
  
  function purchaseCart() {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
  
    alert('Thank you for your purchase!');
    
    alert('Purchase confirmed! Your order has been placed successfully.');
    
    cart = [];
    saveCart();
    document.getElementById('cart-modal').classList.add('hidden');
  }
  
  let activeCategory = 'All';
  
  document.addEventListener('DOMContentLoaded', () => {
    cart = [];
    localStorage.removeItem('cart'); 
    updateCartCount();
    
    renderFoods();
  
    document.getElementById('menuBtn').addEventListener('click', () => {
      document.getElementById('mobileMenu').classList.add('active');
    });
  
    document.getElementById('closeMenu').addEventListener('click', () => {
      document.getElementById('mobileMenu').classList.remove('active');
    });
  
    document.getElementById('categories').addEventListener('click', (e) => {
      if (e.target.classList.contains('category-btn')) {
        document.querySelector('.category-btn.active').classList.remove('active');
        e.target.classList.add('active');
        activeCategory = e.target.dataset.category;
        renderFoods();
      }
    });
  
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
      cartBtn.addEventListener('click', function() {
        console.log('Cart button clicked');
        renderCartModal();
      });
    } else {
      console.error('Cart button not found');
    }
    
    const purchaseBtn = document.getElementById('purchase-btn');
    if (purchaseBtn) {
      purchaseBtn.addEventListener('click', purchaseCart);
    } else {
      console.error('Purchase button not found');
    }
  
    document.getElementById('contactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Form submitted');
    });
  });