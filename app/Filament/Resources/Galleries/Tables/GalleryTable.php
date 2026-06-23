<?php

namespace App\Filament\Resources\Galleries\Tables;

use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class GalleryTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->label('Foto')
                    ->disk('public')
                    ->square()
                    ->size(64),
                TextColumn::make('title_id')
                    ->label('Judul')
                    ->searchable()
                    ->limit(40),
                TextColumn::make('category')
                    ->label('Kategori')
                    ->badge()
                    ->color(fn (string $state) => match($state) {
                        'kegiatan'     => 'primary',
                        'laboratorium' => 'info',
                        'prestasi'     => 'warning',
                        default        => 'gray',
                    })
                    ->formatStateUsing(fn (string $state) => match($state) {
                        'kegiatan'     => 'Kegiatan',
                        'laboratorium' => 'Laboratorium',
                        'prestasi'     => 'Prestasi',
                        default        => 'Umum',
                    }),
                TextColumn::make('order')
                    ->label('Urutan')
                    ->sortable(),
                ToggleColumn::make('is_published')
                    ->label('Tampil'),
            ])
            ->filters([
                SelectFilter::make('category')
                    ->label('Kategori')
                    ->options([
                        'umum'         => 'Umum',
                        'kegiatan'     => 'Kegiatan',
                        'laboratorium' => 'Laboratorium',
                        'prestasi'     => 'Prestasi',
                    ]),
            ])
            ->defaultSort('order')
            ->reorderable('order');
    }
}
