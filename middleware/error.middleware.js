const errorHandler = (err, req, res, next) => {
    console.log(err.stack.yellow.underline);

    res.status(500).json({
        success:false,
        error:err.message,
    });



};

module.exports = errorHandler

// Үүнийг одоо апп руугаа imort хийж оруулж өгнө.