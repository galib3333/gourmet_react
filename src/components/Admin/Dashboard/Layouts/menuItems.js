import { useState, React, useEffect } from "react";
import '../dashboard.css';
import axios from "axios";

function MenuItems() {
    const [menuItems, setmenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [inputs, setInputs] = useState([]);

    useEffect(() => {
        getDatas();
    }, []);
    function getDatas() {
        axios.get(`${global.config.apiUrl}menuitem`).then(function (response) {
            setmenuItems(response.data.data);
        });
    }
    function getCategories() {
        axios.get(`${global.config.apiUrl}category`).then(function (response) {
            setCategories(response.data.data);
        });
    }
    function getCoupons() {
        axios.get(`${global.config.apiUrl}coupon`).then(function (response) {
            setCoupons(response.data.data);
        });
    }
    useEffect(() => {
        getCoupons();
    }, []);
    const deleteItems = (id) => {
        axios.delete(`${global.config.apiUrl}menuitem/delete/${id}`).then(function () {
            getDatas();
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Ensure that a file is selected before reading it
            const reader = new FileReader();
            reader.onload = (event) => {
                // Handle the result, e.g., set it in your state
                const dataUrl = event.target.result;
                setInputs({ ...inputs, imageSrc: dataUrl });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${global.config.apiUrl}menuitem/create`, inputs).then(function (response) {
            console.log(response.data)
            getDatas();
            if (response.data.status === 1)
                document.getElementById('modelbutton').click();
        });
    }
    const clearData = () => {
        getCategories();
        setInputs(values => ({ ...values, "id": "", "name": "", "description": "", "price": "", "imageSrc": "", "category_id": "", "coupon_id": "" }))
    }
    useEffect(() => {
        getCategories();
    }, []);

    /* for update */

    function getSingleProduct(d) {
        document.getElementById('modelbutton').click();
        setInputs(d);
        setInputs(values => ({ ...values, "imageSrc": "" }));
    }


    return (
        <section className="container2">
            <div className="row">
                <div className="col-12">
                    <div className="filter-options">
                        <p>Filter selected: more than 100 $</p>
                        {/* <button className="icon-button" >
                                <i className="ph-funnel"></i>
                            </button>
                            <button className="icon-button">
                                <i className="ph-plus"></i>
                            </button> */}
                        <button onClick={clearData} id="modelbutton" type="button" className="btn btn-primary btn-sm float-end mb-2" data-bs-toggle="modal" data-bs-target="#myModal">
                            Add Menu Item
                        </button>
                    </div>
                </div>
            </div>

            <div className="modal" id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h4 className="modal-title text-white">Menu Data</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body ">

                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="row">
                                    <div className="col-sm-6 w-50">
                                        <div className="mb-3">
                                            <label className="form-label text-white">Name</label>
                                            <input value={inputs.name} type="text" className="form-control border-secondary" name="name" onChange={handleChange} />
                                            <input value={inputs.id} type="hidden" name="id" />
                                        </div>
                                    </div>
                                    <div className="col-sm-5 my-2">
                                        <div className="mb-3">
                                            <label className="form-label text-white">Category</label>
                                            <select className="form-control border-secondary" name="category_id" onChange={handleChange}>
                                                <option value="" key="">Select Category</option>
                                                {categories.map((category, key) =>
                                                    <option selected={category.id === inputs.category_id} value={category.id} key={key}>{category.category_name}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-3">
                                            <label className="form-label text-white"> Description</label>
                                            <textarea className="form-control border-secondary" name="description" onChange={handleChange} value={inputs.description}></textarea>
                                        </div>
                                    </div>
                                    <div className="col-sm-5 my-2">
                                        <div className="mb-3">
                                            <label className="form-label text-white">Coupons</label>
                                            <select className="form-control border-secondary" name="coupon_id" onChange={handleChange}>
                                                <option value="" key="">Select Coupon</option>
                                                {coupons.map((coupons, key) =>
                                                    <option selected={coupons.id === inputs.coupon_id} value={coupons.id} key={key}>{coupons.code}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="mb-3">
                                            <label className="form-label text-white">Price</label>
                                            <input type="text" className="form-control border-secondary" name="price" value={inputs.price} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="mb-3">
                                            <label className="form-label text-white">Image</label>
                                            <input type="file" className="form-control border-secondary" name="imageSrc" onChange={onFileChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                    <div className="col-sm-3">
                                        <button type="button" className="btn btn-danger ms-2" data-bs-dismiss="modal" onClick={clearData}>Close</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="menu-table">
                        <table className="menu">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Food Name</th>
                                    <th>Food Description</th>
                                    <th>Category</th>
                                    <th>Coupon</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menuItems ? (
                                    menuItems.map((menuItem, key) => (
                                        <tr key={key}>
                                            <td>{menuItem.id}</td>
                                            <td>
                                                <img
                                                    src={global.config.apiUrl + menuItem.imageSrc}
                                                    alt={menuItem.name}
                                                />
                                            </td>
                                            <td>{menuItem.name}</td>
                                            <td>{menuItem.description}</td>
                                            <td>{menuItem.cname}</td>
                                            <td>{menuItem.code}</td>
                                            <td>${menuItem.price}</td>
                                            <td>
                                                <button className="btn btn-primary me-2 mb-2 ms-2" onClick={() => getSingleProduct(menuItem)}>Edit</button>
                                                <button className="btn btn-danger bg-danger w-60" onClick={() => deleteItems(menuItem.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">No menu items available.</td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default MenuItems;
