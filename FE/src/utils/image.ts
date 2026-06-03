export const normalizeImageOrientation = (file: File): Promise<File> =>
  new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (!ctx) return resolve(file)
        ctx.drawImage(img, 0, 0)
        canvas.toBlob(
          (blob) => {
            resolve(blob ? new File([blob], file.name, { type: 'image/jpeg' }) : file)
          },
          'image/jpeg',
          0.92,
        )
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  })
