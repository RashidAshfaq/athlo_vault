import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Resolve the path to the 404 page
    const uploadsDir = process.env.UPLOADS_DIR;
    const notFoundPagePath = uploadsDir + '/public/404.html';

    // Check if the custom 404 page exists
    if (fs.existsSync(notFoundPagePath)) {
      response.status(404).sendFile(notFoundPagePath);
    } else {
      // Fallback HTML if the 404 page is not found
      response.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - Not Found</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    text-align: center;
                    padding: 50px;
                }
                .container {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #e74c3c;
                    font-size: 3em;
                }
                p {
                    font-size: 1.2em;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>404 - Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <p>Please check the URL or return to the homepage.</p>
            </div>
        </body>
        </html>
      `);
    }
  }
}
