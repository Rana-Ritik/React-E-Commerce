import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import Navbar from './Navbar';

// Navbar Component


// Categories and Products Data
const categories = [
  {
    title: 'Mobiles',
    products: [
      { name: 'iPhone 15 Pro', image: 'https://gizmobo.com/wp-content/uploads/2022/08/Apple-iPhone-14-Pro-gold.jpg' },
      { name: 'Samsung S23 Ultra', image: 'https://image-us.samsung.com/us/smartphones/galaxy-s23-ultra/images/gallery/lavender/01-DM3-Lavender-PDP-1600x1200.jpg' },
      { name: 'Samsung Z Fold 5', image: 'https://www.stuff.tv/wp-content/uploads/sites/2/2022/08/Samsung-Galaxy-Z-Fold-4-beige-and-graygreen.jpg' },
      { name: 'Google Pixel 7', image: 'https://www.presse-citron.net/app/uploads/2022/09/pixel-7-pro-lfstyle.jpg' },
    ],
    link: '/Mobiles',
  },
  {
    title: 'Laptops',
    products: [
      { name: 'MacBook Pro', image: 'https://tse1.mm.bing.net/th?id=OIP.LneihLoprN4ePSUMc05RqwHaFj&pid=Api&P=0&h=180' },
      { name: 'Samsung Book 4', image: 'https://img.global.news.samsung.com/br/wp-content/uploads/2023/12/Galaxy-Book4-Series_thumb728.jpg' },
      { name: 'HP Spectre x360', image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5713/5713176cv11d.jpg' },
      { name: 'Dell G-15', image: 'https://cdn.mos.cms.futurecdn.net/Uq2wFUnCKMxtYUveqZGYWe.jpg' },
    ],
    link: '/Laptops',
  },
  {
    title: 'Tablets',
    products: [
      { name: 'Samsung Tablet S6', image: 'https://www.bhphotovideo.com/images/images2500x2500/samsung_sm_t860nzaaxar_10_5_galaxy_tab_6_1490742.jpg' },
      { name: 'Redmi Pad Pro 5G', image: 'https://m.media-amazon.com/images/I/71wkgHCzagL._AC_UY327_FMwebp_QL65_.jpg' },
      { name: 'Honor Pad X8', image: 'https://m.media-amazon.com/images/I/61RupxzNlRL._AC_UY327_FMwebp_QL65_.jpg' },
      { name: 'Lenovo Tab M10', image: 'https://m.media-amazon.com/images/I/61yBf2b9dFL._AC_UY327_FMwebp_QL65_.jpg' },
    ],
    link: '/Tablets',
  },
  {
    title: 'Watches',
    products: [
      { name: 'Noise Twist Go', image: 'https://m.media-amazon.com/images/I/61q0ZgCYoJL._AC_UY327_FMwebp_QL65_.jpg' },
      { name: 'Noise Teist Round Dial', image: 'https://m.media-amazon.com/images/I/61uIxryDQGL._AC_UY327_FMwebp_QL65_.jpg' },
      { name: 'Boat Wave Light', image: 'https://m.media-amazon.com/images/I/61DZclqQ4RL._AC_UY327_FMwebp_QL65_.jpg' },
      { name: 'Samsung Galaxy Watch 6', image: 'https://m.media-amazon.com/images/I/61fDRIfPQEL._AC_UY327_FMwebp_QL65_.jpg' },
    ],
    link: '/Watches',
  },
];

// Product Card Component
const ProductCard = ({ name, image }) => (
  <div className='flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105'>
    <img className='h-48 w-full object-cover' src={image} alt={name} />
    <div className='p-4'>
      <h2 className='text-lg font-semibold'>{name}</h2>
    </div>
  </div>
);

// Category Section Component
const CategorySection = ({ title, products, link }) => (
  <section className='mt-12'>
    <h2 className='text-2xl font-bold text-center mb-6'>{title}</h2>
    <div className='flex flex-wrap justify-center gap-6'>
      {products.map((product, index) => (
        <ProductCard key={index} name={product.name} image={product.image} />
      ))}
    </div>
    <div className='text-center mt-4'>
      <Link to={link} className='text-blue-500 font-semibold hover:underline'>VIEW ALL</Link>
    </div>
  </section>
);

// Homepage Component
const Homepage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar></Navbar>
      <header className='bg-blue-600 py-12 '>
        <h1 className='text-4xl text-white text-center font-bold mb-2'>
          WELCOME {user ? user.name : 'TO A2Z__WORLD__'}
        </h1>
        <p className='text-xl text-white text-center mt-2'>
          Discover the latest gadgets and electronics!
        </p>
      </header>
      <main className='p-6'>
        {categories.map((category, index) => (
          <CategorySection key={index} {...category} />
        ))}
      </main>
    </div>
  );
};

export default Homepage;
