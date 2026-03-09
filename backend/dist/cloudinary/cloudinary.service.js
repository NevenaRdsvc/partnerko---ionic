"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
let CloudinaryService = class CloudinaryService {
    constructor() {
        const url = process.env.CLOUDINARY_URL ?? '';
        const match = url.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
        if (match) {
            cloudinary_1.v2.config({ api_key: match[1], api_secret: match[2], cloud_name: match[3] });
        }
        else {
            console.error('CLOUDINARY_URL nije ispravno postavljen:', url);
        }
    }
    async uploadFile(file) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                folder: 'promo-materijali',
                resource_type: 'auto',
                use_filename: true,
                unique_filename: true,
            }, (error, result) => {
                if (error || !result) {
                    console.error('Cloudinary upload error:', error);
                    reject(new common_1.InternalServerErrorException('Greška pri uploadu na Cloudinary'));
                    return;
                }
                resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                    originalName: file.originalname,
                    displayName: result.display_name ?? file.originalname,
                    tags: result.tags ?? [],
                });
            });
            const readable = stream_1.Readable.from(file.buffer);
            readable.pipe(uploadStream);
        });
    }
    async getAllResourceTags() {
        const result = await cloudinary_1.v2.search
            .expression('folder:promo-materijali')
            .with_field('tags')
            .max_results(500)
            .execute();
        return (result.resources ?? []).map((r) => ({
            publicId: r.public_id,
            tags: r.tags ?? [],
        }));
    }
    async deleteFile(publicId, url) {
        const match = url.match(/\/(?:image|video|raw)\//);
        const resource_type = match?.[0].replace(/\//g, '') ?? 'image';
        await cloudinary_1.v2.uploader.destroy(publicId, { resource_type });
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map