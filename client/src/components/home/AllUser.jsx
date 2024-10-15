import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../../redux/user/userSlice";

import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteUser from "./DeleteUser";

function AllUser() {
  const [openPopup, setOpenPopup] = useState(false);

  const HandleRemovePopUp = () => setOpenPopup(false);
  const dispatch = useDispatch();

  const { currentUser, loading, error } = useSelector((state) => state.user);
  console.log(currentUser.user);

  const [users, setUsers] = useState();
  const navigate = useNavigate();
  const notifyForYouAreNotAdmin = () =>
    toast.error("You are not an admin user to access this route");

  // fetch the currentUser
  // fetch the single user
  const fetchSingleUser = () => {
    try {
      fetch(`/api/user/${currentUser.user._id}`, {
        method: "get",
        body: JSON.stringify(),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const res = response.json();
          res.then((data) => {
            console.log(data);
            if (!data) {
              console.log("false");
            }
          });
        })
        .catch((error) => {
          if (error) {
            try {
              dispatch(signOutUserStart());
              fetch("/api/auth/logout")
                .then((res) => {
                  console.log(res);
                  if (res.ok === false) {
                    dispatch(signOutUserFailure(res.statusText));
                    console.log("false");
                  }
                  dispatch(signOutUserSuccess());
                  navigate("/sign-in");
                })
                .catch((error) => {
                  console.log(error);
                });
            } catch (error) {
              dispatch(signOutUserFailure(error.message));
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleUser();
  }, []);

  //fetch the todo from the json api
  const userdata = () => {
    fetch("/api/user", {
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
            setUsers(data);
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
    userdata();
  }, []);

  return (
    <div class=" relative overflow-x-auto  shadow-md sm:rounded-lg border justify-center items-center text-center">
      <ToastContainer />
      <table class="w-full overflow-auto text-sm text-left rtl:text-center  text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  border ">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Mobile
            </th>
            <th scope="col" class="px-6 py-3">
              Role
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Edit
            </th>
            <th scope="col" class="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.users &&
            users.users?.map((user, index) => {
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {/* <td
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white space-x-5"
                  >
                    <div class="text-base font-semibold">Neil Sims</div>
                    <div class="font-normal text-gray-500">
                      neil.sims@flowbite.com
                    </div>
                  </td> */}
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="h-2.5 w-2.5 rounded-full  me-2"></div>{" "}
                      {user.name}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="h-2.5 w-2.5 rounded-full  me-2"></div>{" "}
                      {user.email}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="h-2.5 w-2.5 rounded-full  me-2"></div>{" "}
                      {user.mobile}
                    </div>
                  </td>
                  <td class="px-6 py-4">{user.role}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="h-2.5 w-2.5 rounded-fullme-2"></div>{" "}
                      {user.status}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <Link
                      to={`/update-user/${user._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit user
                    </Link>
                  </td>
                  <td class="px-3 py-3">
                    <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline ">
                      <div>
                        <button onClick={() => setOpenPopup(true)}>
                          Delete user
                        </button>
                      </div>
                      <DeleteUser
                        openPopUp={openPopup}
                        closePopUp={HandleRemovePopUp}
                        userId={user._id}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default AllUser;
