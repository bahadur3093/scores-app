import { RootState } from "../store";

export const getUserDetails = () => (state: RootState) => state.user.userDetails;
