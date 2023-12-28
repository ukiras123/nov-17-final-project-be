
import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { verifyUser } from "../../helper/axios";
import { toast } from "react-toastify";

const AdminVerification = () => {
  const [queryString] = useSearchParams();
  const c = queryString.get("c")
  const e = queryString.get("e")
  console.log(e)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("verifying user")
    // You can not make a useEffect function as async
    if (!e || !c) {
      navigate("/")
      return
    }
    verifyUser({ e, c }).then(res => {
      setIsLoading(false)
      toast[res.status](res.message)
      if (res.status === 'success') {
        navigate("/")
      }
    })
  }, [c, e, navigate])
  return (
    <>
      <Header />
      <main className="main">
        {isLoading &&
          <div className="text-center m-5">
            <Spinner />
            <h3>Please wait, verifying your email</h3>
          </div>
        }
      </main>
      <Footer />
    </>
  );
};

export default AdminVerification;
