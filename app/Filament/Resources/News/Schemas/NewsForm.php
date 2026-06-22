<?php

namespace App\Filament\Resources\News\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Illuminate\Support\Str;

class NewsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title_id')
                    ->label('Title (Indonesian)')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $operation, $state, $set) => 
                        $operation === 'create' ? $set('slug', Str::slug($state)) : null
                    ),
                TextInput::make('title_en')
                    ->label('Title (English)')
                    ->required(),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),
                Select::make('category')
                    ->options([
                        'Akademik' => 'Akademik',
                        'Kegiatan' => 'Kegiatan',
                        'Pengumuman' => 'Pengumuman',
                        'Prestasi' => 'Prestasi',
                    ])
                    ->required(),
                Textarea::make('excerpt_id')
                    ->label('Excerpt (Indonesian)')
                    ->rows(3),
                Textarea::make('excerpt_en')
                    ->label('Excerpt (English)')
                    ->rows(3),
                RichEditor::make('body_id')
                    ->label('Body Content (Indonesian)')
                    ->columnSpanFull(),
                RichEditor::make('body_en')
                    ->label('Body Content (English)')
                    ->columnSpanFull(),
                FileUpload::make('featured_image')
                    ->image()
                    ->directory('news')
                    ->columnSpanFull(),
                Select::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                    ])
                    ->default('draft')
                    ->required(),
                Toggle::make('is_featured')
                    ->label('Featured on Home Page'),
                DateTimePicker::make('published_at')
                    ->default(now()),
            ]);
    }
}
