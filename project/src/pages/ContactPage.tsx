import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Contact Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40"></div>
        <div 
          className="relative h-96 bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        >
          <div className="text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out for reservations, inquiries, or just to say hello.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">Our Location</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                123 Gourmet Street<br />
                Culinary District<br />
                Foodie City, FC 12345
              </p>
              <div className="text-center">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                >
                  Get Directions <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">Phone</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-2">
                Reservations: +1 (555) 123-4567
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                General Inquiries: +1 (555) 765-4321
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">Hours</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-center">
                <li>Monday - Friday: 7am - 10pm</li>
                <li>Saturday: 8am - 12am</li>
                <li>Sunday: 9am - 1am</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Send Us a Message</h2>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 text-green-700 dark:text-green-300">
                  <p>Thank you for your message! We'll get back to you shortly.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </form>
            </div>
            
            {/* Map and Additional Info */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="h-96 bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-900/10 flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Our Location</h3>
                    <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                      We're located in the heart of the Culinary District, easily accessible from all major transportation routes.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-900/30">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Parking Information</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Complimentary valet parking is available during dinner hours. Public parking is also available in the garage across the street.
                </p>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Valet available daily from 5pm-11pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Quick answers to common questions about reservations, dining, and more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "Do you accommodate dietary restrictions?",
                answer: "Yes, we are happy to accommodate various dietary needs including vegetarian, vegan, gluten-free, and allergies. Please inform us of any restrictions when making your reservation."
              },
              {
                question: "Is there a dress code?",
                answer: "We suggest smart casual attire. While we don't enforce a strict dress code, we appreciate when our guests dress to match the elegant atmosphere of our restaurant."
              },
              {
                question: "Can I make a reservation for a large group?",
                answer: "Absolutely! For groups of 8 or more, please contact us directly by phone to discuss your requirements and ensure we can provide the best experience for your party."
              },
              {
                question: "Do you offer gift cards?",
                answer: "Yes, gift cards are available for purchase in-person at the restaurant or by phone. They make perfect gifts for food lovers and can be customized to any amount."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="mb-8 text-lg text-indigo-100 max-w-2xl mx-auto">
            Subscribe to our newsletter for special offers, events, and culinary inspiration delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-900 w-full"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;