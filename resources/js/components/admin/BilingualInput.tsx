import React, { useState } from 'react';

interface BilingualInputProps {
    label: string;
    idName: string;
    enName: string;
    idValue: string;
    enValue: string;
    idError?: string;
    enError?: string;
    onChangeId: (value: string) => void;
    onChangeEn: (value: string) => void;
    placeholderId?: string;
    placeholderEn?: string;
    type?: 'text' | 'textarea';
    rows?: number;
    required?: boolean;
}

export default function BilingualInput({
    label,
    idName,
    enName,
    idValue,
    enValue,
    idError,
    enError,
    onChangeId,
    onChangeEn,
    placeholderId = '',
    placeholderEn = '',
    type = 'text',
    rows = 4,
    required = false,
}: BilingualInputProps) {
    const [activeTab, setActiveTab] = useState<'id' | 'en'>('id');

    const hasError = (activeTab === 'id' ? idError : enError);

    return (
        <div className="space-y-1.5 w-full">
            <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-ink-900 flex items-center">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {/* Language Tab Switcher */}
                <div className="flex items-center space-x-1 bg-surface-50 p-0.5 rounded-lg border border-cream-300/40">
                    <button
                        type="button"
                        onClick={() => setActiveTab('id')}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                            activeTab === 'id'
                                ? 'bg-surface-0 text-brand-700 shadow-sm border border-cream-300/20'
                                : 'text-navy-700 hover:text-ink-900'
                        }`}
                    >
                        🇮🇩 ID {(idError) && <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block ml-1" />}
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('en')}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                            activeTab === 'en'
                                ? 'bg-surface-0 text-brand-700 shadow-sm border border-cream-300/20'
                                : 'text-navy-700 hover:text-ink-900'
                        }`}
                    >
                        🇬🇧 EN {(enError) && <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block ml-1" />}
                    </button>
                </div>
            </div>

            {/* Input field */}
            <div className="relative">
                {type === 'text' ? (
                    <input
                        type="text"
                        name={activeTab === 'id' ? idName : enName}
                        value={activeTab === 'id' ? idValue : enValue}
                        onChange={(e) => activeTab === 'id' ? onChangeId(e.target.value) : onChangeEn(e.target.value)}
                        placeholder={activeTab === 'id' ? placeholderId : placeholderEn}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-surface-0 transition-all text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
                            hasError 
                                ? 'border-red-500 focus:ring-red-500/10 focus:border-red-500' 
                                : 'border-cream-300 focus:ring-brand-700/10 focus:border-brand-700'
                        }`}
                    />
                ) : (
                    <textarea
                        name={activeTab === 'id' ? idName : enName}
                        value={activeTab === 'id' ? idValue : enValue}
                        onChange={(e) => activeTab === 'id' ? onChangeId(e.target.value) : onChangeEn(e.target.value)}
                        placeholder={activeTab === 'id' ? placeholderId : placeholderEn}
                        rows={rows}
                        className={`w-full px-4 py-3 rounded-xl border bg-surface-0 transition-all text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
                            hasError 
                                ? 'border-red-500 focus:ring-red-500/10 focus:border-red-500' 
                                : 'border-cream-300 focus:ring-brand-700/10 focus:border-brand-700'
                        }`}
                    />
                )}
            </div>

            {/* Error Message */}
            {hasError && (
                <p className="text-xs text-red-600 font-medium">
                    {activeTab === 'id' ? idError : enError}
                </p>
            )}
        </div>
    );
}
