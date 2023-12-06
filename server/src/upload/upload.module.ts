import { BadRequestException, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { storageDirectories } from 'src/config';
import * as multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as mime from 'mime-types';

@Module({
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: storageDirectories.tmp,
        filename: async function (req, file, cb) {
          // Generate a UUID as the filename
          const randomId = uuidv4();

          // Determine MIME type based on content
          const mimeType = mime.lookup(file.originalname);

          if (!mimeType)
            throw new BadRequestException(null, 'File must be a valid one!');

          const fileName = randomId + `.${mime.extension(mimeType)}`;
          cb(null, fileName);
        },
      }),
    }),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
