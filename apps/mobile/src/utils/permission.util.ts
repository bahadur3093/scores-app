export const checkEditPermission = (userId: string, id: string): boolean => {
    if(!userId || !id) return false;
  return userId === id;
};
