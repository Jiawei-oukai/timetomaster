import React from "react";

 const Logout = () => {
    localStorage.removeItem("token")
    window.location.href = "/";

    return null;
}
export default Logout;