class LogicNegociationException extends Error {

    constructor(message: string) {
        super(message);
        this.name = "LogicNegociationException";
    }
}

export default LogicNegociationException;