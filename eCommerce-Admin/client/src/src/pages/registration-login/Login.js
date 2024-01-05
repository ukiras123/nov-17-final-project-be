import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useEffect, useState } from "react";
import { auth } from "../../config/firebase-config";
import { toast } from "react-toastify";
import { loginAdminUser } from "./userAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const location = useLocation();
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.adminInfo);

  const pathName = location.state?.from?.pathname || "/dashboard";
  console.log(location, pathName);
  useEffect(() => {
    user?.uid && navigate(pathName);
  }, [user?.uid, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(loginAdminUser(form));
  };

  const inputFields = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Smith@email.com",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "********",
      required: true,
      minLength: "6",
    },
  ];
  return (
    <>
      <Header />
      <main className="main">
        <Form
          className="register border p-5 shadow-lg rounded mt-5"
          onSubmit={handleOnSubmit}
        >
          <h1>Admin Login - Welcome</h1>
          <hr />
          {inputFields.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
          <p className="text-end mt-3">
            Forget Password? <Link to="/password-reset-request">Reset</Link>{" "}
            Now!
          </p>
        </Form>
      </main>
      <Footer />
    </>
  );
};

export default Login;
