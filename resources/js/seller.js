document.addEventListener('DOMContentLoaded', () => {
  const getProducts = () => {
    return JSON.parse(localStorage.getItem('products')) || []
  }

  const saveProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products))
  }

  // dashboard page
  const productListTable = document.getElementById('product-list-table')
  if (productListTable) {
    const products = getProducts()
    const tableBody = productListTable.querySelector('tbody')
    tableBody.innerHTML = ''

    products.forEach((product) => {
      const row = `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>Rp ${product.price.toLocaleString('id-ID')}</td>
          <td class="actions">
            <button class="delete-cta" data-product-id="${product.id}">
              Delete
            </button>
          </td>
        </tr>
      `
      tableBody.insertAdjacentHTML('beforeend', row)
    })

    productListTable.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-cta')) {
        const button = event.target
        const productId = button.dataset.productId

        if (!productId) return

        const isConfirmed = confirm(`Are you sure you want to delete this product?`)
        if (isConfirmed) {
          let currentProducts = getProducts()
          const newProducts = currentProducts.filter((p) => p.id !== productId)
          saveProducts(newProducts)
          alert('Product deleted successfully.')
          location.reload()
        }
      }
    })
  } 

  // add product
  const addProductForm = document.getElementById('add-product-form')
  if (addProductForm) {
    addProductForm.addEventListener('submit', (event) => {
      event.preventDefault()

      const products = getProducts()

      const newProduct = {
        id: Date.now().toString(),
        name: document.getElementById('productName').value,
        price: parseInt(document.getElementById('productPrice').value),
        imageSrc: document.getElementById('productImage').value,
      }

      if (!newProduct.name || !newProduct.price || !newProduct.imageSrc) {
        alert('Please fill in all fields.')
        return
      }
      
      if (isNaN(newProduct.price) || newProduct.price <= 0) {
        alert('Please enter a valid price.')
        return
      }

      products.push(newProduct)
      saveProducts(products)

      alert('Product has been added successfully!')
      window.location.href = '/seller/dashboard'
    })
  }

  // wishlist
  const analyticsList = document.getElementById('wishlist-analytics-list')
if (analyticsList) {
  const analyticsData = JSON.parse(localStorage.getItem('wishlistAnalytics')) || {};
  const uniqueVisitors = parseInt(localStorage.getItem('siteVisitCount') || '0');
  const totalVisits = parseInt(localStorage.getItem('totalVisitCount') || '0');
  const products = getProducts();

  // tampilkan total visitor
  const visitorsDisplay = document.getElementById('total-visitors-display');
  if (visitorsDisplay) {
    visitorsDisplay.textContent = `
      Unique Visitors: ${uniqueVisitors} | Total Visits: ${totalVisits}
    `;
  }

  analyticsList.innerHTML = '';

  // urutkan wishlist berdasarkan jumlah wishlist terbanyak
  const sortedAnalytics = Object.entries(analyticsData)
    .sort(([, countA], [, countB]) => countB - countA);

  if (sortedAnalytics.length === 0) {
    analyticsList.innerHTML = '<li>No wishlist data has been recorded yet.</li>';
  } else {
    sortedAnalytics.forEach(([productId, count]) => {
      const product = products.find(p => p.id === productId);
      if (product) {
        const percentage = uniqueVisitors > 0 ? ((count / uniqueVisitors) * 100).toFixed(1) : 0;

        const listItem = `
          <li>
            <strong>${product.name}</strong><br>
            <small>Wishlisted ${count} times (${percentage}% of visitors)</small>
          </li>
        `;
        analyticsList.insertAdjacentHTML('beforeend', listItem);
      }
    });
  }
}
  // signout
  const signOutButton = document.getElementById('sign-out-btn')

  if (signOutButton) {
    signOutButton.addEventListener('click', (event) => {
      event.preventDefault()

      const isConfirmed = confirm('Are you sure you want to sign out?')

      if (isConfirmed) {
        alert('You have been signed out.')
        window.location.href = '/login'
      }
    })
  }
})