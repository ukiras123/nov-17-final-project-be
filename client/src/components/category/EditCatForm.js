import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Form, Row } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryAction, deleteCat, updateCategoryAction } from "../../pages/category/catAction";
import slugify from "slugify";
import { apiUpdateCategoryAction } from "../../helper/axios";

export const EditCatForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    status: "inactive",
  });
  const { selectedCat } = useSelector((state) => state.categories);

  useEffect(() => {
    setForm(selectedCat);
  }, [selectedCat]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategoryAction(selectedCat._id, form));
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

  const handleOnDelete = () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCat(form.slug));
    }
  };

  return (
    <>
      <Form
        className=" border p-5 shadow-lg rounded mt-3"
        onSubmit={handleOnSubmit}
      >
        <Row>
          <Col md="2">
            <Form.Group className="mb-3">
              <Form.Check
                name="status"
                type="switch"
                label="Status"
                onChange={handleOnChange}
                checked={form.status === "active"}
              />
            </Form.Group>
          </Col>
          <Col md="5">
            <Form.Group className="mb-3">
              <Form.Control
                name="title"
                type="text"
                required
                value={form.title}
                onChange={handleOnChange}
              />
              <Form.Label>{`Slug: ${form.slug}`}</Form.Label>
            </Form.Group>
            <br />
          </Col>

          <Col md="5">
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Update Category
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
      <div className="d-grid">
        <Button onClick={handleOnDelete} variant="danger">
          Delete
        </Button>
      </div>
    </>
  );
};
