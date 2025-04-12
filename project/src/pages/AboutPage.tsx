import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, Award, Utensils } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* About Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div 
          className="relative h-80 bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About My Restaurant</h1>
            <p className="text-xl text-white max-w-2xl mx-auto px-4">
              Our story, our passion, our commitment to excellence
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Founded in 2010 by renowned chef Maria Rossi, Savoria began as a small family restaurant with a big dream: to create a dining experience that celebrates the art of fine cuisine while maintaining a warm, inviting atmosphere.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                What started as a modest establishment quickly gained recognition for its exceptional food quality, innovative recipes, and impeccable service. Over the years, Savoria has evolved into one of the city's premier dining destinations, earning numerous accolades and a loyal following of food enthusiasts.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Today, Savoria continues to honor its founding principles: sourcing the finest ingredients, crafting dishes with passion and precision, and creating memorable experiences for every guest who walks through our doors.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-[1.01]">
              <img 
                src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Restaurant interior" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-16 px-4 bg-indigo-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Our Philosophy</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md text-center transition-transform hover:scale-[1.02]">
              <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Culinary Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We believe in the transformative power of exceptional food. Each dish is crafted with precision, creativity, and respect for ingredients, resulting in a symphony of flavors that delight the senses.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md text-center transition-transform hover:scale-[1.02]">
              <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Warm Hospitality</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Beyond serving meals, we create experiences. Our attentive staff ensures that every guest feels welcomed, valued, and cared for throughout their dining journey with us.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md text-center transition-transform hover:scale-[1.02]">
              <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Sustainable Practices</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We are committed to responsible sourcing and environmental stewardship. By partnering with local farmers and suppliers, we reduce our carbon footprint while supporting our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80" 
                  alt="Chef Maria Rossi" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Maria Rossi</h3>
              <p className="text-indigo-600 dark:text-indigo-400 mb-2">Executive Chef & Founder</p>
              <p className="text-gray-600 dark:text-gray-300">
                With over 20 years of culinary experience across Europe and Asia, Chef Maria brings her passion for innovative cuisine and commitment to excellence to every dish at Savoria.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80" 
                  alt="Chef James Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">James Chen</h3>
              <p className="text-indigo-600 dark:text-indigo-400 mb-2">Head Chef</p>
              <p className="text-gray-600 dark:text-gray-300">
                A graduate of the prestigious Culinary Institute of America, Chef James specializes in fusion cuisine that blends traditional techniques with modern innovation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80" 
                  alt="Sophia Martinez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Sophia Martinez</h3>
              <p className="text-indigo-600 dark:text-indigo-400 mb-2">Restaurant Manager</p>
              <p className="text-gray-600 dark:text-gray-300">
                With her warm personality and meticulous attention to detail, Sophia ensures that every aspect of your dining experience at Savoria exceeds expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">What Our Guests Say</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md transition-transform hover:scale-[1.01]">
              <div className="flex items-center mb-4">
                <div className="text-indigo-500 text-2xl mr-2">★★★★★</div>
                <div className="text-gray-600 dark:text-gray-300">5.0</div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-6">
                "An unforgettable dining experience! The truffle risotto was divine, and the service was impeccable. Savoria has become our go-to spot for special occasions."
              </p>
              <div className="font-semibold text-gray-800 dark:text-white">Emily Johnson</div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md transition-transform hover:scale-[1.01]">
              <div className="flex items-center mb-4">
                <div className="text-indigo-500 text-2xl mr-2">★★★★★</div>
                <div className="text-gray-600 dark:text-gray-300">5.0</div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-6">
                "From the moment we walked in, we were treated like royalty. The filet mignon was cooked to perfection, and the wine pairing suggestions were spot on. Highly recommend!"
              </p>
              <div className="font-semibold text-gray-800 dark:text-white">Michael Thompson</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-16 px-4 bg-indigo-700 dark:bg-indigo-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Join Us for an Unforgettable Experience</h2>
          <p className="text-indigo-100 mb-8 text-lg">
            We look forward to welcoming you to Savoria and sharing our passion for exceptional cuisine.
          </p>
          <Link to="/book" className="px-8 py-3 bg-white text-indigo-700 font-medium rounded-md hover:bg-indigo-100 transition duration-300 inline-block">
            Book a Table
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;