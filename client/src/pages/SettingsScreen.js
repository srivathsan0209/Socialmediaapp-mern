import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { changePassword, deleteUser } from "../redux/actions/userActions";

export default function SettingsScreen() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!localStorage.getItem("currentUser")) {
    window.location.href = "/login";
  }

  const dispatch = useDispatch();

  const changepasswordState = useSelector(
    (state) => state.changePasswordReducer
  );
  const { changeSuccess, changeLoading, changeError } = changepasswordState;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //changepassword using model - done
  //delete Account using sweetalert
  //account createdAt date

  const changePasswordAction = (e) => {
    e.preventDefault();

    if (newPassword === "" || confirmPassword === "" || oldPassword==="") {
      Swal.fire({
        icon: "error",
        title: "Password Cannot be Empty",
      });
    } else if (newPassword === confirmPassword) {
      dispatch(changePassword(currentUser._id, oldPassword, newPassword));
    } else {
      Swal.fire({
        icon: "error",
        title: "Passwords do not Match",
      });
    }
  };

  const deleteUserAction = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
        alert("Delete User Option is Currently UnAvailable");
        // dispatch(deleteUser(currentUser._id));
      }
    });
  };

  return (
    <div className="row">
      <div style={{ display: "none" }}>
        {changeError && (
          <div>
            {toast.error("Wrong Password")}
            {setTimeout(() => {
              window.location.reload();
            }, 1500)}
          </div>
        )}
        {changeLoading && toast.info("Loading")}
        {changeSuccess && (
          <div>
            {toast.success("Password Updated Successfully")}
            {setTimeout(() => {
              window.location.reload();
            }, 1500)}
          </div>
        )}
      </div>
      <h1>Settings</h1>
      <div className="col-md-6">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#passwordModal"
        >
          Change Password
        </button>
      </div>
      <div className="col-md-6">
        <button
          onClick={(e) => {
            deleteUserAction(e);
          }}
          type="button"
          className="btn btn-primary"
        >
          Delete User
        </button>
      </div>
      <div className="modal fade" id="passwordModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="passwordModalLabel">
                Change Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                  placeholder="Old Password"
                  required
                  title="Enter your Old Password"
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  placeholder="New Password"
                  required
                  title="Enter your New Password"
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="Confirm New Password"
                  required
                  title="Confirm your New Password"
                />
              </form>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={changePasswordAction}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
