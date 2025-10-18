import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { BiLoaderAlt } from "react-icons/bi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdOutlinePriceCheck } from "react-icons/md";
import { TbCircleLetterC } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { URL } from "../URL";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const EditData = () => {

    const [inputValue, setInputValue] = useState({
        name: "",
        price: "",
        company: "",
        category: "",
        quantity: ""
    });

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const param = useParams();
    let navigate = useNavigate();
    let index = param.id;

    const handleChange = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    }

    const getSingleData = async () => {
        let result = await fetch(`${URL}/data/getSingleData/${index}`);
        let data = await result.json();
        // console.log(data);
        if (data.success) {
            let d1 = data?.data;
            setInputValue({
                name: d1?.name,
                price: d1?.price,
                company: d1?.company,
                category: d1?.category,
                quantity: d1?.quantity
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(inputValue);
            if (!inputValue.name || !inputValue.price || !inputValue.company || !inputValue.category || !inputValue.quantity) {
                setError(true);
                return;
            }
            else if (inputValue.name.trim() || inputValue.category.trim() || inputValue.company.trim()) {
                setLoading(true);
                let result = await fetch(`${URL}/data/updateSingleData/${index}`, {
                    method: "put",
                    body: JSON.stringify(inputValue),
                    headers: { "Content-Type": "application/json" }
                });

                let data = await result.json();
                // console.log(data);
                if (data.success) {
                    navigate("/");
                    setLoading(false);
                    toast.success("data updated...");
                }
                else {
                    setLoading(false);
                    toast.error(data.message);
                }
            }
            else {
                setLoading(false);
                toast.warn("white space is not allowed...");
            }
        }
        catch (err) {
            setLoading(false);
            toast.error("something went wrong...");
        }
    }

    useEffect(() => {
        getSingleData();
    }, []);


    return (
        <div className="signup">
            <p className="heading1">EditData</p>
            <form onSubmit={handleSubmit}>
                <div className="input-box1">
                    <MdOutlineDriveFileRenameOutline className="icon" /><input type="text" placeholder="Enter product name..." name="name" value={inputValue.name} onChange={handleChange} />
                </div>
                {error && !inputValue.name && <p className="error-text">Enter Name</p>}
                <div className="input-box1">
                    <MdOutlinePriceCheck className="icon" /><input type="number" placeholder="Enter product price..." name="price" value={inputValue.price} onChange={handleChange} />
                </div>
                {error && !inputValue.price && <p className="error-text">Enter price</p>}
                <div className="input-box1">
                    <TbCircleLetterC className="icon" /><input type="text" placeholder="Enter category name..." name="category" value={inputValue.category} onChange={handleChange} />
                </div>
                {error && !inputValue.category && <p className="error-text">Enter category Name</p>}
                <div className="input-box1">
                    <BiCategory className="icon" /><input type="text" placeholder="Enter company name..." name="company" value={inputValue.company} onChange={handleChange} />
                </div>
                {error && !inputValue.company && <p className="error-text">Enter company Name</p>}
                <div className="input-box1">
                    <MdOutlineProductionQuantityLimits className="icon" /><input type="number" placeholder="Enter quantity..." name="quantity" value={inputValue.quantity} onChange={handleChange} />
                </div>
                {error && !inputValue.quantity && <p className="error-text">Enter quantity</p>}
                <div>
                    <button type="submit" className="submit-btn" disabled={loading}>{loading ? <span>Updating...<BiLoaderAlt className="loading-icon" /></span> : "Update"}</button>
                </div>
            </form>
        </div>
    );
}

export default EditData;