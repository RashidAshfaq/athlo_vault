import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import * as fs from 'fs';
import { Response } from 'express';
import * as path from 'path';
import { FileUtilsService } from '@app/common/file_utility/file-utils.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService, private readonly fileUtilsService: FileUtilsService) {}

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }

  @Get('/file/:filename')
  async serveFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const filePath = this.fileUtilsService.getDirectoryByFilename(filename);

      const file = path.resolve(process.env.UPLOADS_DIR, filePath, filename);

      if (!fs.existsSync(file)) throw new NotFoundException();

      res.sendFile(file);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
