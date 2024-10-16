import { logout } from "../features/auth/authSlice";
import store from "../app/store";
import { GETALLTEAMS, LOGOUTUSER, NEWACCESSTOKEN } from "../urls";

export const logoutUser = async (refreshToken) => {
  console.log("hhhhhhhhhhhhhhhhhhhhhhhh");
  try {
    const response = await fetch(LOGOUTUSER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    store.dispatch(logout());
    console.log("Logout successful");

    // if (response.ok) {
    // } else {
    //   console.error("Logout failed with status:", response.status);
    //   return false;
    // }
  } catch (error) {
    console.error("Logout failed:", error);
    return error;
  }
};

export const getNewAccessToken = async (refreshToken) => {
  console.log("heeeeeeeeeeeeeeeeeyyyyyyyyyyy");
  try {
    const response = await fetch(NEWACCESSTOKEN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.status === 403) {
      return;
    } else if (response.status === 201) {
      const data = await response.json();
      return data.data.accessToken;
    }
  } catch (error) {
    console.error("Error fetching new access token:", error);
  }
};

export const makeAnyServerRequest = async (
  linkOfTheTaskYouWantFromBackend,
  requestType,
  requestBody
) => {
  const state = store.getState();
  const accessToken = state.auth.accessToken;
  const refreshToken = state.auth.refreshToken;

  try {
    let response = await fetch(linkOfTheTaskYouWantFromBackend, {
      method: requestType,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: requestBody ? JSON.stringify(requestBody) : null,
    });

    if (response.status === 401) {
      const newAccessToken = await getNewAccessToken(refreshToken);
      if (!newAccessToken) {
        await logoutUser(refreshToken);
      } else {
        store.getState().auth.accessToken = newAccessToken;
        return await makeAnyServerRequest(
          linkOfTheTaskYouWantFromBackend,
          requestType,
          requestBody
        );
      }
    } else if (response.status === 400) {
      const data = await response.json();
      console.log("data errorrr", data.message);
      return data;
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error making server request:", error);
    return error;
  }
};

