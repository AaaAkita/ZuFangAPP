import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: '手机号不能为空' })
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: '验证码不能为空' })
  @MinLength(6, { message: '验证码长度不正确' })
  @MaxLength(6, { message: '验证码长度不正确' })
  code: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(8, { message: '密码长度不能少于8位' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/, {
    message: '密码必须包含大小写字母和数字',
  })
  password: string;

  @IsString()
  @MaxLength(50, { message: '昵称长度不能超过50个字符' })
  nickname?: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: '手机号不能为空' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

export class SendCodeDto {
  @IsString()
  @IsNotEmpty({ message: '手机号不能为空' })
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  phone: string;
}
