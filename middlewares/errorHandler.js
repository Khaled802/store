

const errorHandler = (err, req, res, next)=> {
    const status = getStatusOR500(err);
    res.status(status).json({'error': `server error ${err.message}`});
}

const getStatusOR500 = (err)=> {
    if(err.status) return err.status;
    return 500;
}

module.exports = {
    errorHandler
}