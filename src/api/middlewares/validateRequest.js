const validate = (schema) => async (req,res,next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json(error);
    }
}
module.exports = validate;