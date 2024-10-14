import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function DeleteUser({ openPopUp, closePopUp, userId }) {
  console.log(userId);
  const handlelosePopUp = (e) => {
    if (e.target.id === "ModelContainer") {
      closePopUp();
    }
  };
  const navigate = useNavigate();

  const notifyForDeleteUser = (msg) => {
    toast.success(msg);
  };

  const notifyForError = (msg) => {
    toast.error(msg);
  };

  if (openPopUp !== true) return null;
  //handle confirm button
  const handleConfirm = async () => {
    try {
      const res = await fetch("/api/user/deleteUser/" + userId, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.msg) {
        notifyForDeleteUser(data.msg);
        navigate("/all-users");
        window.location.reload();
        closePopUp();
        return;
      }
      notifyForError("Something went wrong");
    } catch (error) {
      notifyForError(error);
    }
  };

  return (
    <div
      id="ModelContainer"
      onClick={handlelosePopUp}
      className="fixed inset-0 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm"
    >
      <div
        data-dialog="dialog"
        className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm"
      >
        <div className="flex justify-center content-center mt-12 shrink-0 items-center pb-4 text-xl font-medium text-slate-800">
          Are you sure you want to delete the user
        </div>

        <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
          <button
            data-dialog-close="true"
            className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            id="ModelContainer"
            onClick={handlelosePopUp}
          >
            Cancel
          </button>
          <button
            data-dialog-close="true"
            className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
