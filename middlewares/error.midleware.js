const errorMiddleware = (err, req, res, next) => {
    try{
        let error = {... err}

        error.message = err.message;

        //Mongoose bad objectId
        if(err.name === 'CastError'){
            const message = 'Resource not found'
            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose duplicate key
        if(err.code === 11000){
            const message = 'Duplicate key value entered';
            error = new Error(message);
            error.statusCode = 403;
        }

        //Mongoose validation error 
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message);
            error.statusCode = 400;
        }
        
        res.status(error.statusCode || 500).json({sucess:false, error: error.message || 'Server error'});

    }catch(error){
        next(error);
    }
};

export default errorMiddleware