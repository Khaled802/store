

class CustomeError extends Error {
    constructor(msg, status) {
        super(msg);
        this.status = status;
    }
}

module.exports = {
    CustomeError
}