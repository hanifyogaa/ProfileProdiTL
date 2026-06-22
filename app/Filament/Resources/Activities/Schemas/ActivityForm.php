<?php

namespace App\Filament\Resources\Activities\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Illuminate\Support\Str;

class ActivityForm
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
                Select::make('type')
                    ->options([
                        'visit' => 'Industry Visit',
                        'workshop' => 'Workshop / Seminar',
                        'lecture' => 'Guest Lecture',
                    ])
                    ->default('visit')
                    ->required(),
                DatePicker::make('date')
                    ->default(now())
                    ->required(),
                TextInput::make('location'),
                RichEditor::make('body_id')
                    ->label('Description (Indonesian)')
                    ->columnSpanFull(),
                RichEditor::make('body_en')
                    ->label('Description (English)')
                    ->columnSpanFull(),
                FileUpload::make('cover')
                    ->image()
                    ->directory('activities')
                    ->columnSpanFull(),
                Toggle::make('is_featured')
                    ->label('Featured on Home Page'),
            ]);
    }
}
