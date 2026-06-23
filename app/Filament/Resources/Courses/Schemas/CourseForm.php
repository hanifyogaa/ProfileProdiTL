<?php

namespace App\Filament\Resources\Courses\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CourseForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([

            Section::make('Identitas Mata Kuliah')
                ->schema([
                    Grid::make(3)->schema([
                        TextInput::make('code')
                            ->label('Kode MK')
                            ->placeholder('TLO401')
                            ->required(),
                        TextInput::make('semester')
                            ->label('Semester ke-')
                            ->integer()
                            ->minValue(1)
                            ->maxValue(8)
                            ->required(),
                        TextInput::make('sks')
                            ->label('SKS')
                            ->integer()
                            ->minValue(1)
                            ->maxValue(6)
                            ->required(),
                    ]),
                    Grid::make(2)->schema([
                        TextInput::make('name_id')
                            ->label('Nama Mata Kuliah (Indonesia)')
                            ->placeholder('Logistik Digital')
                            ->required(),
                        TextInput::make('name_en')
                            ->label('Course Name (English)')
                            ->placeholder('Digital Logistics')
                            ->required(),
                    ]),
                    Grid::make(2)->schema([
                        Select::make('type')
                            ->label('Tipe')
                            ->options([
                                'wajib'  => 'Wajib',
                                'pilihan' => 'Pilihan',
                            ])
                            ->default('wajib')
                            ->required(),
                        Toggle::make('is_signature')
                            ->label('Mata Kuliah Unggulan')
                            ->helperText('Ditampilkan di bagian Kurikulum Snapshot halaman utama')
                            ->default(false),
                    ]),
                ]),

            Section::make('Capaian & Deskripsi')
                ->schema([
                    Textarea::make('cpl')
                        ->label('Capaian Pembelajaran (CPL)')
                        ->rows(3)
                        ->columnSpanFull(),
                    Grid::make(2)->schema([
                        Textarea::make('description_id')
                            ->label('Deskripsi (Indonesia)')
                            ->rows(4),
                        Textarea::make('description_en')
                            ->label('Description (English)')
                            ->rows(4),
                    ]),
                ]),

        ]);
    }
}
