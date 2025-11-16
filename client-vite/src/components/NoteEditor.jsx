import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, FileText, Trash2, Plus, Moon, Sun, LogOut } from 'lucide-react'
import axios from 'axios'
import { useTheme } from '../context/ThemeContext'
import API_BASE_URL from '../config/api'

export default function NoteEditor({ user, onLogout, onAuthRequired }) {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '' })
  const [isLoading, setIsLoading] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    if (user) {
      fetchNotes()
    }
  }, [user])

  const fetchNotes = async () => {
    if (!user) return
    try {
      const response = await axios.get(`${API_BASE_URL}/notes/${user.userId}`)
      setNotes(response.data)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  const saveNote = async () => {
    if (!user) {
      onAuthRequired()
      return
    }
    if (!currentNote.title.trim() || !currentNote.content.trim()) return
    
    setIsLoading(true)
    try {
      if (currentNote.id) {
        await axios.put(`${API_BASE_URL}/notes/${currentNote.id}`, currentNote)
      } else {
        await axios.post(`${API_BASE_URL}/notes`, { ...currentNote, userId: user.userId })
      }
      fetchNotes()
      setCurrentNote({ id: null, title: '', content: '' })
    } catch (error) {
      console.error('Error saving note:', error)
    }
    setIsLoading(false)
  }

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/notes/${id}`)
      fetchNotes()
      if (currentNote.id === id) {
        setCurrentNote({ id: null, title: '', content: '' })
      }
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`w-full md:w-72 lg:w-80 glass-effect border-b md:border-r md:border-b-0 p-3 md:p-4 lg:p-6 ${
          isDark ? 'border-white/20' : 'border-gray-300/30'
        }`}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (!user) {
              onAuthRequired()
              return
            }
            setCurrentNote({ id: null, title: '', content: '' })
          }}
          className={`w-full mb-3 md:mb-4 lg:mb-6 px-3 md:px-4 py-2 md:py-3 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm md:text-base ${
            isDark 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-pink-500 hover:bg-pink-600 text-white'
          }`}
        >
          <Plus size={20} />
          New Note
        </motion.button>

        <div className="space-y-2 md:space-y-3 max-h-32 md:max-h-40 lg:max-h-none overflow-y-auto">
          {notes.map((note) => (
            <motion.div
              key={note._id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setCurrentNote({ id: note._id, title: note.title, content: note.content })}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                currentNote.id === note._id 
                  ? (isDark ? 'bg-white/20' : 'bg-gray-200/50') 
                  : (isDark ? 'bg-white/10 hover:bg-white/15' : 'bg-white/30 hover:bg-white/40')
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className={`font-medium truncate ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>{note.title}</h3>
                  <p className={`text-sm mt-1 ${
                    isDark ? 'text-white/70' : 'text-gray-600'
                  }`}>{note.content.substring(0, 50)}...</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteNote(note._id)
                  }}
                  className={`ml-2 transition-colors ${
                    isDark ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-600'
                  }`}
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 p-3 md:p-4 lg:p-8 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="glass-effect rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-8 h-full flex flex-col"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 md:mb-4 lg:mb-6 gap-3 sm:gap-0">
              <div className="flex items-center gap-3">
                <FileText className={isDark ? 'text-white' : 'text-gray-800'} size={24} />
                <div>
                  <h1 className={`text-2xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>Modern Notepad</h1>
                  <p className={`text-sm ${
                    isDark ? 'text-white/60' : 'text-gray-600'
                  }`}>Welcome, {user.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={onLogout}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400' : 'bg-red-100 hover:bg-red-200 text-red-600'
                  }`}
                >
                  <LogOut size={18} />
                </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={saveNote}
                disabled={isLoading}
                className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 ${
                  isDark 
                    ? 'bg-slate-600 hover:bg-slate-700 text-white' 
                    : 'bg-rose-500 hover:bg-rose-600 text-white'
                }`}
              >
                <Save size={18} />
                {isLoading ? 'Saving...' : 'Save'}
              </motion.button>
              </div>
            </div>

            <div className="space-y-2 md:space-y-3 lg:space-y-4 flex-1 flex flex-col min-h-0">
              <input
                type="text"
                placeholder="Note title..."
                value={currentNote.title}
                onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  isDark 
                    ? 'bg-white/10 border border-white/20 text-white placeholder-white/50' 
                    : 'bg-white/50 border border-gray-300/50 text-gray-800 placeholder-gray-500'
                }`}
              />
              
              <textarea
                placeholder="Start writing your note..."
                value={currentNote.content}
                onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                className={`w-full flex-1 min-h-32 md:min-h-48 lg:min-h-96 rounded-lg px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors text-sm md:text-base ${
                  isDark 
                    ? 'bg-white/10 border border-white/20 text-white placeholder-white/50' 
                    : 'bg-white/50 border border-gray-300/50 text-gray-800 placeholder-gray-500'
                }`}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}