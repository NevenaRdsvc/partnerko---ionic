import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  originalName: string;
  displayName: string;
  tags: string[];
}

@Injectable()
export class CloudinaryService {
  constructor() {
    const url = process.env.CLOUDINARY_URL ?? '';
    const match = url.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
    if (match) {
      cloudinary.config({ api_key: match[1], api_secret: match[2], cloud_name: match[3] });
    } else {
      console.error('CLOUDINARY_URL nije ispravno postavljen:', url);
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'promo-materijali',
          resource_type: 'auto',
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error || !result) {
            console.error('Cloudinary upload error:', error);
            reject(new InternalServerErrorException('Greška pri uploadu na Cloudinary'));
            return;
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            originalName: file.originalname,
            displayName: result.display_name ?? file.originalname,
            tags: result.tags ?? [],
          });
        },
      );

      const readable = Readable.from(file.buffer);
      readable.pipe(uploadStream);
    });
  }

  async getAllResourceTags(): Promise<{ publicId: string; tags: string[] }[]> {
    const result = await (cloudinary.search as any)
      .expression('folder:promo-materijali')
      .with_field('tags')
      .max_results(500)
      .execute();

    return (result.resources ?? []).map((r: any) => ({
      publicId: r.public_id,
      tags: r.tags ?? [],
    }));
  }

  async deleteFile(publicId: string, url: string): Promise<void> {
    const match = url.match(/\/(?:image|video|raw)\//);
    const resource_type = (match?.[0].replace(/\//g, '') as 'image' | 'video' | 'raw') ?? 'image';
    await cloudinary.uploader.destroy(publicId, { resource_type });
  }
}
