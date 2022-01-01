import axios from "axios";

export const handleChangeText = (state, setState) => e => {
  setState({ ...state, [e.target.name]: e.target.value });
};

export const errorProps = (formState, name) => ({
  error: Boolean(formState.errors[name]),
  helperText: formState.errors[name]?.message,
});

export const attachToken = axios => {
  axios.defaults.headers.authorization = `Bearer ${localStorage.getItem("userAuthToken")}`;
};

export const required = { value: true, message: "This field is required" };
