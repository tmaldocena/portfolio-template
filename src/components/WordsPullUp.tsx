import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface WordsPullUpProps {
  text: string
  className?: string
  style?: React.CSSProperties
  showAsterisk?: boolean
}

export function WordsPullUp({ text, className = '', style, showAsterisk }: WordsPullUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <span key={i} className="overflow-hidden inline-block" style={{ marginRight: i < words.length - 1 ? '0.25em' : 0 }}>
            <motion.span
              className="inline-block relative"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
              {isLast && showAsterisk && (
                <span
                  style={{
                    position: 'absolute',
                    top: '0.65em',
                    right: '-0.3em',
                    fontSize: '0.31em',
                    lineHeight: 1,
                  }}
                >
                  *
                </span>
              )}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
