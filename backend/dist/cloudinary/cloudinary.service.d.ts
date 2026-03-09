export interface CloudinaryUploadResult {
    url: string;
    publicId: string;
    originalName: string;
    displayName: string;
    tags: string[];
}
export declare class CloudinaryService {
    constructor();
    uploadFile(file: Express.Multer.File): Promise<CloudinaryUploadResult>;
    getAllResourceTags(): Promise<{
        publicId: string;
        tags: string[];
    }[]>;
    deleteFile(publicId: string, url: string): Promise<void>;
}
