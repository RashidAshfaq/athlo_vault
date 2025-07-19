import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { ChatEnum } from 'apps/chat/src/enums/chat.enum';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileUtilsService {
  constructor(private readonly configService: ConfigService) {}

  getDestination(file: Express.Multer.File): string {
    const uploadDir = this.configService.get<string>('UPLOADS_DIR');

    const directory = path.resolve(
      `${uploadDir}${this.getDirectoryByExt(file)}`,
    );

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    return directory;
  }

  getFileSizeString(size: number): string {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const readableSize = size / Math.pow(1024, i);
    return `${readableSize.toFixed(2)} ${sizes[i]}`;
  }

  isFileAllowedForChat(mimeType: string) {
    const allowedMimesTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',

      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',

      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/m4a',

      'video/mp4',
      'video/quicktime',

      'application/zip',
      'application/x-7z-compressed',
    ];

    return allowedMimesTypes.includes(mimeType);
  }

  isFileAllowedForImageOnly(mimeType: string) {
    const allowedMimesTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ];

    return allowedMimesTypes.includes(mimeType);
  }

//   getMessageTypeFromMime(mimeType: string): ChatEnum {
//     if (!mimeType) return ChatEnum.TEXT;

//     if (
//       ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(mimeType)
//     )
//       return ChatEnum.IMAGE;

//     if (
//       [
//         'application/pdf',
//         'application/msword',
//         'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//         'application/vnd.ms-excel',
//         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         'text/plain',
//       ].includes(mimeType)
//     )
//       return ChatEnum.DOCUMENT;

//     if (
//       ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a'].includes(mimeType)
//     )
//       return ChatEnum.AUDIO;

//     if (['video/mp4', 'video/quicktime'].includes(mimeType))
//       return ChatEnum.VIDEO;

//     if (['application/zip', 'application/x-7z-compressed'].includes(mimeType))
//       return ChatEnum.ARCHIVE;

//     return ChatEnum.TEXT;
//   }

  getDirectoryByExt(file: Express.Multer.File): string {
    if (!file || !file.mimetype) {
      throw new Error('Invalid file object');
    }

    const fileType = file.mimetype.split('/')[0];

    switch (fileType) {
      case 'image':
        return '/images';

      case 'video':
        return '/videos';

      case 'audio':
        return '/audios';

      case 'application':
        switch (file.mimetype) {
          case 'application/pdf':
          case 'application/msword':
          case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          case 'application/vnd.ms-excel':
          case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          case 'application/vnd.ms-powerpoint':
          case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            return '/documents';
          default:
            return '/files';
        }

      default:
        return '/files';
    }
  }

  getDirectoryByFilename(filename: string): string {
    if (!filename || !filename.includes('.')) {
      throw new Error('Invalid filename');
    }

    const extension = filename.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
        return 'images';

      case 'mp4':
      case 'mkv':
      case 'mov':
      case 'avi':
      case 'wmv':
        return 'videos';

      case 'mp3':
      case 'wav':
      case 'aac':
      case 'flac':
      case 'm4a':
        return 'audios';

      case 'pdf':
      case 'doc':
      case 'docx':
      case 'xls':
      case 'xlsx':
      case 'ppt':
      case 'pptx':
        return 'documents';

      default:
        return 'files';
    }
  }

  getFilename(): string {
    return `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  }

  getFilesize(type: string): number {
    let size: number;

    switch (type) {
      case 'image':
        size = parseInt(this.configService.get<string>('IMAGE_FILE_SIZE', '5'));
        break;
      case 'video':
        size = parseInt(
          this.configService.get<string>('VIDEO_FILE_SIZE', '50'),
        );
        break;
      case 'audio':
        size = parseInt(
          this.configService.get<string>('AUDIO_FILE_SIZE', '10'),
        );
        break;
      case 'document':
        size = parseInt(
          this.configService.get<string>('DOCUMENT_FILE_SIZE', '10'),
        );
        break;
      default:
        size = parseInt(
          this.configService.get<string>('DEFAULT_FILE_SIZE', '1'),
        );
    }

    return size * 1024 * 1024;
  }
}
