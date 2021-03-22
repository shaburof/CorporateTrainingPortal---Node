import { Request, Response, NextFunction } from 'express';
import { Video } from '../services/video';
import path from 'path';
import { VideoModel } from '../models/videoModel';

class VideoController {

    public static async getVideo(req: Request, res: Response, next: NextFunction) {
        const video: any = await VideoModel.findByPk(1);

        return res.render('video', { video, path: video.path });
    }

    public static async video(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: videoId } = req.params;
            const filePath = req.query.path as string;
            const video = new Video();
            
            const file = path.join(filePath, `video${videoId}.mp4`);
     
            const { start, end, errorMessage } = await video.getPositions({ req, res, file });
            if (errorMessage.length > 0) return next(errorMessage);

            video.getStream({ res, file, start, end });
        } catch (error) {
            return next(error);
        }
    }
}

export { VideoController }