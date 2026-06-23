<?php

namespace App\Filament\Resources\Courses\Tables;

use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class CourseTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('code')
                    ->label('Kode')
                    ->searchable()
                    ->sortable()
                    ->fontFamily('mono')
                    ->weight('bold'),
                TextColumn::make('name_id')
                    ->label('Nama Mata Kuliah')
                    ->searchable()
                    ->limit(40),
                TextColumn::make('semester')
                    ->label('Smt')
                    ->sortable()
                    ->badge()
                    ->color('warning'),
                TextColumn::make('sks')
                    ->label('SKS')
                    ->sortable()
                    ->badge()
                    ->color('gray'),
                TextColumn::make('type')
                    ->label('Tipe')
                    ->badge()
                    ->color(fn (string $state) => match($state) {
                        'wajib'   => 'primary',
                        'pilihan' => 'gray',
                        default   => 'gray',
                    })
                    ->formatStateUsing(fn (string $state) => match($state) {
                        'wajib'   => 'Wajib',
                        'pilihan' => 'Pilihan',
                        default   => $state,
                    }),
                IconColumn::make('is_signature')
                    ->label('Unggulan')
                    ->boolean()
                    ->trueColor('warning')
                    ->falseColor('gray'),
            ])
            ->filters([
                SelectFilter::make('semester')
                    ->label('Semester')
                    ->options(array_combine(range(1, 8), range(1, 8))),
                SelectFilter::make('type')
                    ->label('Tipe')
                    ->options(['wajib' => 'Wajib', 'pilihan' => 'Pilihan']),
            ])
            ->defaultSort('semester')
            ->striped();
    }
}
