import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editingStock, setEditingStock] = useState({}); // Track which product is being edited

  // Fetch Product List
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Remove Product
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setList((prevList) => prevList.filter((item) => item._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Update Stock
  const updateStock = async (id, stock) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/update-stock',
        { id, stock: Number(stock) },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Stock updated successfully');
        setList((prevList) =>
          prevList.map((item) =>
            item._id === id ? { ...item, stock: Number(stock) } : item
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>

        {/* ------- List Table Title ---------- */}
        <div className='hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Stock</b>
          <b className='text-center'>Actions</b>
        </div>

        {/* ------ Product List ------ */}
        {list.map((item) => (
          <div
            className='grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'
            key={item._id}
          >
            <img className='w-12' src={item.image[0]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category || 'N/A'}</p>
            <p>{currency}{item.price}</p>

            {/* Editable Stock Quantity */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={editingStock[item._id] ?? item.stock}
                onChange={(e) => setEditingStock({ ...editingStock, [item._id]: e.target.value })}
                className="w-16 border rounded px-2 py-1 text-center"
                min="0"
              />
              <button
                className="bg-gray-500 text-white hover:bg-green-600 px-2 py-1 rounded-md shadow-md"
                onClick={() => updateStock(item._id, editingStock[item._id] ?? item.stock)}
              >
                Update
              </button>
            </div>

            {/* Remove Button */}
            <button
              className='bg-gray-500 text-white hover:bg-red-600 px-2 py-1 rounded-md shadow-md'
              onClick={() => removeProduct(item._id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
