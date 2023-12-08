import React, { useState } from "react";
import { Button, Col, Form, ProgressBar, Row } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { addProductAction } from "../../pages/products/productAction";
import slugify from "slugify";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import store from "../../store";
import { storage } from "../../config/firebase-config";

export const NewProductForm = () => {
  const dispatch = useDispatch();

  const { catList } = useSelector((state) => state.categories);

  const [form, setForm] = useState({
    status: "inactive",
  });
  const [progress, setProgress] = useState(0);
  const [img, setImg] = useState();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const slug = slugify(form.title, { lower: true, trim: true });

      // uploda the images receive the url
      let images = [];
      if (img.length) {
        //loop through images
        const imagesPending = img.map((img) => {
          return new Promise((resolve, reject) => {
            const storeRef = ref(
              storage,
              `/products/img/${Date.now()}-${img.name}`
            );

            const uploadImg = uploadBytesResumable(storeRef, img);

            uploadImg.on(
              //state change
              "state_changed",

              // progress while uploading
              (snapshot) => {
                console.log(snapshot);
                const per = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setProgress(per);
              },

              // catch erro if any thrown
              (error) => {
                console.log(error);
                toast.error(error.message);
              },

              // once uploading process is completed, get the url of the upload image
              async () => {
                await getDownloadURL(uploadImg.snapshot.ref).then((url) => {
                  resolve(url);
                });
              }
            );
          });
        });

        const imageUrls = await Promise.all(imagesPending);
        // add the url with from
        dispatch(
          addProductAction({
            ...form,
            slug,
            images: imageUrls,
            thumbnail: imageUrls[0],
          })
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const inputs = [
    {
      label: "Product Name",
      name: "title",
      type: "text",
      placeholder: "mobile phone",
      required: true,
    },
    {
      label: "SKU",
      name: "sku",
      type: "text",
      placeholder: "MB_KD8",
      required: true,
    },

    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "34",
      required: true,
    },
    {
      label: "Qty",
      name: "qty",
      type: "number",
      placeholder: "33",
      required: true,
    },
    {
      label: "Sales Price",
      name: "salesPrice",
      type: "number",
      placeholder: "22",
    },
    {
      label: "Sales Start From",
      name: "salesStartAt",
      type: "date",
    },
    {
      label: "Sales End From",
      name: "salesEndAt",
      type: "date",
    },
    {
      label: "Product Description",
      name: "description",
      type: "text",
      as: "textarea",
      placeholder: "Product details ....",
      required: true,
      rows: 10,
    },
  ];

  const handleOnImageAttached = (e) => {
    const { files } = e.target;

    setImg([...files]);
  };

  return (
    <div>
      <Form
        className=" border p-5 shadow-lg rounded mt-3"
        onSubmit={handleOnSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Check
            name="status"
            type="switch"
            label="Status"
            onChange={handleOnChange}
          />
        </Form.Group>

        {/* category dropdown */}
        <Form.Group className="mb-3">
          <Form.Label>Select Category</Form.Label>
          <Form.Select name="parentCat" onChange={handleOnChange}>
            <option value="">--select --</option>
            {catList.map(({ name, slug }, i) => (
              <option key={i} value={slug}>
                {name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {inputs.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        {/* image uploader */}

        <Form.Group className="mb-3">
          <Form.Control
            name="images"
            type="file"
            onChange={handleOnImageAttached}
            multiple
          />
          <ProgressBar animated now={progress} />
        </Form.Group>

        <div className="d-grid">
          <Button variant="outline-dark" type="submit">
            Add Product
          </Button>
        </div>
      </Form>
    </div>
  );
};
