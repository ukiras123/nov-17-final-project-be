import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";
import { useDispatch } from "react-redux";
import { addCategoryAction } from "../../pages/category/catAction";
import slugify from "slugify";

export const NewCatForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    status: "inactive",
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const slug = slugify(form.name, { lower: true, trim: true });
    dispatch(addCategoryAction({ ...form, slug }));
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

  return (
    <div>
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
              />
            </Form.Group>
          </Col>
          <Col md="5">
            <Form.Group className="mb-3">
              <Form.Control
                name="name"
                type="text"
                label=""
                required
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
          <Col md="5">
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Add New Category
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
