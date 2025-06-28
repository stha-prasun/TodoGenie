import { useEffect, useCallback } from "react";
import { TODO_API_ENDPOINT } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTodo } from "../redux/todoSlice";

const useGetTodo = (id) => {
  const dispatch = useDispatch();

  const fetchTodo = useCallback(async () => {
    try {
      const response = await axios.get(`${TODO_API_ENDPOINT}/get/${id}`, {
        withCredentials: true,
      });

      if (response.data?.success) {
        dispatch(setTodo(response.data.todo));
      }
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id) {
      fetchTodo();
    }
  }, [id, fetchTodo]);

  return fetchTodo;
};

export default useGetTodo;
