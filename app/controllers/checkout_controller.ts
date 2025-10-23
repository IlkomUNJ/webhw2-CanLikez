import type { HttpContext } from '@adonisjs/core/http'

export default class CheckoutsController {
  public async show({ view }: HttpContext) {
    const allProducts = [
      {
        id: '1',
        name: 'Monochrome Hoodie',
        price: 499000,
        imageSrc: '/images/product/slide1.webp',
        imageAlt: 'Monochrome Hoodie',
      },
      {
        id: '2',
        name: 'Classic Black Tee',
        price: 249000,
        imageSrc: '/images/product/slide2.png',
        imageAlt: 'Classic Black Tee',
      },
      {
        id: '3',
        name: 'Urban Cargo Pants',
        price: 549000,
        imageSrc: '/images/product/slide3.png',
        imageAlt: 'Urban Cargo Pants',
      },
      {
        id: '4',
        name: 'Essential Beanie',
        price: 199000,
        imageSrc: '/images/product/product4.png',
        imageAlt: 'Essential Beanie',
      },
      {
        id: '5',
        name: 'ZAXCKS Graphic Tee',
        price: 279000,
        imageSrc: '/images/product/product5.png',
        imageAlt: 'ZAXCKS Graphic Tee',
      },
      {
        id: '6',
        name: 'Monogram Snapback',
        price: 229000,
        imageSrc: '/images/product/product6.png',
        imageAlt: 'Monogram Snapback',
      },
    ]

    return view.render('pages/user/checkout', { allProducts: allProducts })
  }
}
