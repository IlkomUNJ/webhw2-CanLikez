/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
// user
const ProductsController = () => import('#controllers/products_controller')
const SearchController = () => import('#controllers/search_controller')
const WishlistsController = () => import('#controllers/wishlists_controller')
const CheckoutsController = () => import('#controllers/checkout_controller')

router.on('/').render('pages/user/home')
router.on('/about').render('pages/user/about')
router.on('/login').render('pages/login')
router.on('/contact').render('pages/user/contact')

router.get('/product', [ProductsController, 'index'])
router.get('/wishlistUser', [WishlistsController, 'show'])
router.get('/search', [SearchController, 'show'])
router.get('/checkout', [CheckoutsController, 'show'])

// seller
const SellerDashboardController = () => import('#controllers/seller_dashboard_controller')
router
  .group(() => {
    router.get('/dashboard', [SellerDashboardController, 'dashboard'])
    router.get('/addProduct', [SellerDashboardController, 'createProduct'])
    router.get('/wishlistView', [SellerDashboardController, 'viewWishlistAnalytics'])
  })
  .prefix('/seller')

router
  .post('/login', async ({ request, response, session }) => {
    const { username, password } = request.only(['username', 'password'])

    console.log('Login attempt:', { username, password })
    if (username === 'admin' && password === '123') {
      return response.redirect('/seller/dashboard')
    }
    session.flash('error', 'Invalid username or password.')
    return response.redirect().back()
  })
  .as('auth.login')
