import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

function UpdateUser() {
  // const [isLoading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const [updatedData, setUpdatedData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  // notify
  const notifyForDataUpdatedSuccessfully = () =>
    toast.success("User Update Successfully");

  const userId = params.id;

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [userBeforeUpdate, setUserBeforeUpdate] = useState([]);
  const formData = { name, mobile, email, userId };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/user/updateUser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      notifyForDataUpdatedSuccessfully();
      setUpdatedData(data);
      navigate("/all-users");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleMobile = (e) => {
    setMobile(e.target.value);
  };

  // fetch the user for the default value
  const fetchSingleUser = () => {
    fetch(`/api/user/${userId}`, {
      method: "get",
      body: JSON.stringify(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const res = response.json();
        res
          .then((data) => {
            setUserBeforeUpdate(data.user);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchSingleUser();
  }, []);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Update User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col  gap-4">
        <div className="flex">
          <div className="flex flex-col ">
            <div className="flex">
              <input
                type="text"
                placeholder="name"
                className="border p-3 rounded-lg"
                id="name"
                onChange={handleName}
                defaultValue={userBeforeUpdate.name}
              />
              <input
                type="text"
                placeholder="mobile"
                className="border p-3 rounded-lg"
                id="mobile"
                onChange={handleMobile}
                defaultValue={userBeforeUpdate.mobile}
              />
            </div>

            <input
              type="email"
              placeholder="email"
              className="border p-3 rounded-lg"
              id="email"
              onChange={handleEmail}
              defaultValue={userBeforeUpdate.email}
            />
          </div>
        </div>
        <div className="flex justify-center content-center items-center mx-auto w-full">
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full mx-auto">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
