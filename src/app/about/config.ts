// src/app/about/config.ts
// All your about page content in one place - easy to edit!

export const aboutConfig = {
  hero: {
    label: "About Handcrafted Haven",
    title: "Connecting artisans with customers who love handmade beauty",
    subtitle: "A marketplace where creativity meets commerce, and every product tells a unique story",
    buttons: [
      { text: "Explore Marketplace", link: "/products", primary: true },
      { text: "Become a Seller", link: "/signup", primary: false }
    ]
  },

  quickLinks: [
    { title: 'Our Story', icon: '📖', desc: 'How we began', link: '/about/story' },
    { title: 'Meet the Makers', icon: '🎨', desc: 'Our artisan community', link: '/artisans' },
    { title: 'Sustainability', icon: '🌱', desc: 'Our commitment', link: '/about/sustainability' },
    { title: 'Contact', icon: '💬', desc: 'Get in touch', link: '/contact' }
  ],

  vision: {
    label: "Our Vision",
    title: "Building the future of handmade commerce",
    text: "Our vision is to become the most trusted marketplace for handcrafted treasures, where creativity and culture thrive. We envision a world where artisans can sustainably build their craft, customers discover one-of-a-kind products, and traditional craftsmanship is celebrated and preserved for future generations."
  },

  values: [
    {
      title: 'Support Local Artisans',
      desc: 'Empowering makers to build sustainable businesses and share their craft with the world',
      icon: '🤝'
    },
    {
      title: 'Celebrate Creativity',
      desc: 'Every product tells a unique story. We champion originality and artistic expression',
      icon: '✨'
    },
    {
      title: 'Promote Sustainability',
      desc: 'Handmade products reduce waste and support eco-friendly practices in production',
      icon: '♻️'
    },
    {
      title: 'Deliver Quality Craftsmanship',
      desc: 'We curate only the finest handcrafted products that meet our quality standards',
      icon: '🏆'
    }
  ],

  trustedBy: [
    'Local Craft Communities',
    'Small Businesses',
    'Handmade Lovers',
    'Creative Entrepreneurs'
  ],

  stats: [
    { number: '200+', label: 'Handmade Products' },
    { number: '50+', label: 'Verified Artisans' },
    { number: '1K+', label: 'Happy Customers' },
    { number: '2026', label: 'Founded' }
  ],

  spotlight: [
    { title: 'Trending Handmade Jewelry', icon: '💍', color: '#FFE5E5', link: '/products?category=jewelry' },
    { title: 'Custom Gift Collections', icon: '🎁', color: '#E5F5FF', link: '/products?category=gifts' },
    { title: 'Home Décor Picks', icon: '🏠', color: '#FFF5E5', link: '/products?category=home' },
    { title: 'Seasonal Handmade Specials', icon: '🌸', color: '#F0FFE5', link: '/products?category=seasonal' }
  ],

  team: [
    { name: 'Sarah Mitchell', role: 'Founder & CEO', initials: 'SM', color: '#FF6B6B' },
    { name: 'Marcus Chen', role: 'Head of Artisan Relations', initials: 'MC', color: '#4ECDC4' },
    { name: 'Amara Okafor', role: 'Community Manager', initials: 'AO', color: '#FFE66D' },
    { name: 'David Park', role: 'Customer Experience Lead', initials: 'DP', color: '#A8E6CF' },
    { name: 'Lucia Rodriguez', role: 'Sustainability Director', initials: 'LR', color: '#95E1D3' }
  ],

  community: {
    stats: [
      { icon: '👥', title: 'Active Members', subtitle: 'Growing daily' },
      { icon: '🎪', title: 'Monthly Events', subtitle: 'Virtual & In-person' },
      { icon: '📚', title: 'Learning Resources', subtitle: 'Free for all' }
    ]
  },

  cta: {
    title: "Ready to discover something truly unique?",
    subtitle: "Join thousands of customers supporting artisans worldwide",
    buttons: [
      { text: "Start Shopping", link: "/products", primary: true },
      { text: "Join as an Artisan", link: "/signup", primary: false }
    ]
  }
};
