const fs = require('fs');
const Video = require('../models/Video');
const controllersFactory = require('./controllersFactory');

exports.getAllVideos = controllersFactory.getAll(Video);
exports.getSingleVideo = controllersFactory.getOne(Video);
exports.createVideo = controllersFactory.createOne(Video);
exports.updateVideo = controllersFactory.updateOne(Video);
exports.deleteVideo = controllersFactory.deleteOne(Video);

exports.streamVideo = async (req, res, next) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
        return res.status(404).json({
            status: 'fail',
            message: 'no video with that id found'
        });
    }

    const path = `src/videos/${video.path}`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
};