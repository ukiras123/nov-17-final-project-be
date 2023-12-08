import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { EditCatForm } from "./EditCatForm";
import { setSelectedCat } from "../../pages/category/catSlice";
import { CustomModal } from "../customModal/CustomModal";
import { setModalShow } from "../../system-state/systemSlice";

export const CategoryTable = () => {
  const dispatch = useDispatch();
  const { catList } = useSelector((state) => state.categories);
  const [display, setDisplay] = useState([]);
  useEffect(() => {
    setDisplay(catList);
  }, [catList]);

  const handleOnEdit = (item) => {
    dispatch(setSelectedCat(item));
    dispatch(setModalShow(true));
  };

  const handleOnSearch = (e) => {
    const { value } = e.target;

    setDisplay(
      catList.filter(({ name }) =>
        name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  return (
    <div className="mt-5">
      <CustomModal title="Update Category">
        <EditCatForm />
      </CustomModal>
      <div className="w-25 mb-3">
        <Form.Control onChange={handleOnSearch} placeholder="Search by name" />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Status</th>
            <th> Title</th>
            <th>Slug </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {display.map((item, i) => (
            <tr key={item.slug}>
              <td>{i + 1}</td>
              <td>
                <span className={item.status}>{item.status}</span>
              </td>
              <td>{item.title}</td>
              <td>{item.slug}</td>
              <td>
                <Button variant="warning" onClick={() => handleOnEdit(item)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
