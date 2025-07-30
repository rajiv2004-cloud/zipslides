'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Upload, File, X, Copy, ExternalLink, Zap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  shareLink: string
  uploadedAt: Date
}

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true)
    
    try {
      for (const file of acceptedFiles) {
        // Validate file type
        const validTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']
        if (!validTypes.includes(file.type)) {
          toast.error(`${file.name} is not a valid file type. Please upload PPT or PDF files.`)
          continue
        }

        // Validate file size (50MB limit)
        if (file.size > 50 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Maximum file size is 50MB.`)
          continue
        }

        // Simulate upload
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Generate mock data
        const uploadedFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
          shareLink: `https://zipslides.com/share/${Math.random().toString(36).substr(2, 9)}`,
          uploadedAt: new Date()
        }

        setUploadedFiles(prev => [uploadedFile, ...prev])
        toast.success(`${file.name} uploaded successfully!`)
      }
    } catch (error) {
      toast.error('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    },
    multiple: true
  })

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Link copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy link')
    }
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
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-dark-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Zipslides
          </span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Upload Your Presentation</h1>
          <p className="text-xl text-dark-300">
            Drag and drop your PPT or PDF files to get instant sharing links
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
              isDragActive
                ? 'border-primary-500 bg-primary-900/20'
                : 'border-dark-600 hover:border-primary-500 hover:bg-dark-800/50'
            }`}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xl font-semibold text-white mb-2">
                  {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                </p>
                <p className="text-dark-300 mb-4">
                  or click to browse files
                </p>
                <p className="text-sm text-dark-400">
                  Supports PDF, PPT, PPTX (Max 50MB per file)
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upload Progress */}
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-8"
          >
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
              <div>
                <p className="text-white font-medium">Uploading files...</p>
                <p className="text-sm text-dark-300">Please wait while we process your files</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-6">Your Presentations</h2>
            
            {uploadedFiles.map((file) => (
              <motion.div
                key={file.id}
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
                      <h3 className="font-semibold text-white">{file.name}</h3>
                      <p className="text-sm text-dark-300">
                        {formatFileSize(file.size)} • {file.uploadedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(file.shareLink)}
                      className="btn-secondary px-3 py-2 text-sm flex items-center space-x-1"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy Link</span>
                    </button>
                    <a
                      href={file.shareLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary px-3 py-2 text-sm flex items-center space-x-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View</span>
                    </a>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-dark-700 rounded-lg">
                  <p className="text-sm text-dark-300 mb-2">Share Link:</p>
                  <div className="flex items-center space-x-2">
                                         <input
                       type="text"
                       value={file.shareLink}
                       readOnly
                       className="flex-1 input-field text-sm"
                       title="Share link"
                       aria-label="Share link"
                     />
                                         <button
                       onClick={() => copyToClipboard(file.shareLink)}
                       className="btn-secondary px-3 py-2 text-sm"
                       title="Copy link to clipboard"
                     >
                       <Copy className="w-4 h-4" />
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Easy Upload</h3>
            <p className="text-dark-300">Drag and drop your files or click to browse</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-space-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Copy className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Instant Links</h3>
            <p className="text-dark-300">Get shareable links immediately after upload</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Global Access</h3>
            <p className="text-dark-300">Your presentations are accessible worldwide</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 