"use client";
import React, { useState, useEffect } from "react";
import style from "./profile.module.scss";
import CustomerProfile from "@/models/customer";
import { getCustomer } from "../../services/getCustomer-rest-service";
import { updateCustomer } from "../../services/updateCustomer-rest-service";
import jwtDecode from "jwt-decode";
import { deleteCustomer } from "../../services/deleteCustomerRest-service";

const CustomerProfile = () => {
  const [userData, setUserData] = useState<CustomerProfile | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //get token from browser local storage
  const jwt: any = localStorage.getItem("token");
  //decode token

  const user: any = jwtDecode(jwt);
  const customerID: any = user._id;
  const API_URL = `/customers/${customerID}`;

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        // Fetch data from your API endpoint
        const customerData: any = await getCustomer(API_URL);
        setUserData(customerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCustomer();
  }, []);
  const handleEditModeToggle = (event: any) => {
    event.preventDefault();
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (field: keyof CustomerProfile, value: string) => {
    if (userData) {
      setUserData({
        ...userData,
        [field]: value,
      });
    }
  };

  const handleSave = async () => {
    try {
      await updateCustomer(API_URL, userData);
      setIsEditMode(false);
      window.alert("Profile update successful");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (event: any) => {
    event.preventDefault();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (event: any) => {
    event.preventDefault();
    //
    try {
      await deleteCustomer(API_URL);
      localStorage.removeItem("token");
    } catch (error) {
      console.log(`error deleting customer:${error}`);
    } 
 window.location.href = "/goodbye";
  };

  return (
    <div className={style.container}>
      <h1>Customer Information</h1>
      {userData ? (
        <form>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              readOnly={!isEditMode}
            />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" value={userData.email} readOnly />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              value={userData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              readOnly={!isEditMode}
            />
          </div>
          <div>
            <label>DOB:</label>
            <input
              type="text"
              value={userData.DOB}
              onChange={(e) => handleInputChange("DOB", e.target.value)}
              readOnly={!isEditMode}
            />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              value={userData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              readOnly={!isEditMode}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              value={userData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              readOnly={!isEditMode}
            />
          </div>

          <div className={style.updateDelete}>
            {isEditMode ? (
              <>
                <button className={style.btn_secondary} onClick={handleSave}>
                  Save
                </button>
                <button
                  className={style.btn_secondary}
                  onClick={handleEditModeToggle}
                >
                  Cancel
                </button>
                <button className={style.btn_danger} onClick={handleDelete}>
                  Delete
                </button>
              </>
            ) : (
              <button
                className={style.btn_primary}
                onClick={handleEditModeToggle}
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      ) : (
        <p>Loading user data...</p>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={style.confirmDelete}>
          <div className={style.confirmdelete_content}>
            <h2 className={style.confirmDeleteHP}>Confirm account Delete!!!</h2>
            <p className={style.confirmDeleteHP}>
              Are you sure you want to delete your profile?
            </p>
            <div className={style.modal_buttons}>
              <button
                className={style.btn_secondary}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className={style.btn_danger}
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerProfile;
