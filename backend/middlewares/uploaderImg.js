const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
//CLOUDINARY
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const internalStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        const fileExtension = file.originalname.split('.').pop()
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`)
    }
})

const upload = multer({ storage: internalStorage })


const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'capstone_assets/UsersProfileImgs',
        format: async (req, file) => 'jpg',
        public_id: (req, file) => file.name
    }
})

const cloudUpload = multer({ storage: cloudStorage })

module.exports = {
    cloudUpload: cloudUpload,
    upload: upload
}