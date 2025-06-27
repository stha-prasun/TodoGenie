import React, { useEffect } from "react";
import { TODO_API_ENDPOINT } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTodo } from "../redux/todoSlice";

const useGetTodo = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`${TODO_API_ENDPOINT}/get/${id}`, {
          withCredentials: true,
        });

        if (response.data?.success) {
          dispatch(setTodo(response.data.todo));
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (id) {
      fetchTodo();
    }
  }, [id, dispatch]);
};

export default useGetTodo;
