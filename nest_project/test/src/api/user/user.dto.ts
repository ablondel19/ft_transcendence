import { IsEmail, IsInt, IsNotEmpty, IsString, NotContains } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
  
  @IsEmail()
  @IsNotEmpty()
  public email: string;
  
  @IsString()
  @IsNotEmpty()
  @NotContains(" ")
  public password: string;
}

export class MatchHistoryDto {
  
  @IsString()
  public opponent: string;
  
  @IsString()
  public level: string;

  @IsInt()
  public personnalScore: number;

  @IsInt()
  public opponentScore: number;
}
