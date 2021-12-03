const asyncWrapper = (fn)=>{ //pass a fxn fn with all the logic to be executed, this function asyncwrap returns a new fxn to the scope it was called from, that fxn now has access to req,res. the returned fxn is going to be execd which in turn calls the og fxn that was passed to asyncwrapp, passing it req,res. and that fxn fn, executes.
    return async(req, res, next)=>{
        try{
            await fn(req, res, next)

        }
        catch(error){
            next(error)
        }
    }

}

module.exports = asyncWrapper