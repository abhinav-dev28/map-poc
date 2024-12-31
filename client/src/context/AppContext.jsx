import { createContext, useReducer } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AppContext = createContext();

// Initial State
const initialState = {
  userLoacaion: null,
  data: [],
  loading: false,
  error: null,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "API_REQUEST":
      return { ...state, loading: true, error: null };
    case "API_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "API_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "GET_USER_LOCATION": {
      console.log(action.payload);
      return { ...state, userLocation: action.payload };
    }
    default:
      return state;
  }
};

// Provider Component
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchData = async (url, params) => {
    dispatch({ type: "API_REQUEST" });
    try {
      const response = await axios.get(url, { params });

      dispatch({ type: "API_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "API_FAILURE", payload: error.message });
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = position.coords;
          dispatch({ type: "GET_USER_LOCATION", payload: coordinates });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to fetch location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <AppContext.Provider
      value={{ state, dispatch, fetchData, getUserLocation }}
    >
      {children}
    </AppContext.Provider>
  );
};
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
