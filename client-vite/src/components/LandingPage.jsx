import { motion } from 'framer-motion'
import { FileText, Heart, Sparkles } from 'lucide-react'

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-3 md:p-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl md:rounded-3xl p-4 md:p-8 lg:p-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <FileText className="mx-auto text-white mb-4" size={64} />
            <Heart className="mx-auto text-pink-400 -mt-8 ml-12" size={24} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
          >
            Modern Notepad
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm md:text-lg lg:text-xl text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto px-2"
          >
            Where your thoughts dance with floating hearts ✨ Create, dream, and express yourself 
            in the most enchanting digital space designed just for you 💕
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8 text-sm md:text-base"
          >
            <div className="flex items-center gap-2 text-white/70">
              <Sparkles size={20} />
              <span>3D Animations</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Heart size={20} />
              <span>Heart Bubbles</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <FileText size={20} />
              <span>Personal Notes</span>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}