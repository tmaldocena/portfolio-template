import { motion, MotionValue, useTransform } from 'framer-motion'

interface AnimatedLetterProps {
  char: string
  index: number
  totalChars: number
  scrollYProgress: MotionValue<number>
}

export function AnimatedLetter({ char, index, totalChars, scrollYProgress }: AnimatedLetterProps) {
  const charProgress = index / totalChars
  const opacity = useTransform(
    scrollYProgress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.2, 1]
  )

  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {char}
    </motion.span>
  )
}
