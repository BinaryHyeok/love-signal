import axios, { AxiosResponse } from "axios";

export const fetchList = async (
  gender: string,
  size: number,
  teamUUIDList: string[]
) => {
  return axios({
    method: "post",
    url: `http://localhost:9005/team/opposite-gender/teams?gender=${gender}&size=${size}`,
    data: { teamUUIDList },
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};
