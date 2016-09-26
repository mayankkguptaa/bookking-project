'use strict';

module.exports.profileUploadFileFilter = function (req, file, cb) {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

module.exports.materialUploadFileFilter = function (req, file, cb) {
  if (file.mimetype !== 'video/mp4' && file.mimetype !== 'video/avi' && file.mimetype !== 'video/mkv' && file.mimetype !== 'application/pdf') {
    return cb(new Error('Only video and document files are allowed!'), false);
  }
  cb(null, true);
};
