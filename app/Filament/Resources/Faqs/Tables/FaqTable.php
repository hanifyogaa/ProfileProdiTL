<?php

namespace App\Filament\Resources\Faqs\Tables;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class FaqTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('question_id')
                    ->label('Pertanyaan')
                    ->searchable()
                    ->limit(60)
                    ->wrap(),
                TextColumn::make('category')
                    ->label('Kategori')
                    ->badge()
                    ->color(fn (string $state) => match($state) {
                        'akademik' => 'primary',
                        'karir'    => 'success',
                        'mbkm'     => 'warning',
                        default    => 'gray',
                    })
                    ->formatStateUsing(fn (string $state) => match($state) {
                        'akademik' => 'Akademik',
                        'karir'    => 'Karir',
                        'mbkm'     => 'MBKM',
                        default    => 'Umum',
                    }),
                TextColumn::make('order')
                    ->label('Urutan')
                    ->sortable(),
                ToggleColumn::make('is_active')
                    ->label('Aktif'),
            ])
            ->filters([
                SelectFilter::make('category')
                    ->label('Kategori')
                    ->options([
                        'umum'     => 'Umum',
                        'akademik' => 'Akademik',
                        'karir'    => 'Karir',
                        'mbkm'     => 'MBKM',
                    ]),
            ])
            ->defaultSort('order')
            ->reorderable('order');
    }
}
