import React, { useEffect } from "react";
import "./styles.css";
import { useState } from "react";
import order from "../../../../api/order";
import { useAppContext } from "../../../../context/AppContext";

const Menu = () => {
  const { token } = useAppContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 0,
    name: "",
    images: "",
    discount: "",
    price: "",
  });
  const [menu, setMenu] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "type") {
      setFormData({
        ...formData,
        type: parseInt(value),
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files;
    setFormData({
      ...formData,
      images: file[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await order.createMenu(token, formData);
      await fetchMenu();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await order.deleteMenu(token, id);
      console.log(res);
      await fetchMenu();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMenu = async () => {
    try {
      const res = await order.getMenu();
      console.log(res);
      setMenu(res.data.menus);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMenu();
  }, []);
  const tranStringType = (type) => {
    switch (type) {
      case 0:
        return "Đồ ăn";
      case 1:
        return "Đồ uống";
      case 2:
        return "Combo";
      default:
        return "Không xác định";
    }
  };
  const handleDiscountChange = (e) => {
    let discount = parseInt(e.target.value);
    if (isNaN(discount)) {
      discount = "";
    } else if (discount < 0) {
      discount = 0;
    } else if (discount > 100) {
      discount = 100;
    }
    setFormData({
      ...formData,
      discount: discount.toString(),
    });
  };
  return (
    <div className="MenuEditController">
      <h1>Menu</h1>
      <h2>Thêm món ăn</h2>
      <form className={isFormOpen ? "block" : "none"} onSubmit={handleSubmit}>
        <div>
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="">-- Chọn loại --</option>
            <option value={0}>Đồ ăn</option>
            <option value={1}>Đồ uống</option>
            <option value={2}>Combo</option>
          </select>
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Images:</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label>Discount:(%)</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleDiscountChange}
            min={0}
          />
        </div>
        <div>
          <label>Price:(vnđ)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="Buttondetail">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="Buttondetail">
        <button onClick={() => setIsFormOpen(!isFormOpen)}>
          {isFormOpen ? "Đóng" : "Thêm"}
        </button>
      </div>

      <h2>Danh sách món ăn</h2>
      <div className="menuItemContainer">
        {menu.map((item) => (
          <div className="menuItem" key={item._id}>
            <img src={item.images} alt={item.name} />
            <p>Tên món: {item.name}</p>
            <p>Giá: {item.price} vnđ</p>
            <p>Giảm giá: {item.discount}%</p>
            <p>Loại: {tranStringType(item.type)}</p>
            <div className="Buttondetail">
              <button onClick={() => handleDelete(item._id)}>Xóa món ăn</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
