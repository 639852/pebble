import { useMessage } from 'naive-ui'

import type { UploadFileInfo } from 'naive-ui'

function useFileType() {
  const imageTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
  const videoTypes = ['video/mp4', 'video/webm']

  const message = useMessage()

  function fileTypeValidation({ file }: { file: UploadFileInfo }, types: string[]) {
    if (!types.includes(file.file?.type ?? '')) {
      message.error(`Only upload files in ${types?.join(', ')} format, please re-upload.`)

      return false
    }
    return true
  }

  return { fileTypeValidation, imageTypes, videoTypes }
}

export default useFileType
