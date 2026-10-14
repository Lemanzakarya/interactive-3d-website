import { Link } from "react-router-dom"
import { useRef, useEffect, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Navbar = ({ navigationOverlayRef }) => {
  const navbarRef = useRef(null)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const mouseMoveTicking = useRef(false)
  const isMouseNearTop = useRef(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const mobileMenuRef = useRef(null)
  const mobileLinksRef = useRef([])
  const tl = useRef(null)
  const contactButtonRef = useRef(null)
  const contactButtonFillRef = useRef(null)
  const mobileContactButtonRef = useRef(null)
  const mobileContactButtonFillRef = useRef(null)

  // Navigation section mapping
  const sectionMap = {
    'sahne': 'stackcards',
    'etkileşim': 'services', 
    'yaklaşım': 'details',
    'teknik': 'team',
    'canlı sahne': 'launchlab'
  }

  const handleNavigation = (e, sectionKey) => {
    e.preventDefault()
    const sectionId = sectionMap[sectionKey]
    if (navigationOverlayRef?.current && sectionId) {
      navigationOverlayRef.current.animateToSection(sectionId)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const scrollDifference = currentScrollY - lastScrollY.current

          // Track scroll state for logo visibility
          setIsScrolled(currentScrollY > 50)

          if (Math.abs(scrollDifference) > 5) {
            if (scrollDifference > 0 && currentScrollY > 100) {
              if (!isMouseNearTop.current) {
                gsap.to(navbarRef.current, {
                  y: -100,
                  duration: 1,
                  ease: "power2.out"
                })
              }
            } else if (scrollDifference < 0) {
              gsap.to(navbarRef.current, {
                y: 0,
                duration: 1,
                ease: "power2.out"
              })
            }
          }

          lastScrollY.current = currentScrollY
          ticking.current = false
        })
        ticking.current = true
      }
    }

    const handleMouseMove = (e) => {
      if (!mouseMoveTicking.current) {
        requestAnimationFrame(() => {
          const mouseY = e.clientY
          const topThreshold = 100
          
          if (mouseY <= topThreshold && !isMouseNearTop.current) {
            isMouseNearTop.current = true
            gsap.to(navbarRef.current, {
              y: 0,
              duration: 1,
              ease: "power2.out"
            })
          } else if (mouseY > topThreshold && isMouseNearTop.current) {
            isMouseNearTop.current = false
          }
          
          mouseMoveTicking.current = false
        })
        mouseMoveTicking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Mobile menu animation setup
  useEffect(() => {
    if (tl.current) {
      tl.current.kill()
    }
    
    tl.current = gsap.timeline({ paused: true })
    
    if (mobileMenuRef.current && mobileLinksRef.current.length > 0) {
      // Set initial states
      gsap.set(mobileMenuRef.current, { opacity: 0 })
      gsap.set(mobileLinksRef.current, { 
        opacity: 0, 
        y: 30,
        scale: 0.9
      })
      
      // Create the timeline
      tl.current
        .to(mobileMenuRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(mobileLinksRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.2)"
        }, 0.1)
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      setIsMobileMenuOpen(true)
      // Play animation after state update
      setTimeout(() => {
        if (tl.current) {
          tl.current.play()
        }
      }, 10)
    } else {
      // Reverse animation then close menu
      if (tl.current) {
        tl.current.reverse().then(() => {
          setIsMobileMenuOpen(false)
        })
      } else {
        setIsMobileMenuOpen(false)
      }
    }
  }

  const closeMobileMenu = () => {
    if (tl.current) {
      tl.current.reverse().then(() => {
        setIsMobileMenuOpen(false)
      })
    } else {
      setIsMobileMenuOpen(false)
    }
  }

  // Contact button hover animations
  const handleContactButtonHover = (isHovering, fillRef) => {
    if (fillRef.current) {
      if (isHovering) {
        gsap.to(fillRef.current, {
          scaleX: 1,
          duration: .8,
          ease: "expo.inOut"
        })
      } else {
        gsap.to(fillRef.current, {
          scaleX: 0,
          duration: .8,
          ease: "expo.inOut"
        })
      }
    }
  }

  // Handler for logo click to reload the page
  const handleLogoClick = (e) => {
    e.preventDefault();
    // Scroll to top first, then reload
    window.scrollTo(0, 0);
    // Use location.href instead of reload() to ensure scroll position resets
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 100);
  }

  return (
    <>
      <nav 
        ref={navbarRef}
        className="h-[10vh] w-full fixed top-0 left-0 z-[999999] flex justify-between items-center px-4 sm:px-6 lg:px-10"
        style={{ isolation: 'isolate' }}
      >
        {/* Logo and Left Links */}
        <div className="flex gap-8 xl:gap-20 items-center">
          <div className={`logo-container transition-opacity duration-300 ${!isScrolled ? 'md:opacity-100 opacity-0' : 'opacity-100'}`} style={{ isolation: 'isolate' }}>
            <button type="button" onClick={handleLogoClick} aria-label="Go to top" className="mt-4 flex items-center gap-2 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/60 text-sm tracking-widest text-cyan-100">03</span>
              <span className="text-[9px] leading-tight tracking-[0.18em]">FORM /<br />FIELD</span>
            </button>
          </div>
          <button
            className="hidden lg:inline-block uppercase text-xs font-medium whitespace-nowrap cursor-pointer"
            onClick={(e) => handleNavigation(e, 'sahne')}
            style={{ mixBlendMode: "exclusion" }}
          >
            Sahne
          </button>
          <button
            className="hidden lg:inline-block uppercase text-xs font-medium whitespace-nowrap cursor-pointer"
            onClick={(e) => handleNavigation(e, 'etkileşim')}
            style={{ mixBlendMode: "exclusion" }}
          >
            Etkileşim
          </button>
        </div>

        {/* Right Links */}
        <div className="hidden lg:flex gap-8 xl:gap-20 items-center">
          <button
            className="uppercase font-medium text-xs whitespace-nowrap cursor-pointer"
            onClick={(e) => handleNavigation(e, 'yaklaşım')}
            style={{ mixBlendMode: "exclusion" }}
          >
            Yaklaşım
          </button>
          <button
            className="uppercase font-medium text-xs whitespace-nowrap cursor-pointer"
            onClick={(e) => handleNavigation(e, 'teknik')}
            style={{ mixBlendMode: "exclusion" }}
          >
            Teknik
          </button>
          <button
            ref={contactButtonRef}
            className="relative uppercase font-medium text-xs bg-transparent border border-white text-white px-6 xl:px-8 py-1 whitespace-nowrap cursor-pointer overflow-hidden"
            onClick={(e) => handleNavigation(e, 'canlı sahne')}
            onMouseEnter={() => handleContactButtonHover(true, contactButtonFillRef)}
            onMouseLeave={() => handleContactButtonHover(false, contactButtonFillRef)}
            style={{ mixBlendMode: "exclusion" }}
          >
            <div
              ref={contactButtonFillRef}
              className="absolute inset-0 bg-white origin-left"
              style={{ transform: "scaleX(0)" }}
            ></div>
            <span className="relative z-10 mix-blend-difference">Canlı Sahne</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          style={{ mixBlendMode: "exclusion" }}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0.25' : 'mb-1'}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-0.25' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-95"
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
            <button
              ref={el => mobileLinksRef.current[0] = el}
              className="uppercase text-lg font-medium text-white hover:text-gray-300 transition-colors cursor-pointer"
              onClick={(e) => {
                handleNavigation(e, 'sahne')
                closeMobileMenu()
              }}
            >
              Sahne
            </button>
            <button
              ref={el => mobileLinksRef.current[1] = el}
              className="uppercase text-lg font-medium text-white hover:text-gray-300 transition-colors cursor-pointer"
              onClick={(e) => {
                handleNavigation(e, 'etkileşim')
                closeMobileMenu()
              }}
            >
              Etkileşim
            </button>
            <button
              ref={el => mobileLinksRef.current[2] = el}
              className="uppercase text-lg font-medium text-white hover:text-gray-300 transition-colors cursor-pointer"
              onClick={(e) => {
                handleNavigation(e, 'yaklaşım')
                closeMobileMenu()
              }}
            >
              Yaklaşım
            </button>
            <button
              ref={el => mobileLinksRef.current[3] = el}
              className="uppercase text-lg font-medium text-white hover:text-gray-300 transition-colors cursor-pointer"
              onClick={(e) => {
                handleNavigation(e, 'teknik')
                closeMobileMenu()
              }}
            >
              Teknik
            </button>
            <button
              ref={el => {
                mobileLinksRef.current[4] = el
                mobileContactButtonRef.current = el
              }}
              className="relative uppercase font-medium text-lg bg-transparent border border-white text-white px-8 py-3 mt-4 cursor-pointer overflow-hidden"
              onClick={(e) => {
                handleNavigation(e, 'canlı sahne')
                closeMobileMenu()
              }}
              onMouseEnter={() => handleContactButtonHover(true, mobileContactButtonFillRef)}
              onMouseLeave={() => handleContactButtonHover(false, mobileContactButtonFillRef)}
            >
              <div
                ref={mobileContactButtonFillRef}
                className="absolute inset-0 bg-white origin-left"
                style={{ transform: "scaleX(0)" }}
              ></div>
              <span className="relative z-10 mix-blend-difference">Canlı Sahne</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar