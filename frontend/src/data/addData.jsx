import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { BiLoaderAlt } from "react-icons/bi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdOutlinePriceCheck } from "react-icons/md";
import { TbCircleLetterC } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { URL } from "../URL";

const AddData = () => {

    const [inputValue,setInputValue] = useState({
        name:"",
        price:"",
        company:"",
        category:"",
        quantity:""
    });

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    //  console.log(name,price,category,company,file);
    let navigate = useNavigate();

    const handleChange = (e) => {
        setInputValue({...inputValue,[e.target.name]:e.target.value});
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
                let result = await fetch(`${URL}/data/addData`, {
                    method: "post",
                    body:JSON.stringify(inputValue),
                    headers:{"Content-Type":"application/json"}
                });

                let data = await result.json();
                // console.log(data);
                if (data.success) {
                    navigate("/");
                    setLoading(false);
                    toast.success("data added...");
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

    return (
            <div className="signup">
                <p className="heading1">AddData</p>
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
                        <TbCircleLetterC className="icon" /><input type="text" placeholder="Enter category name..." name="category" value={inputValue.category} onChange={handleChange}  />
                    </div>
                    {error && !inputValue.category && <p className="error-text">Enter category Name</p>}
                    <div className="input-box1">
                        <BiCategory className="icon" /><input type="text" placeholder="Enter company name..." name="company" value={inputValue.company} onChange={handleChange}  />
                    </div>
                    {error && !inputValue.company && <p className="error-text">Enter company Name</p>}
                    <div className="input-box1">
                        <MdOutlineProductionQuantityLimits className="icon" /><input type="number" placeholder="Enter quantity..." name="quantity" value={inputValue.quantity} onChange={handleChange}  />
                    </div>
                    {error && !inputValue.quantity && <p className="error-text">Enter quantity</p>}
                    <div>
                        <button type="submit" className="submit-btn" disabled={loading}>{loading?<span>Adding...<BiLoaderAlt className="loading-icon" /></span>:"Add"}</button>
                    </div>
                </form>
            </div>
    );
}

export default AddData;