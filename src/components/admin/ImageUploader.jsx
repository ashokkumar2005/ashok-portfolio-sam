import { useRef, useState } from "react";
import { FiUpload, FiImage, FiFile } from "react-icons/fi";
import api from "../../services/api";

export default function ImageUploader({ label, value, onChange, accept = "image/jpeg,image/png,image/webp", uploadLabel = "Upload Image", preview = true }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange(res.data.url);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      {label && <p className="text-xs text-text-faint mono-label uppercase mb-1.5">{label}</p>}
      <div className="flex items-center gap-4">
        {preview && (
          <div className="w-20 h-20 rounded-xl bg-surface border border-border overflow-hidden flex items-center justify-center shrink-0">
            {value ? (
              <img src={value} alt="" className="w-full h-full object-cover" />
            ) : (
              <FiImage className="text-text-faint" />
            )}
          </div>
        )}
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-strong text-sm hover:bg-surface transition-colors disabled:opacity-50"
          >
            <FiUpload size={14} />
            {uploading ? "Uploading…" : uploadLabel}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleFile}
          />
          {error && <p className="text-xs text-accent-violet mt-1.5">{error}</p>}
        </div>
      </div>
    </div>
  );
}
