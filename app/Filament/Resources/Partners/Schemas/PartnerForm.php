<?php

namespace App\Filament\Resources\Partners\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;

class PartnerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Partner Name')
                    ->required(),
                FileUpload::make('logo')
                    ->image()
                    ->directory('partners')
                    ->columnSpanFull(),
                TextInput::make('url')
                    ->label('Website / MoU Link URL')
                    ->url(),
                Select::make('type')
                    ->options([
                        'industry' => 'Industry Partner',
                        'academic' => 'Academic Partner',
                    ])
                    ->default('industry')
                    ->required(),
                TextInput::make('order')
                    ->integer()
                    ->default(0),
            ]);
    }
}
