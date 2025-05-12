const errorsMiddleware = (error,req,res,next) => {
    if (
        error.status == 500
    ) {
        res.status(500).json({message: " Vérifie"})
    }
}
module.exports =errorsMiddleware ;