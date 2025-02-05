import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/userSlice";

export const useAuth = () =>{
    var user = useSelector(selectUser).user;
    return useMemo(() => ({user}), [user]);
};