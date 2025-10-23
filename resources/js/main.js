document.addEventListener('DOMContentLoaded', () => {
  // sync wishlist
  const syncWishlistButtons = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      const productId = btn.dataset.productId
      const icon = btn.querySelector('i')
      if (wishlist.includes(productId)) {
        btn.classList.add('active')
        icon.classList.replace('far', 'fas')
      } else {
        btn.classList.remove('active')
        icon.classList.replace('fas', 'far')
      }
    })
  }
  const initializeProducts = () => {
    if (!localStorage.getItem('products')) {
      const initialProducts = [
        {
          id: '1',
          name: 'Monochrome Hoodie',
          price: 499000,
          imageSrc: '/images/product/slide1.webp',
        },
        {
          id: '2',
          name: 'Classic Black Tee',
          price: 249000,
          imageSrc: '/images/product/slide2.png',
        },
        {
          id: '3',
          name: 'Urban Cargo Pants',
          price: 549000,
          imageSrc: '/images/product/slide3.png',
        },
        {
          id: '4',
          name: 'Essential Beanie',
          price: 199000,
          imageSrc: '/images/product/product4.png',
        },
        {
          id: '5',
          name: 'ZAXCKS Graphic Tee',
          price: 279000,
          imageSrc: '/images/product/product5.png',
        },
        {
          id: '6',
          name: 'Monogram Snapback',
          price: 229000,
          imageSrc: '/images/product/product6.png',
        },
      ]
      localStorage.setItem('products', JSON.stringify(initialProducts))
      console.log('Initial products seeded to localStorage.')
    }
    const productGrid = document.getElementById('product-grid-container')
    if (productGrid) {
      const products = JSON.parse(localStorage.getItem('products')) || []
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || []

      productGrid.innerHTML = ''

      // loop dan render card
      products.forEach((product) => {
        const isWishlisted = wishlist.includes(product.id)
        const heartClass = isWishlisted ? 'fas' : 'far'
        const wishlistActiveClass = isWishlisted ? 'active' : ''
        const productCardHTML = `
        <div class="product-card">
          <div class="product-image-container">
            <img src="${product.imageSrc}" alt="${product.name}" class="product-image" />
          </div>
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">Rp ${product.price.toLocaleString('id-ID')}</p>
            <div class="product-action">
              <a href="#" class="product-cta">View Details</a>
              <button class="wishlist-btn ${wishlistActiveClass}" aria-label="Add to wishlist" data-product-id="${product.id}">
                <i class="${heartClass} fa-heart"></i> 
              </button>
              <button class="product-cart-btn" aria-label="Add to cart" data-product-id="${product.id}">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      `
        productGrid.insertAdjacentHTML('beforeend', productCardHTML)
      })
      syncWishlistButtons()
    }
  }

  initializeProducts()

  const getProducts = () => JSON.parse(localStorage.getItem('products')) || []

  const getWishlist = () => {
    const wishlistJSON = localStorage.getItem('wishlist')
    return wishlistJSON ? JSON.parse(wishlistJSON) : []
  }

  const saveWishlist = (wishlist) => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }

  const updateWishlistAnalytics = (productId) => {
    const analytics = JSON.parse(localStorage.getItem('wishlistAnalytics')) || {}
    analytics[productId] = (analytics[productId] || 0) + 1
    localStorage.setItem('wishlistAnalytics', JSON.stringify(analytics))
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('.wishlist-btn')
    if (!button) return

    const productId = button.dataset.productId
    const heartIcon = button.querySelector('i')
    let wishlist = getWishlist()

    if (wishlist.includes(productId)) {
      wishlist = wishlist.filter((id) => id !== productId)
      button.classList.remove('active')
      heartIcon.classList.replace('fas', 'far')
    } else {
      wishlist.push(productId)
      button.classList.add('active')
      heartIcon.classList.replace('far', 'fas')
      updateWishlistAnalytics(productId)
    }

    saveWishlist(wishlist)
    console.log('Wishlist diperbarui:', getWishlist())
  })

  // build wishlist
  const wishlistGrid = document.getElementById('wishlist-grid')

  if (wishlistGrid) {
    const wishlistIds = getWishlist()

    wishlistGrid.innerHTML = ''

    if (wishlistIds.length === 0) {
      const emptyMessageHTML = `
        <div class="empty-wishlist-message">
        <h2>Your Wishlist is Empty</h2>
        <p>Looks like you haven't added any items yet. Explore our collection to find something you'll love!</p>
        <a href="/product" class="main-checkout-button">Explore Products</a>
        </div>
    `
      wishlistGrid.innerHTML = emptyMessageHTML
    } else {
      const wishlistedProducts = getProducts().filter((product) => wishlistIds.includes(product.id))
      // template
      wishlistedProducts.forEach((product) => {
        const productCardHTML = `
          <div class="product-card">
            <div class="product-image-container">
              <img src="${product.imageSrc}" alt="${product.name}" class="product-image" />
            </div>
            <div class="product-info">
              <h3 class="product-name">${product.name}</h3>
              <p class="product-price">Rp ${product.price.toLocaleString('id-ID')}</p>
              <div class="product-action">
                <a href="#" class="product-cta">View Details</a>
                <button class="wishlist-btn active" aria-label="Add to wishlist" data-product-id="${product.id}">
                  <i class="fas fa-heart"></i>
                </button>
                <button class="product-cart-btn" aria-label="Add to cart" data-product-id="${product.id}">
                  <i class="fas fa-shopping-cart"></i>
                </button>
              </div>
            </div>
          </div>
        `
        wishlistGrid.insertAdjacentHTML('beforeend', productCardHTML)
      })
      syncWishlistButtons()
    }
  }

  // search logic
  const searchForm = document.getElementById('search-form')
  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const searchInput = searchForm.querySelector('.search-input')
      const query = searchInput.value.trim()

      if (query) {
        window.location.href = `/search?q=${encodeURIComponent(query)}`
      }
    })
  }
  // search page result logic
  const searchResultsGrid = document.getElementById('search-results-grid')
  if (searchResultsGrid) {
    const params = new URLSearchParams(window.location.search)
    const query = params.get('q')?.toLowerCase() || ''

    const titleElement = document.getElementById('search-results-title')
    if (query) {
      titleElement.textContent = `Results for "${params.get('q')}"`
    }
    
    const allProducts = getProducts();
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    )
    // template
    if (filteredProducts.length > 0) {
      filteredProducts.forEach((product) => {
        const productCardHTML = `
          <div class="product-card">
             <div class="product-image-container">
              <img src="${product.imageSrc}" alt="${product.name}" class="product-image" />
            </div>
            <div class="product-info">
              <h3 class="product-name">${product.name}</h3>
              <p class="product-price">Rp ${product.price.toLocaleString('id-ID')}</p>
              <div class="product-action">
                <a href="#" class="product-cta">View Details</a>
                <button class="wishlist-btn" data-product-id="${product.id}">
                  <i class="far fa-heart"></i>
                </button>
                <button class="product-cart-btn" aria-label="Add to cart" data-product-id="${product.id}">
                  <i class="fas fa-shopping-cart"></i>
                </button>
              </div>
            </div>
          </div>
        `
        searchResultsGrid.insertAdjacentHTML('beforeend', productCardHTML)
      })
      syncWishlistButtons()
    } else {
      searchResultsGrid.innerHTML = `
        <div class="empty-wishlist-message">
          <h2>No results found</h2>
          <p>We couldn't find any products matching your search. Please try a different keyword.</p>
          <a href="/product" class="main-checkout-button">View All Products</a>
        </div>
      `
    }
  }
  // transaction page
  const getCart = () => {
    const cartJSON = localStorage.getItem('cart')
    return cartJSON ? JSON.parse(cartJSON) : []
  }

  const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const cartButtons = document.querySelectorAll('.product-cart-btn')

  cartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId
      if (!productId) return

      let cart = getCart()

      const existingProductIndex = cart.findIndex((item) => item.id === productId)

      if (existingProductIndex > -1) {
        cart[existingProductIndex].qty++
      } else {
        cart.push({ id: productId, qty: 1 })
      }

      saveCart(cart)

      console.log('Keranjang diperbarui:', getCart())
      button.innerHTML = '<i class="fas fa-check"></i>'
      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-shopping-cart"></i>'
      }, 1500)
    })
  })

  // checkout logic
  const cartItemsContainer = document.getElementById('cart-items-container')
  if (cartItemsContainer) {
    const renderCheckout = () => {
      const cart = getCart()
      const orderTotalContainer = document.getElementById('order-total-container')

      cartItemsContainer.innerHTML = ''
      orderTotalContainer.innerHTML = ''

      if (cart.length > 0) {
        let subtotal = 0

        cart.forEach((cartItem) => {
          const productDetail = getProducts().find((p) => p.id === cartItem.id)
          if (!productDetail) return

          const itemTotal = productDetail.price * cartItem.qty
          subtotal += itemTotal

          const itemHTML = `
                    <div class="order-item" data-id="${productDetail.id}">
                        <img src="${productDetail.imageSrc}" alt="${productDetail.imageAlt}">
                        <div class="item-details">
                            <p class="item-name">${productDetail.name}</p>
                            <div class="quantity-selector">
                                <button class="minus" data-id="${productDetail.id}">-</button>
                                <span class="qty">${cartItem.qty}</span>
                                <button class="plus" data-id="${productDetail.id}">+</button>
                            </div>
                        </div>
                        <div class="item-price-group">
                            <p class="item-price">Rp ${itemTotal.toLocaleString('id-ID')}</p>
                            <button class="remove-item" data-id="${productDetail.id}">Remove</button>
                        </div>
                    </div>
                `
          cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML)
        })

        const shipping = 20000
        const total = subtotal + shipping

        const totalHTML = `
                <div class="total-row">
                    <span>Subtotal</span>
                    <span>Rp ${subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div class="total-row">
                    <span>Shipping</span>
                    <span>Rp ${shipping.toLocaleString('id-ID')}</span>
                </div>
                <div class="total-row grand-total">
                    <span>Total</span>
                    <span>Rp ${total.toLocaleString('id-ID')}</span>
                </div>
            `
        orderTotalContainer.innerHTML = totalHTML
      } else {
        cartItemsContainer.innerHTML =
          '<p style="text-align:center; color: #777;">Your cart is empty.</p>'
      }
    }

    // change quantity
    const updateQuantity = (productId, change) => {
      let cart = getCart()
      const productIndex = cart.findIndex((item) => item.id === productId)
      if (productIndex > -1) {
        cart[productIndex].qty += change
        if (cart[productIndex].qty <= 0) {
          cart.splice(productIndex, 1)
        }
        saveCart(cart)
        renderCheckout()
      }
    }

    const removeItem = (productId) => {
      let cart = getCart()
      const updatedCart = cart.filter((item) => item.id !== productId)
      saveCart(updatedCart)
      renderCheckout()
    }
    cartItemsContainer.addEventListener('click', (event) => {
      const target = event.target
      const productId = target.dataset.id

      if (!productId) return

      if (target.classList.contains('plus')) {
        updateQuantity(productId, 1)
      } else if (target.classList.contains('minus')) {
        updateQuantity(productId, -1)
      } else if (target.classList.contains('remove-item')) {
        removeItem(productId)
      }
    })

    renderCheckout()
  }
// track guest
  const trackGuestVisit = () => {
    let guestId = localStorage.getItem('guestId')

    let totalVisits = parseInt(localStorage.getItem('totalVisitCount') || '0')
    totalVisits++
    localStorage.setItem('totalVisitCount', totalVisits.toString())

    if (!guestId) {
      guestId = 'guest_' + Date.now() + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('guestId', guestId)

      let uniqueVisitors = parseInt(localStorage.getItem('siteVisitCount') || '0')
      uniqueVisitors++
      localStorage.setItem('siteVisitCount', uniqueVisitors.toString())
    }

    console.log(
      `Visits: ${totalVisits} | Unique visitors: ${localStorage.getItem('siteVisitCount')}`
    )
  }

  trackGuestVisit()
})
