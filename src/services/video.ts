import { Request,Response, NextFunction } from 'express';
import fs from 'fs';

class Video {

    public getStream({ res, file, start, end }: { res: Response, file: string, start: number, end: number }) {
        const videoStream = fs.createReadStream(file, { start: start, end: end })
            .on("open", function () {
                videoStream.pipe(res);
            }).on("error", function (err) {
                throw err;
            }).on('end', () => {
                videoStream.destroy();
            }).on('finish', () => {
                videoStream.destroy();
            })
    }

    public async getPositions({ req, res, file }: { req: Request, res: Response, file: string }) {
        let errorMessage = '';
        const stats = await this.getFileStats(file);
        if (!stats) errorMessage = 'file not found';

        const { start, end, total, chunksize, ok: positionOk } = this.getStreamParams({ req: req, size: stats.size });
        if (!positionOk) errorMessage = 'error play stream';
        this.setHeaders({ start, end, total, chunksize, res });

        return { start, end, errorMessage };
    }

    private setHeaders({ res, start, end, chunksize, total }: { res: Response, start: number, end: number, chunksize: number, total: number }) {
        res.writeHead(206, {
            "Content-Range": "bytes " + start + "-" + end + "/" + total,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4"
        });
    }

    private getStreamParams({ req, size }: { req: Request, size: number }) {
        const range = req.headers.range;
        if (!range) return { start: 0, end: 0, total: 0, chunksize: 0, ok: false };

        const positions = range.replace(/bytes=/, "").split("-");
        const start = parseInt(positions[0], 10);
        const total = size;
        const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        const chunksize = (end - start) + 1;

        return { start, end, total, chunksize, ok: true };
    }

    private async getFileStats(filepath: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.stat(filepath, (err, stat) => {
                if (err) return reject(err);
                return resolve(stat);
            });
        });
    }
}

export { Video }