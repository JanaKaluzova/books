import { BrowserMultiFormatReader } from '@zxing/browser'
import { X } from 'lucide-react'
import { type FC, useCallback, useEffect, useRef, useState } from 'react'
import { searchBookByIsbn } from '../../api/bookSearchApi'
import { type BookSearchResult, Status } from '../../utils/types'

interface ISBNScannerProps {
  onBookFound: (result: BookSearchResult) => void
  onClose: () => void
}

export const ISBNScanner: FC<ISBNScannerProps> = ({ onBookFound, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsRef = useRef<{ stop: () => void } | null>(null)
  const onBookFoundRef = useRef(onBookFound)
  onBookFoundRef.current = onBookFound

  const [status, setStatus] = useState<Status>(Status.SCANNING)
  const [scannedIsbn, setScannedIsbn] = useState<string>('')

  const startScanning = useCallback(async () => {
    setStatus(Status.SCANNING)
    setScannedIsbn('')
    let stopped = false

    try {
      const reader = new BrowserMultiFormatReader()
      const controls = await reader.decodeFromConstraints(
        {
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            // @ts-expect-error - focusMode not in TS types but supported on mobile
            advanced: [{ focusMode: 'continuous' }],
          },
        },
        videoRef.current!,
        async (result) => {
          if (!result || stopped) return
          stopped = true
          controls.stop()
          setStatus(Status.LOADING)

          const isbn = result.getText()
          setScannedIsbn(isbn)

          try {
            const book = await searchBookByIsbn(isbn)
            if (book) {
              onBookFoundRef.current(book)
            } else {
              setStatus(Status.NOT_FOUND)
            }
          } catch {
            setStatus(Status.API_ERROR)
          }
        },
      )
      controlsRef.current = controls
    } catch {
      setStatus(Status.CAMERA_ERROR)
    }
  }, [])

  useEffect(() => {
    startScanning()
    return () => controlsRef.current?.stop()
  }, [startScanning])

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-black">
      <div className="flex items-center justify-between p-4">
        <p className="text-sm font-medium text-white">Point camera at ISBN barcode</p>
        <button type="button" onClick={onClose} className="rounded-full bg-white/10 p-2 text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex-1">
        <video ref={videoRef} className="h-full w-full object-cover">
          <track kind="captions" />
        </video>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-32 w-72">
            <span className="absolute left-0 top-0 h-6 w-6 rounded-tl border-l-2 border-t-2 border-accent-400" />
            <span className="absolute right-0 top-0 h-6 w-6 rounded-tr border-r-2 border-t-2 border-accent-400" />
            <span className="absolute bottom-0 left-0 h-6 w-6 rounded-bl border-b-2 border-l-2 border-accent-400" />
            <span className="absolute bottom-0 right-0 h-6 w-6 rounded-br border-b-2 border-r-2 border-accent-400" />

            {status === Status.SCANNING && (
              <div className="absolute inset-x-0 top-0 h-0.5 animate-scan bg-accent-400 shadow-[0_0_8px_2px] shadow-accent-400" />
            )}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-12 flex justify-center">
          {status === Status.LOADING && (
            <div className="rounded-full bg-black/60 px-5 py-2.5 text-sm text-white">
              Looking up book…
            </div>
          )}
          {status === Status.NOT_FOUND && (
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-lg bg-black/60 px-5 py-2.5 text-sm text-white text-center">
                <p>No book found — try adding manually</p>
                {scannedIsbn && (
                  <p className="mt-1 font-mono text-xs text-white/60">{scannedIsbn}</p>
                )}
              </div>
              <button
                type="button"
                onClick={startScanning}
                className="rounded-full bg-accent-500 px-5 py-2.5 text-sm font-medium text-white"
              >
                Try again
              </button>
            </div>
          )}
          {status === Status.API_ERROR && (
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-lg bg-black/60 px-5 py-2.5 text-sm text-white text-center">
                Something went wrong — check your connection
              </div>
              <button
                type="button"
                onClick={startScanning}
                className="rounded-full bg-accent-500 px-5 py-2.5 text-sm font-medium text-white"
              >
                Try again
              </button>
            </div>
          )}
          {status === Status.CAMERA_ERROR && (
            <div className="rounded-full bg-black/60 px-5 py-2.5 text-sm text-white text-center">
              Camera not available — make sure the page is opened over HTTPS
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
