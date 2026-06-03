import { Camera, Loader2, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { normalizeImageOrientation } from '../../utils/image'

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL

export const CoverUpload = () => {
  const { setValue, watch, clearErrors } = useFormContext()
  const coverUrl = watch('coverUrl') as string
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => fileInputRef.current?.click()
  const handleClearCover = () => setValue('coverUrl', '')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadError(null)

    const normalized = await normalizeImageOrientation(file)
    const formData = new FormData()
    formData.append('files', normalized)

    try {
      const res = await fetch(`${STRAPI_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Upload failed')

      const data = await res.json()
      setValue('coverUrl', `${STRAPI_URL}${data[0].url}`)
      clearErrors('coverUrl')
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch {
      setUploadError('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-text-secondary">Cover</span>

      <div className="flex gap-2">
        {coverUrl ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
            <img
              src={coverUrl}
              alt="Cover preview"
              className="h-full w-full object-cover [image-orientation:from-image]"
            />
            <button
              type="button"
              onClick={handleClearCover}
              className="absolute right-0.5 top-0.5 rounded-full bg-black/60 p-0.5 text-white"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-surface-300 bg-surface-50 text-xs text-text-secondary">
            No cover
          </div>
        )}

        <div className="flex flex-1 flex-col justify-center gap-2">
          <button
            type="button"
            disabled={isUploading}
            onClick={handleUploadClick}
            className="flex h-20 w-full items-center justify-center gap-2 rounded-xl border border-surface-200 bg-white px-3 text-sm font-medium text-text-primary shadow-sm transition hover:bg-surface-50 disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Camera className="h-4 w-4" />
            )}
            {isUploading ? (
              'Uploading…'
            ) : (
              <>
                <span className="sm:hidden">Take photo or upload</span>
                <span className="hidden sm:inline">Upload image</span>
              </>
            )}
          </button>
        </div>
      </div>

      {uploadError && <p className="mt-1 text-xs text-red-500">{uploadError}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
