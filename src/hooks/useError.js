import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selecApiError } from "../store/slices/apiErrorSlice";

export const useError = () =>{
    var apiError = useSelector((state)=>state.apiError);
    return useMemo(() => ({apiError}), [apiError]);
};