<?php

namespace App\Filament\Resources\Labs\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;

class LabForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Lab Name')
                    ->required(),
                TextInput::make('focus')
                    ->label('Lab Focus (Specialization area)')
                    ->required(),
                Textarea::make('description_id')
                    ->label('Description (Indonesian)')
                    ->rows(4)
                    ->required(),
                Textarea::make('description_en')
                    ->label('Description (English)')
                    ->rows(4)
                    ->required(),
                FileUpload::make('photo')
                    ->image()
                    ->directory('labs')
                    ->columnSpanFull(),
                TextInput::make('order')
                    ->integer()
                    ->default(0),
            ]);
    }
}
