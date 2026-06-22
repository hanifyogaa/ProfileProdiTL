<?php

namespace App\Filament\Resources\Stats\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

class StatTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('metric')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('value')
                    ->sortable(),
                TextColumn::make('label_id')
                    ->label('Label (ID)')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('label_en')
                    ->label('Label (EN)')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('order')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
