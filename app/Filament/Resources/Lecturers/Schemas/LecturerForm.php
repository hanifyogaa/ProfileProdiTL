<?php

namespace App\Filament\Resources\Lecturers\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class LecturerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Informasi Dasar')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('name')
                                ->label('Nama Lengkap (dengan gelar)')
                                ->placeholder('Dr. Ir. Muhammad Akbar, S.T., M.T.')
                                ->required(),
                            TextInput::make('nidn')
                                ->label('NIDN')
                                ->placeholder('0412038701'),
                        ]),
                        Grid::make(2)->schema([
                            TextInput::make('functional_position')
                                ->label('Jabatan Fungsional')
                                ->placeholder('Lektor Kepala'),
                            TextInput::make('position_id')
                                ->label('Jabatan / Peran (Indonesia)')
                                ->placeholder('Dosen Tetap'),
                        ]),
                        TextInput::make('position_en')
                            ->label('Jabatan / Peran (English)')
                            ->placeholder('Full-time Lecturer'),
                        TextInput::make('email')
                            ->label('Email Institusi')
                            ->email()
                            ->placeholder('nama@telkomuniversity.ac.id'),
                        FileUpload::make('photo')
                            ->label('Foto Dosen')
                            ->image()
                            ->directory('lecturers')
                            ->imageEditor()
                            ->columnSpanFull(),
                    ]),

                Section::make('Biografi')
                    ->schema([
                        Grid::make(2)->schema([
                            Textarea::make('bio_id')
                                ->label('Biografi (Indonesia)')
                                ->rows(5),
                            Textarea::make('bio_en')
                                ->label('Biografi (English)')
                                ->rows(5),
                        ]),
                    ]),

                Section::make('Keahlian & Pendidikan')
                    ->schema([
                        TagsInput::make('expertise')
                            ->label('Bidang Keahlian (tekan Enter setelah tiap keahlian)')
                            ->placeholder('Tambah keahlian...')
                            ->columnSpanFull(),

                        Repeater::make('education')
                            ->label('Riwayat Pendidikan')
                            ->schema([
                                Grid::make(3)->schema([
                                    Select::make('degree')
                                        ->label('Jenjang')
                                        ->options([
                                            'S1'      => 'S1 (Sarjana)',
                                            'S2'      => 'S2 (Magister)',
                                            'S3'      => 'S3 (Doktor)',
                                            'Postdoc' => 'Post-Doctoral',
                                        ])
                                        ->required(),
                                    TextInput::make('institution')
                                        ->label('Institusi')
                                        ->placeholder('Institut Teknologi Bandung')
                                        ->required(),
                                    TextInput::make('year')
                                        ->label('Tahun Lulus')
                                        ->numeric()
                                        ->placeholder('2015'),
                                ]),
                                TextInput::make('major')
                                    ->label('Program Studi / Jurusan')
                                    ->placeholder('Teknik Industri'),
                            ])
                            ->addActionLabel('+ Tambah Pendidikan')
                            ->collapsible()
                            ->columnSpanFull(),
                    ]),

                Section::make('Riwayat Mengajar')
                    ->schema([
                        Repeater::make('teaching_history')
                            ->label('Riwayat Mengajar per Semester')
                            ->schema([
                                TextInput::make('semester')
                                    ->label('Semester')
                                    ->placeholder('Ganjil 2024/2025')
                                    ->required(),
                                TagsInput::make('courses')
                                    ->label('Mata Kuliah')
                                    ->placeholder('Tambah mata kuliah...'),
                            ])
                            ->addActionLabel('+ Tambah Semester')
                            ->collapsible()
                            ->columnSpanFull(),
                    ]),

                Section::make('Publikasi & Profil Akademik')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('scopus_url')
                                ->label('Scopus URL')
                                ->url()
                                ->placeholder('https://www.scopus.com/...'),
                            TextInput::make('scopus_id')
                                ->label('Scopus Author ID')
                                ->placeholder('55315386600'),
                        ]),
                        Grid::make(2)->schema([
                            TextInput::make('scholar_url')
                                ->label('Google Scholar URL')
                                ->url()
                                ->placeholder('https://scholar.google.com/...'),
                            TextInput::make('scholar_id')
                                ->label('Google Scholar Profile Key')
                                ->placeholder('MpktzzcAAAAJ'),
                        ]),
                        Grid::make(2)->schema([
                            TextInput::make('sinta_url')
                                ->label('SINTA URL')
                                ->url()
                                ->placeholder('https://sinta.kemdikbud.go.id/...'),
                            TextInput::make('sinta_id')
                                ->label('SINTA Author ID')
                                ->placeholder('6016350'),
                        ]),
                    ]),

                Section::make('Pengaturan Tampil')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('order')
                                ->label('Urutan Tampil')
                                ->integer()
                                ->default(0),
                            Toggle::make('is_active')
                                ->label('Tampilkan di website')
                                ->default(true),
                        ]),
                    ]),
            ]);
    }
}
