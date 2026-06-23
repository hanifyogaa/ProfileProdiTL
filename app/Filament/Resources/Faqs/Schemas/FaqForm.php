<?php

namespace App\Filament\Resources\Faqs\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class FaqForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([

            Section::make('Pertanyaan & Jawaban')
                ->schema([
                    Grid::make(2)->schema([
                        Textarea::make('question_id')
                            ->label('Pertanyaan (Indonesia)')
                            ->rows(2)
                            ->required(),
                        Textarea::make('question_en')
                            ->label('Question (English)')
                            ->rows(2)
                            ->required(),
                    ]),
                    Grid::make(2)->schema([
                        Textarea::make('answer_id')
                            ->label('Jawaban (Indonesia)')
                            ->rows(5)
                            ->required(),
                        Textarea::make('answer_en')
                            ->label('Answer (English)')
                            ->rows(5)
                            ->required(),
                    ]),
                ]),

            Section::make('Pengaturan')
                ->schema([
                    Grid::make(3)->schema([
                        Select::make('category')
                            ->label('Kategori')
                            ->options([
                                'umum'     => 'Umum',
                                'akademik' => 'Akademik',
                                'karir'    => 'Karir',
                                'mbkm'     => 'MBKM',
                            ])
                            ->default('umum')
                            ->required(),
                        TextInput::make('order')
                            ->label('Urutan')
                            ->integer()
                            ->default(0),
                        Toggle::make('is_active')
                            ->label('Tampilkan')
                            ->default(true),
                    ]),
                ]),

        ]);
    }
}
