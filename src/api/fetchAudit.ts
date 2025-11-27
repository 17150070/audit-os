import {baseApi} from "./baseApi.ts";
import axios from "axios";
import type {IAudit} from "../models/IAudit.ts";

export const fetchAudit = async (request: IAudit) => {

    const { data } = await axios.post<IAudit>(
        `${baseApi}/common/v1/audit/linux/packages`,
        request,
        {
            headers: {'x-api-key': 'c357d3b8-09ea-4e68-8ed7-a3fae2822c17'}
        }
    );
    return data;
};
