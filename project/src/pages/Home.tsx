// import React from 'react';
// import { Link } from 'react-router-dom';
// import { UtensilsCrossed, CalendarCheck, QrCode } from 'lucide-react';

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
//       {/* Hero Section */}
//       <div className="relative bg-indigo-600 h-[500px]">
//         <div className="absolute inset-0">
//           <img
//             src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
//             alt="Restaurant interior"
//             className="w-full h-full object-cover opacity-30"
//           />
//         </div>
//         <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
//           <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
//             Welcome to Our Restaurant
//           </h1>
//           <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
//             Experience fine dining at its best. Book a table or order directly through our digital menu system.
//           </p>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//           {/* Book a Table */}
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4">
//               <CalendarCheck className="h-6 w-6" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Book a Table</h3>
//             <p className="text-gray-500 dark:text-gray-300 mb-4">
//               Reserve your table in advance and skip the waiting line.
//             </p>
//             <Link
//               to="/book-table"
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               Book Now
//             </Link>
//           </div>

//           {/* View Menu */}
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4">
//               <UtensilsCrossed className="h-6 w-6" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">View Menu</h3>
//             <p className="text-gray-500 dark:text-gray-300 mb-4">
//               Explore our diverse menu offerings and specialties.
//             </p>
//             <Link
//               to="/menu"
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               View Menu
//             </Link>
//           </div>

//           {/* QR Code Ordering */}
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4">
//               <QrCode className="h-6 w-6" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">QR Code Ordering</h3>
//             <p className="text-gray-500 dark:text-gray-300 mb-4">
//               Scan your table's QR code to order directly from your phone.
//             </p>
//             <Link
//               to="/scan-qr"
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               Scan QR
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, CalendarCheck, QrCode, Clock, MapPin, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Hero Section */}
      <div className="relative bg-indigo-700 dark:bg-indigo-900 h-[500px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
            alt="Restaurant interior"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Welcome to Our Restaurant
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            Experience fine dining at its best. Book a table or order directly through our digital menu system.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Book a Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4">
              <CalendarCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Book a Table</h3>
            <p className="text-gray-500 dark:text-gray-300 mb-4">
              Reserve your table in advance and skip the waiting line.
            </p>
            <Link
              to="/book-table"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* View Menu */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4">
              <UtensilsCrossed className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">View Menu</h3>
            <p className="text-gray-500 dark:text-gray-300 mb-4">
              Explore our diverse menu offerings and specialties.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              View Menu
            </Link>
          </div>

          {/* QR Code Ordering */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4">
              <QrCode className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">QR Code Ordering</h3>
            <p className="text-gray-500 dark:text-gray-300 mb-4">
              Scan your table's QR code to order directly from your phone.
            </p>
            <Link
              to="/scan-qr"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Scan QR
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Founded in 2010, Savoria has been serving exquisite cuisine that combines traditional flavors with modern culinary techniques. Our passionate team of chefs is dedicated to creating memorable dining experiences using only the freshest, locally-sourced ingredients.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                At Savoria, we believe that dining is not just about food, but about creating moments that last a lifetime. Our elegant atmosphere, attentive service, and innovative menu come together to offer you an unforgettable gastronomic journey.
              </p>
              <Link to="/about" className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition duration-300">
                Learn more about us →
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-[1.01]">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Restaurant interior" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Menu</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our chef's selection of signature dishes, crafted with passion and the finest ingredients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Menu Item 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                alt="Herb-crusted salmon" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Herb-Crusted Salmon</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Fresh Atlantic salmon with a crispy herb crust, served with roasted vegetables and lemon butter sauce.</p>
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">$28</p>
              </div>
            </div>
            
            {/* Menu Item 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <img 
                src="https://img.hellofresh.com/hellofresh_s3/image/truffle-risotto-with-herbed-chicken-30932bfb.jpg" 
                alt="Truffle Risotto" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Truffle Risotto</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Creamy Arborio rice with wild mushrooms, finished with truffle oil and aged Parmesan cheese.</p>
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">$24</p>
              </div>
            </div>
            
            {/* Menu Item 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <img 
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Filet Mignon" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Filet Mignon</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Tender beef filet cooked to perfection, served with truffle mashed potatoes and red wine reduction.</p>
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">$36</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link to="/menu" className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-300">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4 bg-indigo-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hours */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md text-center transition-transform hover:scale-[1.02]">
              <Clock className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Opening Hours</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>Monday - Friday: 11am - 10pm</li>
                <li>Saturday: 10am - 11pm</li>
                <li>Sunday: 10am - 9pm</li>
              </ul>
            </div>
            
            {/* Location */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md text-center transition-transform hover:scale-[1.02]">
              <MapPin className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Location</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                123 Gourmet Street<br />
                Culinary District<br />
                Foodie City, FC 12345
              </p>
              <a href="#" className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition duration-300">
                Get Directions →
              </a>
            </div>
            
            {/* Awards */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md text-center transition-transform hover:scale-[1.02]">
              <Award className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Awards & Recognition</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>Best Fine Dining Restaurant 2024</li>
                <li>Chef's Excellence Award 2023</li>
                <li>Culinary Innovation Prize 2022</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-16 px-4 bg-indigo-700 dark:bg-indigo-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Reserve Your Table Today</h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Experience the perfect blend of exquisite cuisine, elegant atmosphere, and impeccable service.
          </p>
          <Link to="/book-table" className="px-8 py-3 bg-white text-indigo-700 font-medium rounded-md hover:bg-indigo-100 transition duration-300 inline-block">
            Book a Table
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;