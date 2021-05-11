import React, {useState, useEffect} from 'react'
import firebase from '../../config/firebase';




const Dashboard = () => {
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [product, setProduct] = useState([]);
    const [button, setButton] = useState("Save");
    const [selectedProduct, setSelectedProduct] = useState({});

    useEffect(() =>{
        firebase
        .database()
        .ref("products")
        .on("value", (res) =>{
            if (res.val()) {
                const rawData = res.val();
                const productArr = [];
                Object.keys(rawData).map((item) =>{
                    productArr.push({
                        id: item,
                        ...rawData[item],
                    });
                });
                setProduct(productArr);
            };
        });
    }, []);


    const resetForm = () => {
        setProductName("");
        setCategory("");
        setPrice("");
    };
    const onSubmit = () => {
        const data ={
            productName: productName,
            category: category,
            price: price,
        };
        if (button === "Save") {
            firebase.database().ref("products").push(data);
        } else {
            firebase.database().ref(`products/${selectedProduct.id}`).set(data);
        }
        resetForm();
    };

    const onUpadateData =(item) =>{
        setProductName(item.productName);
        setCategory(item.category);
        setPrice(item.price);
        setButton("Save");
        setSelectedProduct({});
    }

    const onDeleteData = (item) =>{
        firebase.database().ref(`products/${item.id}`).remove();
    }
    
    return (
        <div className="container mt-5">
            <h3>Aplikasi Harga Barang</h3>
            <div className="col-6">
                <p>Nama Product</p>
                    <input 
                    className="form-control" 
                    placeholder="type product name" 
                    value={productName} 
                    onChange={(e) => setProductName(e.target.value)}
                    />
                    <p>Nama Barang</p>
                    <input 
                    className="form-control" 
                    placeholder="type the category" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    />
                    <p>Harga</p>
                    <input 
                    className="form-control" 
                    placeholder="type the price" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    />
                    <br />
                    <button className="btn btn-info" onClick={onSubmit}>
                    {button}
                    </button>
                    { button === "Update" && (
                         <button className="btn btn-secondary" onClick={resetForm}>Cancel Update</button>
                    )}
            </div>
           <hr />
           <table class="table table-striped table-hover">
                <thead>
                    <th>Nama Item</th>
                    <th>Nama Barang</th>
                    <th>Harga</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {product.map((item) => (
                            <tr key={item.id}>
                                <td>{item.productName}</td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button 
                                    className="btn btn-warning" 
                                    onClick={() => onUpadateData(item)}>Update</button>
                                    <button className="btn btn-danger"
                                    onClick={() => onDeleteData(item)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
                </table>
        </div>
    )
}

export default Dashboard;