const multer = require('multer');

const assignmentStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let id = req.params.id;
        let type = req.params.type;
        let classid = req.params.classid;
        let path = `../public/uploads/${classid}/assignments/${id}`;
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, 'assignment-' + req.params.student);
    }
});

module.exports = assignmentStorage;