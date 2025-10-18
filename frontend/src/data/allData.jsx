import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { URL } from "../URL";
import { toast } from 'react-toastify';
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

const AllData = () => {

    const [value, setValue] = useState([]);
    const [sorted, setSorted] = useState("");
    const [load1, setLoad1] = useState(false);

    const navigate = useNavigate();

    const handleSorted = (e) => {
        setSorted(e.target.value);
    }

    const getdata = async () => {
        try {
            setLoad1(true);
            let url = `${URL}/data/getData?`;
            if (sorted == "asc") {
                url += `price=asc`;
            }
            if (sorted == "desc") {
                url += `price=desc`;
            }

            let result = await fetch(url);
            let data = await result.json();
           // console.log(data);
            if (data.success && Array.isArray(data.data)) {
                setValue(data.data);
                setLoad1(false);
            }
            else {
                setLoad1(false);
            }
        }
        catch (err) {
            toast.error("something went wrong");
            setLoad1(false);
        }
    }

    useEffect(() => {
        getdata();
    }, [sorted]);

    const handleSearch = async (e) => {
        try {
            let key = e.target.value;
            if (key) {
                let result = await fetch(`${URL}/data/search/${key}`);
                let data = await result.json();
                setValue(data.result);
            }
            else {
                getdata();
            }
        }
        catch (err) {
            toast.error("something went wrong...");
        }
    }

    const handleDelete = async (index) => {
        try {
            let delData = confirm("are you sure...");
            if (delData) {
                let result = await fetch(`${URL}/data/deleteSingleData/${index}`, {
                    method: "delete"
                });
                let data = await result.json();
                if (data.success) {
                    getdata();
                    toast.success("data deleted");
                }
            }
            else {
                toast.error("data not delete...");
            }
        }
        catch (err) {
            toast.error("something went wrong...");
        }
    }

    return (
        <div className="allData-main">
            <div className="allData-child1">
                <p className="text">AllData</p>
                <div className="search">
                    <input type="search" placeholder="Search here..." onChange={handleSearch} />
                    <select name="" id="" value={sorted} onChange={handleSorted}>
                        <option value="">All</option>
                        <option value="asc">price (ascending)</option>
                        <option value="desc">price (descending)</option>
                    </select>
                </div>
            </div>

            <div className="allData-child2">
                <div className="column1">S.No</div>
                <div className="column2">Name</div>
                <div className="column2">Price</div>
                <div className="column2">Category</div>
                <div className="column2">Company</div>
                <div className="column1">Quantity</div>
                <div className="column3">Operation</div>
            </div>

            {load1 ? <div className="load"><img src="./images/loader.gif" alt="" /></div> :
                <>
                    {
                        value.length ?
                            value.map((v, i) => {
                                return (
                                    <div className="allData-child2" key={v._id}>
                                        <div className="column1">{String(i + 1).length > 4 ? String(i + 1).slice(0, 4) + ".." : (i + 1)}.</div>
                                        <div className="column2">{v.name.length > 10 ? v.name.slice(0, 8) + ".." : v.name}</div>
                                        <div className="column2">₹{String(v.price).length > 9 ? String(v.price).slice(0, 7) + ".." : v.price}</div>
                                        <div className="column2">{v.category.length > 10 ? v.category.slice(0, 8) + ".." : v.category}</div>
                                        <div className="column2">{v.company.length > 10 ? v.company.slice(0, 8) + ".." : v.company}</div>
                                        <div className="column1">{String(v.quantity).length > 5 ? String(v.quantity).slice(0, 5) + ".." : v.quantity}</div>
                                        <div className="column3">
                                            <div className="operation">
                                                <button className="btn1" onClick={() => navigate(`/edit/${v._id}`)}><FiEdit /></button>
                                                <button className="btn2" onClick={() => handleDelete(v._id)}><MdDeleteForever /></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <p className="no-data">Data not found</p>
                    }
                </>
            }
        </div>
    );
};
export default AllData;