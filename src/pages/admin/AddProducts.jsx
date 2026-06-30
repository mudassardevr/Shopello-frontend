import React, { useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

function AddProducts() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
    imageUrls: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
      const files = Array.from(e.target.files);

  console.log("Selected files:", files);

  setFormData((prev) => ({
    ...prev,
    images: files,
  }));
    // setFormData({
    //   ...formData,
    //   images: Array.from(e.target.files),
    // });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("category", formData.category);

      formData.images.forEach((image) => {
        data.append("images", image);
      });

      data.append("imageUrls", formData.imageUrls);

      const response = await API.post("/product/add", data, {
        headers: {
          "auth-token": token,
        },
      });

      toast.success("Product added successfully");
      console.log(response.data);

      setFormData({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        images: [],
        imageUrls: "",
      });

      e.target.reset();
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 pt-25 md:pt-40">
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />
        <p className="text-center text-gray-500 my-2">OR</p>

        <textarea
          name="imageUrls"
          placeholder="Paste image URLs (one URL per line)"
          value={formData.imageUrls}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-3 rounded"
         
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProducts;

// import React, { useState } from "react";
// import API from "../../services/api";
// import { toast } from "react-toastify";

// function AddProduct() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     stock: "",
//     category: "",
//     image: [],
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       console.log(formData);

//       const token = localStorage.getItem("token");

//       const response = await API.post(
//         "/product/add",
//         {
//           ...formData,
//           image: [formData.image],
//         },
//         {
//           headers: {
//             "auth-token": token,
//           },
//         },
//       );

//       toast.success("Product added Successfully");

//       console.log(response.data);

//       setFormData({
//         title: "",
//         description: "",
//         price: "",
//         stock: "",
//         category: "",
//         image: "",
//       });
//     } catch (error) {
//       console.log(error.response?.data);
//       toast.error("Failed to Add Product");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 pt-25 md:pt-40">
//       <h1 className="text-3xl font-bold mb-6">Add Product</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Product Title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//         />

//         <input
//           type="number"
//           name="stock"
//           placeholder="Stock"
//           value={formData.stock}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//         />

//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//         />

//         <input
//           type="file"
//           multiple
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               images: Array.from(e.target.files),
//             })
//           }
//           className="w-full border p-3 rounded"
//         />

//         <button type="submit" className="bg-black text-white px-6 py-3 rounded">
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddProduct;
