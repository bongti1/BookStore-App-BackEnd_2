import Books from "../model/book.model.mjs";
export const getBook = async (req, res) => {
    try {
        const books = await Books.find(); 
        res.status(200).send(books);
    } catch (error) {
        console.log(error);
        res.status(304).send({message:"Cannot get books"});
    }
};

export const getBookbyId = async (req, res) => {
    try {
        const {id} = req.params;
        const findById = await Books.findById(id);
        if(findById){
            res.status(200).send(findById);
        }
        else{
            res.status(200).send({message:'Book not found.'})
        }
    } catch (error) {
        console.log(error);
    }
}

export const newBook = async (req, res) => {
    const book = req.body;
    const newBook = new Books(book);
    try {
        await newBook.save();
        return res.status(200).send({message:"Saved successfully", data: newBook});
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Fails to saved data"})
    }
};

export const updateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const newBook = req.body;
        const updateBook = await Books.findByIdAndUpdate(id, newBook, {new:true});
        if(updateBook){
            res.status(200).send({message:"Updating successfully." , data:newBook});
        }
        else{
            res.status(304).send("Updating Fails.");
        }
    } catch (error) {
        console.log(error);
        res.send("Updating Fails.");
    }
};

export const deleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedBook = await Books.findByIdAndDelete(id);
        if(!deletedBook){
            res.status(200).send({message:"Deleting Fail."});
        }
        res.status(200).send({message:"Deleting successfully."});
    } catch (error) {
        console.log(error);
    }
};

