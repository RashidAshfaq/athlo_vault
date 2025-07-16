"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, X, FileText, ImageIcon, CheckCircle, AlertCircle, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
  onUpload?: (files: File[]) => void
  className?: string
  variant?: "profile" | "document" | "general"
  currentImage?: string
  label?: string
}

interface UploadedFile {
  file: File
  preview?: string
  status: "uploading" | "success" | "error"
  progress: number
  id: string
}

export function FileUpload({
  accept = "image/*,.pdf,.doc,.docx",
  multiple = false,
  maxSize = 10,
  onUpload,
  className,
  variant = "general",
  currentImage,
  label,
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files)
    const validFiles = fileArray.filter((file) => {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSize}MB.`)
        return false
      }
      return true
    })

    const newFiles: UploadedFile[] = validFiles.map((file) => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      status: "uploading",
      progress: 0,
      id: Math.random().toString(36).substr(2, 9),
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((uploadFile) => {
      simulateUpload(uploadFile.id)
    })

    if (onUpload) {
      onUpload(validFiles)
    }
  }

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setUploadedFiles((prev) =>
          prev.map((file) => (file.id === fileId ? { ...file, status: "success", progress: 100 } : file)),
        )
      } else {
        setUploadedFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, progress } : file)))
      }
    }, 200)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId)
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return prev.filter((f) => f.id !== fileId)
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4" />
    }
    return <FileText className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (variant === "profile") {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden">
                {currentImage || uploadedFiles[0]?.preview ? (
                  <img
                    src={uploadedFiles[0]?.preview || currentImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera className="h-8 w-8 text-slate-500" />
                  </div>
                )}
              </div>
              {uploadedFiles[0]?.status === "uploading" && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="text-white text-xs">{Math.round(uploadedFiles[0].progress)}%</div>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
            >
              <Camera className="h-4 w-4 mr-2" />
              Change Photo
            </Button>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium mb-2">Profile Photo</h3>
            <p className="text-slate-400 text-sm mb-4">
              Upload a professional photo that represents you. This will be visible to investors and fans.
            </p>
            <div className="text-xs text-slate-500">
              Recommended: Square image, at least 400x400px, under {maxSize}MB
            </div>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        className={cn(
          "border-2 border-dashed transition-all duration-200 cursor-pointer",
          isDragOver
            ? "border-amber-500 bg-amber-500/5"
            : "border-slate-700 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-800/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="p-6 text-center">
          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-4" />
          <div className="space-y-2">
            <p className="text-white font-medium">{label || "Click to upload or drag and drop"}</p>
            <p className="text-slate-400 text-sm">
              {accept.includes("image") && "Images, "}
              {accept.includes("pdf") && "PDF, "}
              {accept.includes("doc") && "Documents"} up to {maxSize}MB
            </p>
          </div>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          {uploadedFiles.map((uploadFile) => (
            <Card key={uploadFile.id} className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  {uploadFile.preview ? (
                    <img
                      src={uploadFile.preview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-12 h-12 object-cover rounded border border-slate-700"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-slate-800 rounded border border-slate-700 flex items-center justify-center">
                      {getFileIcon(uploadFile.file)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white font-medium truncate">{uploadFile.file.name}</p>
                      <div className="flex items-center space-x-2">
                        {uploadFile.status === "success" && <CheckCircle className="h-4 w-4 text-green-400" />}
                        {uploadFile.status === "error" && <AlertCircle className="h-4 w-4 text-red-400" />}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFile(uploadFile.id)
                          }}
                          className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">{formatFileSize(uploadFile.file.size)}</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          uploadFile.status === "success" && "border-green-500 text-green-400",
                          uploadFile.status === "error" && "border-red-500 text-red-400",
                          uploadFile.status === "uploading" && "border-amber-500 text-amber-400",
                        )}
                      >
                        {uploadFile.status === "uploading" && "Uploading..."}
                        {uploadFile.status === "success" && "Uploaded"}
                        {uploadFile.status === "error" && "Failed"}
                      </Badge>
                    </div>

                    {uploadFile.status === "uploading" && <Progress value={uploadFile.progress} className="h-1 mt-2" />}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
