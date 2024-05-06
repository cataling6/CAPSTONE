exports.cloudUploadImg = async (req, res) => {


    try {
        res.status(200).json({ source: req.file.path })
    } catch (e) {
        console.log(e);
        res.status(500)
            .send({
                statusCode: 500,
                message: 'File upload error'
            })

    }

}
