<?php

namespace App\Filament\Resources\Achievements\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;

class AchievementForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title_id')
                    ->label('Title (Indonesian)')
                    ->required(),
                TextInput::make('title_en')
                    ->label('Title (English)')
                    ->required(),
                Select::make('level')
                    ->options([
                        'national' => 'National',
                        'international' => 'International',
                    ])
                    ->required(),
                DatePicker::make('date')
                    ->default(now())
                    ->required(),
                TextInput::make('holder')
                    ->label('Winner / Holder Name')
                    ->placeholder('e.g., Mahasiswa Teknik Logistik')
                    ->required(),
                FileUpload::make('cover')
                    ->image()
                    ->directory('achievements')
                    ->columnSpanFull(),
                TextInput::make('order')
                    ->integer()
                    ->default(0),
            ]);
    }
}
