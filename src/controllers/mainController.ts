import { Request, Response, NextFunction } from 'express';
import { VideoModel } from '../models/videoModel';


class MainController {

    public static async index(req: Request, res: Response, next: NextFunction) {
        const videos:any = await VideoModel.findAll();
        res.render('index',{videos});
    }

    public static e404(req: Request, res: Response, next: NextFunction) {
        res.end('404 not page found');
    }

    public static errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
        console.log(error);
        console.log('error handler');
        res.end(error.message);
    }

}

export { MainController }