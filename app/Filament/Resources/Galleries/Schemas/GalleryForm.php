<?php

namespace App\Filament\Resources\Galleries\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class GalleryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([

            Section::make('Foto')
                ->schema([
                    FileUpload::make('image')
                        ->label('Gambar')
                        ->image()
                        ->directory('gallery')
                        ->imageEditor()
                        ->required()
                        ->columnSpanFull(),
                ]),

            Section::make('Informasi')
                ->schema([
                    Grid::make(2)->schema([
                        TextInput::make('title_id')
                            ->label('Judul (Indonesia)')
                            ->placeholder('Workshop Internasional ASEAN')
                            ->required(),
                        TextInput::make('title_en')
                            ->label('Title (English)')
                            ->placeholder('ASEAN International Workshop')
                            ->required(),
                    ]),
                    Grid::make(2)->schema([
                        TextInput::make('caption_id')
                            ->label('Keterangan (Indonesia)')
                            ->placeholder('Dokumentasi kegiatan...'),
                        TextInput::make('caption_en')
                            ->label('Caption (English)')
                            ->placeholder('Event documentation...'),
                    ]),
                    Grid::make(2)->schema([
                        Select::make('category')
                            ->label('Kategori')
                            ->options([
                                'umum'         => 'Umum',
                                'kegiatan'     => 'Kegiatan',
                                'laboratorium' => 'Laboratorium',
                                'prestasi'     => 'Prestasi',
                            ])
                            ->default('umum')
                            ->required(),
                        TextInput::make('order')
                            ->label('Urutan Tampil')
                            ->integer()
                            ->default(0),
                    ]),
                    Toggle::make('is_published')
                        ->label('Tampilkan di website')
                        ->default(true),
                ]),

        ]);
    }
}
