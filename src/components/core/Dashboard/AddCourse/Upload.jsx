import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { Player } from "video-react"
import "video-react/dist/video-react.css"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData || editData || ""
  )

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video
      ? { "video/*": [".mp4"] }
      : { "image/*": [".jpg", ".jpeg", ".png"] },
    onDrop,
  })

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    register(name, { required: true })
  }, [register, name])

  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, setValue, name])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5">
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      {/* 🔥 ROOT CLICKABLE AREA */}
      <div
        {...getRootProps()}
        className={`flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted
        ${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } border-richblack-500`}
      >
        <input {...getInputProps()} />

        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="w-full rounded-md object-cover"
              />
            ) : (
              <Player src={previewSource} />
            )}

            {!viewData && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className="mt-2 text-center text-sm text-richblack-200">
              Drag & drop {!video ? "image" : "video"} or{" "}
              <span className="font-semibold text-yellow-50">Browse</span>
            </p>

            <ul className="mt-6 flex gap-10 text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>1024x576 recommended</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="text-xs text-pink-200">{label} is required</span>
      )}
    </div>
  )
}
