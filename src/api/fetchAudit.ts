import {baseApi} from "./baseApi.ts";
import axios from "axios";
import type {IAudit} from "../models/IAudit.ts";

export const fetchAudit = async (request: IAudit) => {
    const ENV = import.meta.env;
    const X_API_KEY = ENV.VITE_X_API_KEY;

    if (!X_API_KEY) {
        throw new Error('Необходимо в env добавить X_API_KEY');
    }

    const { data } = await axios.post<IAudit>(
        `${baseApi}/common/v1/audit/linux/packages`,
        request,
        {
            headers: {'x-api-key': X_API_KEY}
        }
    );
    return data;
};
