import React from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export const CategoryTale = () => {
  const { catList } = useSelector((state) => state.categories);
  return (
    <div className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Status</th>
            <th> Name</th>
            <th>Slug </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {catList.map((item, i) => (
            <tr key={item.slug}>
              <td>{i + 1}</td>
              <td>
                <span className={item.status}>{item.status}</span>
              </td>
              <td>{item.name}</td>
              <td>{item.slug}</td>
              <td>
                <Button variant="warning">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
