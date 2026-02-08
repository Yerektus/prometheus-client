import { request } from "../../request";

export const deleteUser = async (userId: string) => {
  await request.delete(`/api/v1/users/${userId}`);
};
