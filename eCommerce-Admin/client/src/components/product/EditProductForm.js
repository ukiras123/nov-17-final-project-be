import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, ProgressBar, Row } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchAllCategoryAction } from "../../pages/category/catAction";
import { getFileURL } from "../../utils";
import { updateProductAction } from "../../pages/products/productAction";

export const EditProductForm = () => {
  const [product, setProduct] = useState({});
  const [progress, setProgress] = useState(0);
  // const [thumbnail, setThumbnail] = useState();
  const [imgdelete, setImgDelete] = useState([]);
  const { catList } = useSelector((state) => state.categories);

  const { selectedProduct } = useSelector(
    (state) => state.products
  );

  console.table(catList);
  console.table(selectedProduct);
  const [img, setImg] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // !product.slug && dispatch(fetchSingleProduct(id));
    dispatch(fetchAllCategoryAction());
    selectedProduct.slug !== product.slug && setProduct(selectedProduct);
  }, [dispatch, id, selectedProduct, product]);
  //   console.log(cat);

  const handleOnImgAttached = (e) => {
    const { files } = e.target;
    setImg([...files]);
  };
  // console.log(imgdelete);
  const handleOnChange = (e) => {
    let { checked, value, name } = e.target;
    // console.log(name, value);

    if (name === "thumbnail") {
      if (imgdelete.includes(value)) {
        return alert("You cann't select delete");
      }
    }

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setProduct({
      ...product,
      [name]: value,
    });
  };
  // console.log(product?.thumbnail);

  // const imgs = product.images; //this imgs is the selected images arrays

  const handleOnImgDelete = (e) => {
    const { checked, value } = e.target;
    setImgDelete([...imgdelete, value])
  }

    // console.log(checked, name, value);
//     if (checked) {
//       // console.log(product.thumbnail);
//       if (product.thumbnail === value) {
//         return alert("You cannot delete selected thumbnail");
//       }
//       setImgDelete([...imgdelete, value]);
//     } else {
//       const filteredImgs = imgdelete.filter((img) => img !== value);
//       // console.log(filteredImgs);
//       setImgDelete(filteredImgs);
//     }
//   };
  // console.log(imgdelete);
  // console.log(filteredImgs);

  // console.log(product);
  const handleOnDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      //proceed to delete this product
    //   const result = await dispatch(deleteProduct(id));
    //   result && navigate("/products");
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // console.log({ slug, ...product });
    try {
      console.log(img);
      const productData = new FormData();
    //   Let handle image and data separately
      const { images, ...rest} = product;
    //   Data only
      for(let k in rest){
        productData.append(k, product[k])
      }
    //   We want to remove the images that are maked as delet
      const finalImages = images.filter(img=> !imgdelete.includes(img))
    //   Now update the finalImages to productData, convert to product data
      finalImages.forEach(img => {
        productData.append("images", img) 
      });
    //   What if user has uploaded new images, then add them as well on productData
        img.forEach(i => {
            productData.append("images", i)
    
          });
  
      dispatch(updateProductAction(product._id, productData))

      navigate("/products");
    } catch (error) {
      toast.error(error.message);
    }
    // console.log(filteredImgs);
  };
  const inputFields = [
    {
      label: "Product Name",
      name: "title",
      type: "text",
      placeholder: "Title",
      value: product.title,
      required: true,
    },
    {
      label: "sku",
      name: "sku",
      type: "text",
      placeholder: "Sku",
      value: product.sku,
      required: true,
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "$12",
      value: product.price,
      required: true,
    },{
      label: "Quantity",
      name: "qty",
      type: "number",
      placeholder: "23",
      value: product.qty,
      required: true,
    },
    
    
    {
      label: "Sale Price",
      name: "salesPrice",
      type: "number",
      placeholder: "$12",
      value: product.salesPrice,
      required: true,
    },
    {
      label: "Sales Start At",
      name: "salesStart",
      type: "date",
      value: product.salesStart,
      required: true,
    },
    {
      label: "Sales End At",
      name: "salesEnd",
      type: "date",

      value: product.salesEnd,
      required: true,
    },
  ];

  ///for thumbnail and delete

  // console.log("delete" + imgdelete, "thumbnail" + thumbnail);
  // if()
  // console.log(imgdelete);
  return (
    <div>
      <Form
        className='mx-4 border p-5 shadow-lg rounded mt-1'
        onSubmit={handleOnSubmit}
      >
        <h1>Edit Product</h1>
        <Row>
          <Form.Group className='mb-3'>
            <Form.Check
              name='status'
              type='switch'
              id='custom-switch'
              label='Switch'
              checked={product.status === "active"}
              onChange={handleOnChange}
            />
          </Form.Group>
          {inputFields.map((item, i) => (
            <CustomInput
              key={i}
              {...item}
              onChange={handleOnChange}
            />
          ))}
          <FloatingLabel
            controlId='floatingSelect'
            label='Select Categores'
            className='mb-3'
            name='categoryId'
          >
            <Form.Select
              aria-label='Select Product Categories'
              onChange={handleOnChange}
              name='categoryId'
            //   value={product.categoryId}
            >
              {catList.map(({ title, _id }) => {
                return <option
                  key={_id}
                  value={_id}
                  selected={_id === product.categoryId}
                >
                  {title}
                </option>
})}
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            controlId='floatingTextarea'
            label='Product description'
            className='mb-3'
            name='description'
          >
            <Form.Control
              name='description'
              as='textarea'
              placeholder='Product Description'
              style={{ height: "100px" }}
              value={product.description}
              onChange={handleOnChange}
            />
          </FloatingLabel>

          <div className='d-flex gap-2 '>
            {product?.images &&
              product?.images.map((item, id) => (
                <div
                  className='flex-column gap-3'
                  key={id}
                >
                  <div className='d-flex gap-5'>
                    <Form.Check
                      name='thumbnail'
                      type='radio'
                      label='Thumbnail'
                      value={item}
                      checked={product.thumbnail === item}
                      onChange={handleOnChange}
                    />
                  </div>
                  <img
                    key={id}
                    src={getFileURL(item)}
                    alt='images'
                    style={{ width: "150px" }}
                  ></img>
                  <div className='flex-column'>
                    <Form.Check
                      name='delete'
                      type='checkbox'
                      label='Delete'
                      value={item}
                      checked={imgdelete.includes(item)}
                      onChange={handleOnImgDelete}
                    ></Form.Check>
                  </div>
                </div>
              ))}
          </div>
          <Form.Group className='mb-3'>
            <Form.Control
              name='images'
              type='file'
              onChange={handleOnImgAttached}
              multiple
            ></Form.Control>
          </Form.Group>
          <ProgressBar
            animated
            now={progress}
            className='mb-3'
          />
          <Button
            variant='danger'
            className='text-center mb-2'
            onClick={handleOnDelete}
          >
            Delete
          </Button>
          <Button
            variant='success'
            type='submit'
            className='text-center'
          >
            Update
          </Button>
        </Row>

        {/* {inputFields.map((item, i) => (
      <CustomInput
        key={i}
        {...item}
        onChange={handleOnChange}
      />
    ))} */}
      </Form>
    </div>
  );
};
