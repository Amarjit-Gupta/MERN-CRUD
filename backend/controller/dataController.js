import Data from "../config/datadb.js";

export const addData = async (req, res) => {
    try {
        const { name, price, company, category,quantity } = req.body;
        // console.log(name, price, company, category, quantity);
        if (!name || !price || !company || !category || !quantity) {
            return res.status(400).json({ success: false, message: "Please provide name, price, company, category and quantity..." });
        }
        let existName = await Data.findOne({name:name});
        if(existName){
            return res.status(400).json({ success: false, message: "This product is already exist..." });
        }
            let result = new Data({ name, price, company, category, quantity });
            let data = await result.save();
            return res.status(200).json({ success: true, data, message: "all Data inserted..." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "something went wrong...",error:err.message });
    }
}

export const getData = async (req, res) => {
    try {
        const price = req.query.price;
        const sorted = {};
        if(price=="asc"){
            sorted.price=1;
        }
        if(price=="desc"){
            sorted.price=-1;
        }
        let data = await Data.find({}).sort(sorted);
        return res.status(200).json({ success: true, data, message: "all Data..." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "something went wrong...",error:err.message });
    }
}

export const getSingleData = async (req, res) => {
    try {
        const id = req.params.id;
        let data = await Data.findOne({ _id: id });
        return res.status(200).json({ success: true, data, message: "single Data..." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "something went wrong...",error:err.message });
    }
}

export const updateSingleData = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, price, company, category,quantity } = req.body;
        if (!name || !price || !company || !category || !quantity) {
            return res.status(400).json({ success: false, message: "Please provide name, price, company, category and quantity..." });
        }
        let result = await Data.updateOne({ _id: id }, { $set: { name, price, company, category, quantity } });
        return res.status(200).json({ success: true, result, message: "update Data..." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "something went wrong...",error:err.message });
    }
}

export const deleteSingleData = async (req, res) => {
    try {
        const id = req.params.id;
        let result = await Data.deleteOne({_id:id});
        return res.status(200).json({ success: true, result, message: "Data deleted..." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "something went wrong...",error:err.message });
    }
}

export const search = async (req, res) => {
    try {
        const query = req.params.key;
        let result = await Data.find({
            $or:[
                {name:{$regex:query,$options:"i"}},
                {company:{$regex:query,$options:"i"}},
                {category:{$regex:query,$options:"i"}}
            ]
        });
        return res.status(200).json({ success: true,result, message: "search Data..." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "something went wrong...",error:err.message });
    }
}