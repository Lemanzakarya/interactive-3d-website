import { useRef, forwardRef, useImperativeHandle } from 'react'
import gsap from 'gsap'

const NavigationOverlay = forwardRef((props, ref) => {
  const whiteOverlayRef = useRef(null)
  const blueOverlayRef = useRef(null)

  useImperativeHandle(ref, () => ({
    animateToSection: (sectionId) => {
      // Animate both overlays from y: -100% to y: 0 with slight stagger
      const tl = gsap.timeline({
        onComplete: () => {
          // Scroll to section
          const targetSection = document.getElementById(sectionId)
          if (targetSection) {
            targetSection.scrollIntoView({ 
              behavior: 'instant',
              block: 'start'
            })
          }
          
          // Create exit timeline to ensure both animate back together
          const exitTl = gsap.timeline({ delay: 0.3 })

          exitTl.to(blueOverlayRef.current, {
            y: '-100%',
            duration: 1.0,
            ease: 'expo.inOut'
          })
          .to(whiteOverlayRef.current, {
            y: '-100%',
            duration: 1.0,
            ease: 'expo.inOut'
          }, '-=0.9') // Start white animation slightly after yellow starts
        }
      })
      
      tl.fromTo(whiteOverlayRef.current, 
        { y: '-100%' },
        { 
          y: '0%', 
          duration: 1.0, 
          ease: 'expo.inOut'
        }
      )
      .fromTo(blueOverlayRef.current, 
        { y: '-100%' },
        { 
          y: '0%', 
          duration: 1.0, 
          ease: 'expo.inOut'
        }, 
        '-=0.9' // Start yellow animation slightly after white
      )
    }
  }))

  return (
    <>
      {/* Black transparent base layer */}
      <div 
        ref={whiteOverlayRef}
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{ 
          transform: 'translateY(-100%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }}
      />
      {/* Black transparent top layer */}
      <div
        ref={blueOverlayRef}
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{ 
          transform: 'translateY(-100%)',
          backgroundColor: 'rgba(0, 0, 0, 0.9)'
        }}
      />
    </>
  )
})

NavigationOverlay.displayName = 'NavigationOverlay'

export default NavigationOverlay
