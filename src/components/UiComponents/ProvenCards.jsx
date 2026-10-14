import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  { 
    id: 1, 
    title: "Form study 01", 
    bgColor: "bg-blue-500", 
    image: "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect width=%22400%22 height=%22300%22 fill=%22%23090b12%22/%3E%3Ccircle cx=%22200%22 cy=%22150%22 r=%2290%22 fill=%22%2300d4ff%22 fill-opacity=%22.5%22/%3E%3Cellipse cx=%22200%22 cy=%22150%22 rx=%22160%22 ry=%2260%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22/%3E%3C/svg%3E",
    content: "Procedural geometry concept"
  },
  { 
    id: 2, 
    title: "Form study 02", 
    bgColor: "bg-green-500", 
    image: "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect width=%22400%22 height=%22300%22 fill=%22%23090b12%22/%3E%3Ccircle cx=%22200%22 cy=%22150%22 r=%2290%22 fill=%22%237b2fff%22 fill-opacity=%22.5%22/%3E%3Cellipse cx=%22200%22 cy=%22150%22 rx=%22160%22 ry=%2260%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22/%3E%3C/svg%3E",
    content: "Motion design concept"
  }
];

const ProvenCards = ({ onCardChange }) => {
  const containerRef = useRef(null);
  const cardsRefs = useRef([]);

  useGSAP(() => {
    const sectionSelector = "#proven-impact-section";
    let currentActiveCard = 0;
    
    const notifyCardChange = (cardIndex) => {
      if (currentActiveCard !== cardIndex && onCardChange) {
        currentActiveCard = cardIndex;
        onCardChange(cardIndex);
      }
    };

    // Initial setup - first card at stack position (y: 0), second card below it (y: 300)
    cardsRefs.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, {
          y: index === 0 ? 0 : 300, // First card at stack position, second card below
          opacity: index === 0 ? 1 : 0, // Only active card visible
          scale: 1, // Same scale for both
          zIndex: index === 0 ? 2 : 1, // First card has higher z-index initially
          transformOrigin: "center center",
          rotationX: 0 // No rotation
        });
      }
    });

    // Initial notification
    notifyCardChange(0);

    ScrollTrigger.create({
      trigger: sectionSelector,
      start: "top top",
      end: "+=500%",
      scrub: 1,
      onUpdate: (self) => {
        const totalCards = cardsData.length;
        const cardPhaseStart = 2 / 23;
        const cardPhaseEnd = 10 / 23;
        
        if (self.progress >= cardPhaseStart && self.progress <= cardPhaseEnd) {
          const cardPhaseProgress = (self.progress - cardPhaseStart) / (cardPhaseEnd - cardPhaseStart);
          const smoothedProgress = Math.pow(cardPhaseProgress, 0.7);
          const activeCardIndex = Math.floor(smoothedProgress * totalCards);
          const clampedActiveIndex = Math.min(Math.max(activeCardIndex, 0), totalCards - 1);
          
          // Animate card transitions with synchronized movement
          if (clampedActiveIndex !== currentActiveCard) {
            
            // Forward scroll - second card (index 1) moves to stack position, first card (index 0) moves down
            if (clampedActiveIndex > currentActiveCard) {
              
              // Move the second card (index 1) from y:300 to stack position (y:0)
              const secondCard = cardsRefs.current[1];
              if (secondCard) {
                gsap.to(secondCard, {
                  y: 0, // Stack position
                  scale: 1,
                  opacity: 1, // Make visible
                  zIndex: 2, // Higher z-index for active card
                  rotationX: 0,
                  duration: 0.8,
                  ease: "power2.out"
                });
              }
              
              // Move the first card (index 0) from stack position (y:0) to bottom (y:300)
              const firstCard = cardsRefs.current[0];
              if (firstCard) {
                gsap.to(firstCard, {
                  y: 300, // Move down to bottom position
                  scale: 1,
                  opacity: 0, // Hide non-active card
                  zIndex: 1, // Lower z-index
                  rotationX: 0,
                  duration: 0.8,
                  ease: "power2.out"
                });
              }
            }
            
            // Backward scroll - first card moves back to stack position, second card moves down
            else if (clampedActiveIndex < currentActiveCard) {
              
              // Move the first card (index 0) from y:300 back to stack position (y:0)
              const firstCard = cardsRefs.current[0];
              if (firstCard) {
                gsap.to(firstCard, {
                  y: 0, // Stack position
                  scale: 1,
                  opacity: 1, // Make visible
                  zIndex: 2, // Higher z-index for active card
                  rotationX: 0,
                  duration: 0.8,
                  ease: "power2.out"
                });
              }
              
              // Move the second card (index 1) from stack position (y:0) back to bottom (y:300)
              const secondCard = cardsRefs.current[1];
              if (secondCard) {
                gsap.to(secondCard, {
                  y: 300, // Move down to bottom position
                  scale: 1,
                  opacity: 0, // Hide non-active card
                  zIndex: 1, // Lower z-index
                  rotationX: 0,
                  duration: 0.8,
                  ease: "power2.out"
                });
              }
            }
          }
          
          notifyCardChange(clampedActiveIndex);
        }
      }
    });

  }, [onCardChange]);

  return (
    <div className="w-full" ref={containerRef}>
      <div className="relative h-[25vh] lg:h-[40vh] overflow-visible lg:w-[40vw]">
        <div className="relative h-full w-full flex items-center justify-center">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => cardsRefs.current[index] = el}
              className={`absolute h-full w-full rounded-lg shadow-xl will-change-transform`}
            >
              <div className="h-full w-full flex flex-col items-center justify-center p-6 text-white">
                <img
                  src={card.image}
                  className="h-full w-full object-contain mb-4"
                  alt={card.title}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProvenCards;
