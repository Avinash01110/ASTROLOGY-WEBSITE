'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Home, BookOpen, ShoppingBag, PenTool, Info, PhoneCall, GraduationCap, LogIn, LogOut, User, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useSession, signIn, signOut } from "next-auth/react"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/signin' })
  }

  const navItems = [
    { label: 'Home', labelHi: 'होम', href: '/', icon: Home },
    { label: 'Services', labelHi: 'सेवाएं', href: '/services', icon: BookOpen },
    { label: 'Shop', labelHi: 'दुकान', href: '/shop', icon: ShoppingBag },
    { label: 'Blog', labelHi: 'ब्लॉग', href: '/blog', icon: PenTool },
    { label: 'About', labelHi: 'हमारे बारे में', href: '/about', icon: Info },
    { label: 'Contact', labelHi: 'संपर्क', href: '/contact', icon: PhoneCall },
    { label: 'Study', labelHi: 'अध्ययन', href: '/study', icon: GraduationCap },
  ]

  // Fetch cart items when session changes
  useEffect(() => {
    const fetchCartItems = async () => {
      if (session && session.user) {
        try {
          const response = await fetch('/api/cart')
          if (response.ok) {
            const data = await response.json()
            if (data.cartItems && Array.isArray(data.cartItems)) {
              setCartItemCount(data.cartItems.length)
            }
          }
        } catch (error) {
          console.error('Failed to fetch cart items:', error)
        }
      } else {
        setCartItemCount(0)
      }
    }

    fetchCartItems()
    
    // Setup event listener for cart updates
    window.addEventListener('cartUpdated', fetchCartItems)
    
    return () => {
      window.removeEventListener('cartUpdated', fetchCartItems)
    }
  }, [session])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Create a custom Cart item with notification badge
  const CartNavItem = () => (
    <Link
      href="/cart"
      className={`flex flex-col items-center px-3 py-2 rounded-md text-sm font-medium relative ${
        pathname === '/cart'
          ? 'bg-royal-gold text-nebula-indigo'
          : 'text-starlight-silver hover:bg-celestial-blue hover:text-starlight-silver'
      } transition-colors duration-200`}
    >
      <div className="relative">
        <ShoppingCart className="w-5 h-5 mb-1" />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItemCount > 99 ? '99+' : cartItemCount}
          </span>
        )}
      </div>
      <span>Cart</span>
      <span className="text-xs">कार्ट</span>
    </Link>
  )

  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-nebula-indigo/90 backdrop-blur-md shadow-lg' : 'bg-nebula-indigo/50 backdrop-blur-sm'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif font-bold text-royal-gold hover:text-royal-gold-light transition-colors">
            Nakshatra Gyaan<br />
            <span className="text-sm">नक्षत्र ज्ञान</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex space-x-1 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-royal-gold text-nebula-indigo'
                    : 'text-starlight-silver hover:bg-celestial-blue hover:text-starlight-silver'
                } transition-colors duration-200`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span>{item.label}</span>
                <span className="text-xs">{item.labelHi}</span>
              </Link>
            ))}
            
            {/* Cart with notification badge */}
            <CartNavItem />

            {/* User Profile / Sign In / Sign Out Button */}
            {status !== 'loading' && (
              session ? (
                <div className="flex items-center space-x-2 ml-4">
                  <Link
                    href="/profile"
                    className="flex items-center bg-celestial-blue/20 px-3 py-2 rounded-md hover:bg-celestial-blue/30 transition-colors"
                  >
                    <User className="w-5 h-5 mr-2" />
                    <span className="text-starlight-silver">{session.user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-2 px-4 rounded-md text-black hover:text-gray-700 transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="ml-4 px-4 py-2 font-bold bg-royal-gold text-nebula-indigo hover:bg-goldenrod rounded-md transition-colors flex items-center"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </button>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-royal-gold hover:text-royal-gold-light"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav 
            className="lg:hidden mt-4 space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center py-2 px-4 rounded-md ${
                  pathname === item.href
                    ? 'bg-royal-gold text-nebula-indigo'
                    : 'text-starlight-silver hover:bg-celestial-blue hover:text-starlight-silver'
                } transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="flex flex-col">
                  <span>{item.label}</span>
                  <span className="text-xs">{item.labelHi}</span>
                </span>
              </Link>
            ))}
            
            {/* Cart with notification badge for mobile */}
            <Link
              href="/cart"
              className={`flex items-center py-2 px-4 rounded-md ${
                pathname === '/cart'
                  ? 'bg-royal-gold text-nebula-indigo'
                  : 'text-starlight-silver hover:bg-celestial-blue hover:text-starlight-silver'
              } transition-colors duration-200`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="relative mr-3">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </div>
              <span className="flex flex-col">
                <span>Cart</span>
                <span className="text-xs">कार्ट</span>
              </span>
            </Link>

            {/* User Profile / Sign In / Sign Out Button for Mobile */}
            {status !== 'loading' && (
              session ? (
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    className="flex items-center py-2 px-4 bg-celestial-blue/20 rounded-md hover:bg-celestial-blue/30 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5 mr-3" />
                    <span className="text-starlight-silver">{session.user.name}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center py-2 px-4 rounded-md text-black hover:text-gray-700 transition-colors w-full"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    signIn()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center py-2 px-4 rounded-md bg-royal-gold text-nebula-indigo hover:bg-goldenrod transition-colors w-full"
                >
                  <LogIn className="w-5 h-5 mr-3" />
                  Sign In
                </button>
              )
            )}
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}