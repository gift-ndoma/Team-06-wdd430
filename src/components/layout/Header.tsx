'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../ui/Logo';
import { useCart } from '../cart/CartProvider';
import type { User } from '@/app/lib/definitions';
import { logout } from "@/app/lib/actions";
import './Header.css';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Artisans', href: '/artisans' },
  { name: 'About', href: '/about' },
];

export default function Header({ user }: { user: User | null }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();


  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <Link href="/" className="header__logo-link">
          <Logo size="large" showText={true} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.href} className="header__nav-item">
                <Link
                  href={link.href}
                  className={`header__nav-link ${
                    pathname === link.href ? 'header__nav-link--active' : ''
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side Actions */}
        <div className="header__actions">
          {/* Cart Icon with Badge */}
            <Link href="/cart" className="header__action-btn header__cart-btn" aria-label="Cart">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="header__cart-badge">{itemCount}</span>
            </Link>

          {
            user ?
            (< >
              <form className="header__logout-form" action={logout}>
                <button className="header__login-btn">
                  Logout
                </button>
              </form>
              <Link href="/user" className="header__login-btn">
                Profile
              </Link>
            </ >):
            (<Link href="/login" className="header__login-btn">
              Login
            </Link>)
          }

          {/* Mobile Menu Toggle */}
          <button
            className="header__mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="header__hamburger">
              <span className="header__hamburger-line"></span>
              <span className="header__hamburger-line"></span>
              <span className="header__hamburger-line"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__overlay" onClick={closeMobileMenu}></div>
        <div className="mobile-menu__content">
          <div className="mobile-menu__header">
            <Logo size="small" showText={true} />
            <button
              className="mobile-menu__close"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="mobile-menu__nav">
            <ul className="mobile-menu__nav-list">
              {navLinks.map((link) => (
                <li key={link.href} className="mobile-menu__nav-item">
                  <Link
                    href={link.href}
                    className={`mobile-menu__nav-link ${
                      pathname === link.href ? 'mobile-menu__nav-link--active' : ''
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu__actions">
            {
              user ?
              (< >
                <form className="header__logout-form" action={logout}>
                  <button className="mobile-menu__login-btn" onClick={closeMobileMenu}>
                    Logout
                  </button>
                </form>
                <Link href="/user" className="mobile-menu__login-btn" onClick={closeMobileMenu}>
                  Profile
                </Link>
              </ >):
              (<Link href="/login" className="mobile-menu__login-btn" onClick={closeMobileMenu}>
                Login
              </Link>)
            }
          </div>
        </div>
      </div>
    </header>
  );
}
