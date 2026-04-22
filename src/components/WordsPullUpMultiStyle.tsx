import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Segment {
  text: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  className?: string
}

export function WordsPullUpMultiStyle({ segments, className = '' }: WordsPullUpMultiStyleProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Build a flat array of {word, className} preserving per-segment class
  const words: { word: string; className: string }[] = []
  segments.forEach((seg) => {
    seg.text.split(' ').forEach((w) => {
      if (w) words.push({ word: w, className: seg.className || '' })
    })
  })

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map((item, i) => (
        <span
          key={i}
          className="overflow-hidden inline-block"
          style={{ marginRight: '0.3em' }}
        >
          <motion.span
            className={`inline-block ${item.className}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
