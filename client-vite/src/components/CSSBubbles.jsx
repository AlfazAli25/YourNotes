import { useEffect, useState } from 'react'

export default function CSSBubbles() {
  const [bubbles, setBubbles] = useState([])

  useEffect(() => {
    const createBubble = () => {
      const bubble = {
        id: Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 60 + 20,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5
      }
      
      setBubbles(prev => [...prev, bubble])
      
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== bubble.id))
      }, (bubble.duration + bubble.delay) * 1000)
    }

    const interval = setInterval(createBubble, 2000)
    
    // Create initial bubbles
    for (let i = 0; i < 5; i++) {
      setTimeout(createBubble, i * 1000)
    }

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 -z-30 pointer-events-none">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="floating-bubble"
          style={{
            left: `${bubble.left}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`
          }}
        />
      ))}
    </div>
  )
}