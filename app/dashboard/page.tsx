'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  File, 
  Settings, 
  LogOut, 
  Upload, 
  Copy, 
  ExternalLink, 
  Trash2, 
  Zap,
  Calendar,
  Download,
  Eye
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface Presentation {
  id: string
  name: string
  size: number
  type: string
  shareLink: string
  uploadedAt: Date
  views: number
  downloads: number
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('presentations')
  const [presentations, setPresentations] = useState<Presentation[]>([
    {
      id: '1',
      name: 'Q4 Business Review.pptx',
      size: 2.5 * 1024 * 1024,
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      shareLink: 'https://zipslides.com/share/abc123',
      uploadedAt: new Date('2024-01-15'),
      views: 45,
      downloads: 12
    },
    {
      id: '2',
      name: 'Marketing Strategy.pdf',
      size: 1.8 * 1024 * 1024,
      type: 'application/pdf',
      shareLink: 'https://zipslides.com/share/def456',
      uploadedAt: new Date('2024-01-10'),
      views: 23,
      downloads: 8
    }
  ])

  const router = useRouter()

  const handleLogout = () => {
    toast.success('Logged out successfully')
    router.push('/')
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Link copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const deletePresentation = (id: string) => {
    setPresentations(prev => prev.filter(p => p.id !== id))
    toast.success('Presentation deleted successfully')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen space-bg">
      {/* Navigation */}
      <nav className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Zipslides
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/upload" className="btn-primary flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </Link>
              <button
                onClick={handleLogout}
                className="btn-secondary flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">John Doe</h2>
                <p className="text-dark-300">john.doe@example.com</p>
                <p className="text-sm text-dark-400 mt-2">Member since January 2024</p>
              </div>

              {/* Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-dark-300">Presentations</span>
                  <span className="text-white font-semibold">{presentations.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-300">Total Views</span>
                  <span className="text-white font-semibold">
                    {presentations.reduce((sum, p) => sum + p.views, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-300">Total Downloads</span>
                  <span className="text-white font-semibold">
                    {presentations.reduce((sum, p) => sum + p.downloads, 0)}
                  </span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('presentations')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'presentations'
                      ? 'bg-primary-600 text-white'
                      : 'text-dark-300 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <File className="w-5 h-5" />
                    <span>Presentations</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary-600 text-white'
                      : 'text-dark-300 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5" />
                    <span>Profile Settings</span>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'presentations' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-bold text-white">My Presentations</h1>
                  <Link href="/upload" className="btn-primary flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload New</span>
                  </Link>
                </div>

                {presentations.length === 0 ? (
                  <div className="card text-center py-12">
                    <File className="w-16 h-16 text-dark-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No presentations yet</h3>
                    <p className="text-dark-300 mb-6">Upload your first presentation to get started</p>
                    <Link href="/upload" className="btn-primary">
                      Upload Presentation
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {presentations.map((presentation) => (
                      <motion.div
                        key={presentation.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="card"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                              <File className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{presentation.name}</h3>
                              <div className="flex items-center space-x-4 text-sm text-dark-300">
                                <span>{formatFileSize(presentation.size)}</span>
                                <span>•</span>
                                <span className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{presentation.uploadedAt.toLocaleDateString()}</span>
                                </span>
                                <span>•</span>
                                <span className="flex items-center space-x-1">
                                  <Eye className="w-4 h-4" />
                                  <span>{presentation.views} views</span>
                                </span>
                                <span>•</span>
                                <span className="flex items-center space-x-1">
                                  <Download className="w-4 h-4" />
                                  <span>{presentation.downloads} downloads</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => copyToClipboard(presentation.shareLink)}
                              className="btn-secondary px-3 py-2 text-sm flex items-center space-x-1"
                              title="Copy link"
                            >
                              <Copy className="w-4 h-4" />
                              <span>Copy</span>
                            </button>
                            <a
                              href={presentation.shareLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary px-3 py-2 text-sm flex items-center space-x-1"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>View</span>
                            </a>
                            <button
                              onClick={() => deletePresentation(presentation.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-1 transition-colors"
                              title="Delete presentation"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-dark-700 rounded-lg">
                          <p className="text-sm text-dark-300 mb-2">Share Link:</p>
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={presentation.shareLink}
                              readOnly
                              className="flex-1 input-field text-sm"
                              title="Share link"
                              aria-label="Share link"
                            />
                            <button
                              onClick={() => copyToClipboard(presentation.shareLink)}
                              className="btn-secondary px-3 py-2 text-sm"
                              title="Copy link to clipboard"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold text-white mb-6">Profile Settings</h1>
                
                <div className="card">
                  <h2 className="text-xl font-semibold text-white mb-6">Account Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="John Doe"
                        className="input-field"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="input-field"
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        defaultValue="Acme Corporation"
                        className="input-field"
                        placeholder="Enter your company name"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button className="btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 