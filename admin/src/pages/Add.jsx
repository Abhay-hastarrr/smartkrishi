import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from "axios";
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");
    const [bestseller, setBestseller] = useState(false);
    const [stock, setStock] = useState(0);

    const categories = ["Seed", "Plant Protection", "Animal Husbandry", "Plant", "Seedling", "Lifestyle"];

    const subCategories = {
        "Seed": ["Vegetable Seed", "Oil seed crop", "Field crop seed", "Fruit crop seed", "Flower seed"],
        "Plant Protection": ["Insecticides", "Bactericides", "Fungicides"],
        "Animal Husbandry": ["Animal feed"],
        "Plant": ["Indoor Plant", "Outdoor Plant", "Shade Plant"], // Added Plant subcategories
        "Seedling": ["Vegetable Seedling", "Flower Seedling", "Fruit Seedling"], // Added Seedling subcategories
        "Lifestyle": ["Lifestyle Plant", "Air Purifier Plant", "Decorative Plant"] // Added Lifestyle subcategories
    };

    const [category, setCategory] = useState(categories[0]);
    const [subCategory, setSubCategory] = useState(subCategories["Seed"][0]);

    // Add common plant names here
    const commonPlantNames = [
        "Rubber Plant", "Tomato", "Chilli", "Brinjal", "Wondering Jew",
        "Round Melon", "Bitter Gourd", "Banana Plant", "Snake Plant", "Arrowhead Plant","LifeStyle","Plant"
    ];

    const [commonPlant, setCommonPlant] = useState(commonPlantNames[0]); // Default to the first plant

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("weight", weight);
            formData.append("bestseller", bestseller ? "true" : "false");
            formData.append("stock", stock);
            formData.append("commonName", commonPlant); 

            if (image1) formData.append("image1", image1);
            if (image2) formData.append("image2", image2);
            if (image3) formData.append("image3", image3);
            if (image4) formData.append("image4", image4);

            const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
                headers: { token }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setName("");
                setDescription("");
                setImage1(null);
                setImage2(null);
                setImage3(null);
                setImage4(null);
                setPrice("");
                setWeight("");
                setCategory(categories[0]);
                setSubCategory(subCategories["Seed"][0]);
                setCommonPlant(commonPlantNames[0]); // Reset common plant to default
                setStock("");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="max-h-[80vh] overflow-y-auto">
            <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
                <div>
                    <p className='mb-2'>Upload image</p>
                    <div className='flex gap-2'>
                        {[1, 2, 3, 4].map((index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <img
                                    className='w-20'
                                    src={!eval(`image${index}`) ? assets.upload_area : URL.createObjectURL(eval(`image${index}`))}
                                    alt=""
                                />
                                <input onChange={(e) => eval(`setImage${index}(e.target.files[0])`)} type="file" id={`image${index}`} hidden />
                            </label>
                        ))}
                    </div>
                </div>

                <div className='w-full'>
                    <p className='mb-2'>Product Name</p>
                    <input value={name} onChange={(e) => setName(e.target.value)} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder="Type here" required />
                </div>

                <div className='w-full'>
                    <p className='mb-2'>Product Description</p>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='w-full max-w-[500px] px-3 py-2' placeholder="Write content here" required />
                </div>

                <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                    <div>
                        <p className='mb-2'>Product Category</p>
                        <select value={category} onChange={(e) => {
                            setCategory(e.target.value);
                            setSubCategory(subCategories[e.target.value][0]);
                        }} className='w-full px-3 py-2'>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <p className='mb-2'>Sub Category</p>
                        <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2' required>
                            {subCategories[category].map((sub, index) => (
                                <option key={index} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <p className='mb-2'>Product Price</p>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder="Enter price" required />
                    </div>
                </div>

                <div className='w-full'>
                    <p className='mb-2'>Product Weight</p>
                    <textarea value={weight} onChange={(e) => setWeight(e.target.value)} className='w-full max-w-[500px] px-3 py-2' placeholder="Enter weight"  />
                </div>

                <label className='mb-2'>Stock Quantity:</label>
                <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-3 py-2 sm:w-[120px]"
                />

                <div className='w-full'>
                    <p className='mb-2'>Common Plant Name</p>
                    <select value={commonPlant} onChange={(e) => setCommonPlant(e.target.value)} className='w-full px-3 py-2'>
                        {commonPlantNames.map((plant, index) => (
                            <option key={index} value={plant}>{plant}</option>
                        ))}
                    </select>
                </div>

                <div className='flex gap-2 mt-2'>
                    <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
                    <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
                </div>

                <button className='w-28 py-3 mt-4 rounded-full text-white bg-gray-600 shadow-lg hover:scale-105 hover:bg-green-500' type='submit'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Add;
