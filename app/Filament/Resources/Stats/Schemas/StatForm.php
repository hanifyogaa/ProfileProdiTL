<?php

namespace App\Filament\Resources\Stats\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;

class StatForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('metric')
                    ->label('Metric Code / ID')
                    ->unique(ignoreRecord: true)
                    ->required(),
                TextInput::make('value')
                    ->label('Display Value (e.g., 90%+, 145, Unggul)')
                    ->required(),
                TextInput::make('label_id')
                    ->label('Label (Indonesian)')
                    ->required(),
                TextInput::make('label_en')
                    ->label('Label (English)')
                    ->required(),
                TextInput::make('order')
                    ->integer()
                    ->default(0),
            ]);
    }
}
