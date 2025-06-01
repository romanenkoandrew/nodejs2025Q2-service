import { IsString, IsNotEmpty, Length, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
