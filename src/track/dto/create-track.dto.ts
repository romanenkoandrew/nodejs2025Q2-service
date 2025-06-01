import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  duration: number;

  @IsString()
  @IsOptional()
  artistId?: string;

  @IsString()
  @IsOptional()
  albumId?: string;
}
