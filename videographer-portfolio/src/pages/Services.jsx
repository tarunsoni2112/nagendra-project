import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  useEffect(() => {
    // Initialize scroll animations
    const sections = document.querySelectorAll('.service-section');
    
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=100',
            end: 'center center',
            scrub: 0.5,
          },
        }
      );
    });
    
    return () => {
      // Clean up ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Services data
  const services = [
    {
      id: 'videography',
      title: 'Videography',
      description: 'Our professional videography services capture the essence of your special moments with cinematic quality and artistic vision, specializing in Indian weddings, festivals, and cultural events.',
      features: [
        'Indian Wedding Videography',
        'Festival & Cultural Event Coverage',
        'Corporate Videos',
        'Music Videos',
        'Promotional Content',
        'Aerial Videography of Heritage Sites',
      ],
      image: 'https://images.unsplash.com/photo-1551817958-d9d86fb29431?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 'photography',
      title: 'Photography',
      description: 'Our photography services focus on capturing authentic moments with creativity and technical excellence, from traditional Indian ceremonies to contemporary portraits across diverse Indian landscapes.',
      features: [
        'Traditional Indian Wedding Photography',
        'Pre-Wedding Shoots at Heritage Sites',
        'Family Photography with Cultural Themes',
        'Corporate Headshots',
        'Festival & Cultural Event Photography',
        'Product Photography for Indian Brands',
      ],
      image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 'video-editing',
      title: 'Video Editing',
      description: 'Our video editing services transform raw footage into compelling visual stories with professional post-production techniques.',
      features: [
        'Color Grading',
        'Sound Design',
        'Motion Graphics',
        'Visual Effects',
        'Montage Creation',
        'Content Optimization',
      ],
      image: 'https://images.unsplash.com/photo-1574717024453-354056afd6fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 'photo-editing',
      title: 'Photo Editing',
      description: 'Our photo editing services enhance your images with professional retouching and artistic enhancements.',
      features: [
        'Color Correction',
        'Retouching',
        'Background Removal',
        'Composite Creation',
        'HDR Processing',
        'Batch Processing',
      ],
      image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 'album-design',
      title: 'Album Design',
      description: 'Our album design services create beautiful, custom-designed albums to showcase your precious memories, incorporating traditional Indian motifs and contemporary design elements.',
      features: [
        'Wedding Albums',
        'Family Albums',
        'Event Photobooks',
        'Corporate Portfolios',
        'Custom Layouts',
        'Premium Printing',
      ],
      image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1179&q=80',
    },
    {
      id: 'reels-shorts',
      title: 'Reels & Shorts',
      description: 'Our social media content creation services help you engage your audience with compelling short-form videos.',
      features: [
        'Instagram Reels',
        'TikTok Videos',
        'YouTube Shorts',
        'Social Media Ads',
        'Story Content',
        'Trending Formats',
      ],
      image: 'https://images.unsplash.com/photo-1622037022028-07b8eaac4a22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
  ];
  
  // Pricing packages
  const pricingPackages = [
    {
      title: 'Basic',
      price: '$999',
      description: 'Perfect for small events and basic coverage',
      features: [
        '4 Hours of Coverage',
        '1 Videographer/Photographer',
        'Edited Highlights (3-5 minutes)',
        'Digital Delivery',
        'Basic Color Grading',
        '50 Edited Photos',
      ],
      recommended: false,
    },
    {
      title: 'Premium',
      price: '$1,999',
      description: 'Our most popular package for weddings and events',
      features: [
        '8 Hours of Coverage',
        '2 Videographers/Photographers',
        'Cinematic Highlights (5-8 minutes)',
        'Full Ceremony Edit',
        'Advanced Color Grading',
        '200 Edited Photos',
        'Custom Music Licensing',
        'Drone Footage',
      ],
      recommended: true,
    },
    {
      title: 'Luxury',
      price: '$3,499',
      description: 'Comprehensive coverage for your special day',
      features: [
        'Full Day Coverage (12 Hours)',
        '3 Videographers/Photographers',
        'Feature Film (10-15 minutes)',
        'Full Ceremony & Speeches',
        'Premium Color Grading',
        '500+ Edited Photos',
        'Custom Music Licensing',
        'Drone Footage',
        'Same-Day Edit',
        'Printed Album',
      ],
      recommended: false,
    },
  ];
  
  return (
    <div className="bg-primary text-white pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary to-primary/80">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Our <span className="text-accent">Services</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-300 mb-8"
            >
              We offer a comprehensive range of visual storytelling services to meet all your creative needs, with special expertise in capturing the rich cultural diversity and vibrant celebrations of India.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Services Sections */}
      {services.map((service, index) => (
        <section 
          key={service.id}
          id={service.id}
          className={`py-20 service-section ${index % 2 === 1 ? 'bg-black/30' : ''}`}
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={index % 2 === 1 ? 'md:col-start-2' : ''}
              >
                <h2 className="text-3xl font-bold mb-6">
                  {service.title}
                </h2>
                <p className="text-gray-300 mb-6">
                  {service.description}
                </p>
                
                <h3 className="text-xl font-semibold mb-4">What We Offer:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/contact" 
                  className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full font-medium transition-colors inline-block"
                >
                  Get a Quote
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`rounded-xl overflow-hidden ${index % 2 === 1 ? 'md:col-start-1' : ''}`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}
      
      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-primary/90 to-primary service-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6"
            >
              Our <span className="text-accent">Packages</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-300"
            >
              Choose the perfect package for your needs or contact us for a custom quote.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-xl overflow-hidden border ${
                  pkg.recommended 
                    ? 'border-accent bg-accent/10' 
                    : 'border-white/10 bg-white/5'
                } backdrop-blur-lg p-6 relative`}
              >
                {pkg.recommended && (
                  <div className="absolute top-0 right-0 bg-accent text-white text-sm font-medium py-1 px-3 rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                <div className="text-3xl font-bold mb-2 text-accent">{pkg.price}</div>
                <p className="text-gray-400 mb-6">{pkg.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <svg className="w-5 h-5 mr-2 mt-1 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/contact" 
                  className={`w-full text-center py-3 rounded-full font-medium transition-colors block ${
                    pkg.recommended 
                      ? 'bg-accent hover:bg-accent/90 text-white' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  Choose Plan
                </Link>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-300 mb-6">
              Need a custom package tailored to your specific requirements?
            </p>
            <Link 
              to="/contact" 
              className="bg-transparent hover:bg-white/10 text-white border border-white px-8 py-3 rounded-full font-medium transition-colors inline-block"
            >
              Request Custom Quote
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-black/30 service-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-12 text-center"
            >
              Frequently Asked <span className="text-accent">Questions</span>
            </motion.h2>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-xl"
              >
                <h3 className="text-xl font-bold mb-3">How far in advance should I book your services?</h3>
                <p className="text-gray-300">
                  We recommend booking at least 6-8 months in advance for weddings and 2-3 months for other events to ensure availability. Popular dates can book up quickly, especially during the Indian wedding season from October to February and during major festivals.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-xl"
              >
                <h3 className="text-xl font-bold mb-3">How long does it take to receive the final edited photos/videos?</h3>
                <p className="text-gray-300">
                  Typically, we deliver photos within 3-4 weeks and videos within 6-8 weeks after your event. For rush delivery, additional fees may apply.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-xl"
              >
                <h3 className="text-xl font-bold mb-3">Do you travel for events?</h3>
                <p className="text-gray-300">
                  Yes, we are available for travel both domestically and internationally. Travel fees may apply depending on the location and duration of the event.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-xl"
              >
                <h3 className="text-xl font-bold mb-3">What is your payment policy?</h3>
                <p className="text-gray-300">
                  We require a 50% deposit to secure your date, with the remaining balance due one week before the event. We accept credit cards, bank transfers, and cash payments.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-xl"
              >
                <h3 className="text-xl font-bold mb-3">Can I request specific shots or styles?</h3>
                <p className="text-gray-300">
                  Absolutely! We encourage clients to share their vision, preferences, and any specific shots they'd like us to capture. Whether it's traditional Indian wedding rituals, cultural performances, or modern corporate events, we'll work closely with you to understand your style and expectations.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
            >
              Ready to Discuss Your Project?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-white/90 mb-8 text-lg"
            >
              Contact us today for a free consultation and quote tailored to your specific needs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/contact" 
                className="bg-white hover:bg-white/90 text-accent px-8 py-3 rounded-full font-medium transition-colors inline-block"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
