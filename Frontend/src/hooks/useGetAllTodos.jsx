import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TODO_API_ENDPOINT } from '../utils/constants';
import { setTodos } from '../redux/todosSlice';

const useGetAllTodos = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.User.loggedInUser);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.post(`${TODO_API_ENDPOINT}/get/all`, {
          id: user?._id,
        });

        if (response.data?.success) {
          dispatch(setTodos(response?.data?.todos));
        }
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    if (user?._id) {
      fetchTodos();
    }
  }, [user?._id, dispatch]);
};

export default useGetAllTodos;
