const fs = require('fs');
const controllersFactory = require('./controllersFactory');

// db models
const TextMaterial = require('../models/TextMaterial');
const Video = require('../models/Video');
const Test = require('../models/Test');

// TEXT MATERIALS
exports.getAllTextMaterials = controllersFactory.getAll(TextMaterial);
exports.getSingleTextMaterial = controllersFactory.getOne(TextMaterial);
exports.createTextMaterial = controllersFactory.createOne(TextMaterial);
exports.updateTextMaterial = controllersFactory.updateOne(TextMaterial);
exports.deleteTextMaterial = controllersFactory.deleteOne(TextMaterial);

// VIDEO MATERIALS
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

// TEST MATERIALS
exports.getAllTests = controllersFactory.getAll(Test);
exports.getSingleTest = controllersFactory.getOne(Test);
exports.createTest = controllersFactory.createOne(Test);
exports.updateTest = controllersFactory.updateOne(Test);
exports.deleteTest = controllersFactory.deleteOne(Test);