import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Careers</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
              <li><a href="#" className="hover:text-gray-300">Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Products</a></li>
              <li><a href="#" className="hover:text-gray-300">Solutions</a></li>
              <li><a href="#" className="hover:text-gray-300">Pricing</a></li>
              <li><a href="#" className="hover:text-gray-300">Support</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-300">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-gray-300">GDPR</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Twitter</a></li>
              <li><a href="#" className="hover:text-gray-300">LinkedIn</a></li>
              <li><a href="#" className="hover:text-gray-300">Facebook</a></li>
              <li><a href="#" className="hover:text-gray-300">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Fitness Buddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;