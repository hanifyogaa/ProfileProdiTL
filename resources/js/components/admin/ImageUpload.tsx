import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    label: string;
    existingUrl?: string | null;
    error?: string;
    onChange: (file: File | null) => void;
    onClearExisting?: () => void;
    helpText?: string;
    required?: boolean;
}

export default function ImageUpload({
    label,
    existingUrl,
    error,
    onChange,
    onClearExisting,
    helpText = 'Format JPG, PNG, atau WebP. Maksimal 2MB.',
    required = false
}: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);
            onChange(file);

            // Generate thumbnail preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.preventDefault();
        setSelectedFile(null);
        setPreviewUrl(null);
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClearExistingImage = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onClearExisting) {
            onClearExisting();
        }
    };

    return (
        <div className="space-y-1.5 w-full">
            <label className="text-sm font-semibold text-ink-900 flex items-center">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="flex items-start space-x-4">
                {/* Preview Box */}
                {(previewUrl || existingUrl) ? (
                    <div className="relative w-28 h-28 border border-cream-300/60 rounded-2xl overflow-hidden bg-surface-50 shrink-0 shadow-sm flex items-center justify-center">
                        <img 
                            src={previewUrl || existingUrl || ''} 
                            alt="Preview" 
                            className="w-full h-full object-cover" 
                        />
                        {previewUrl ? (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-surface-0 rounded-full shadow transition-all duration-200"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        ) : (
                            onClearExisting && (
                                <button
                                    type="button"
                                    onClick={handleClearExistingImage}
                                    className="absolute top-1 right-1 p-1 bg-ink-900/60 hover:bg-ink-900 text-surface-0 rounded-full shadow transition-all duration-200"
                                    title="Hapus foto saat ini"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )
                        )}
                    </div>
                ) : (
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-28 h-28 border-2 border-dashed border-cream-300 hover:border-brand-700 rounded-2xl flex flex-col items-center justify-center text-navy-700 hover:text-brand-700 cursor-pointer bg-surface-0 transition-all duration-200 shrink-0"
                    >
                        <ImageIcon className="w-6 h-6 mb-1 opacity-70" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">No Image</span>
                    </div>
                )}

                {/* Upload Input Area */}
                <div className="flex-1 space-y-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center space-x-2 px-4 py-2 border border-cream-300 hover:border-brand-700 hover:bg-brand-700/5 hover:text-brand-700 text-ink-900 rounded-xl transition-all duration-200 font-semibold text-xs bg-surface-0 shadow-sm cursor-pointer"
                    >
                        <Upload className="w-4 h-4" />
                        <span>Pilih Gambar</span>
                    </button>
                    {selectedFile && (
                        <p className="text-xs text-navy-700 truncate max-w-xs">
                            {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                    )}
                    <p className="text-[11px] text-navy-700/80 leading-snug">
                        {helpText}
                    </p>
                    {error && (
                        <p className="text-xs text-red-600 font-medium">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
