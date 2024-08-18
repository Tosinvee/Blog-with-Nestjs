/* eslint-disable prettier/prettier */
import {  IsArray, IsEnum, IsInt, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";
import { postStatus } from "../enums/postStatus.enum";
import { postType } from "../enums/postType.enum"
import { Type } from "class-transformer";
import { CreatePostMetaOptionsDto } from "../../meta-options/dtos/create-post-meta-options.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto{
    @ApiProperty({
      example:'This is a title',
      description:'This is the title for the blog post',
    })
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    @MaxLength(512)
    title: string;

    @ApiProperty({
      enum: postType,
      description: "Possible values  'post', 'page', 'story', 'series'",
    })
    @IsEnum(postType)
    @IsNotEmpty()
    postType: postType;

    @ApiProperty({
      description: "For example 'my-url'",
      example: 'my-blog-post',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
    slug: string;

    @ApiProperty({
      enum: postStatus,
      description: "Possible values 'draft', 'scheduled', 'review', 'published'",
    })
    @IsEnum(postStatus)
     @IsNotEmpty()
    status: postStatus;

    @ApiPropertyOptional({
      description: 'This is the content of the post',
      example: 'The post content',
    })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiPropertyOptional({
      description:
        'Serialize your JSON object else a validation error will be thrown',
        example:
        '{\r\n "@context": "https://schema.org",\r\n "@type": "Person"\r\n }',  
    })
    @IsOptional()
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string;

    @ApiProperty({
      description: 'Must be a valid timestamp in ISO8601',
      example: '2024-03-16T07:46:32+0000',
    })
    @IsISO8601()
    @IsOptional()
    publishOn: Date;

  @ApiPropertyOptional({
    description: '  Array of ids of tags ',
    example: [1, 2]
  })
  @IsInt({each:true})
  @IsArray()
  @IsOptional()
    tags?: number[];

    @ApiPropertyOptional({
      type: 'object',
      required: false,
      items: {
        type: 'object',
        properties: {
          metavalue: {
            type: 'json',
            description: 'The metaValue is a JSON string',
          example: '{"sidebarEnabled": true,}',  
          },
      
        },
      },
    })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto | null;

    
}