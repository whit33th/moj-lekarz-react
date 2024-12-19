import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function usePosts() {
  function usePosts() {
    return axios.get("https://jsonplaceholder.typicode.com/todos/1");
  }

  const { data } = useQuery({
    queryKey: ["sessionValid"],
    queryFn: usePosts,
    select: (data) => data.data,
  });

  return { data };
}

export default usePosts;
