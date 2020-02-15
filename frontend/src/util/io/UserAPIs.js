export const getProfileImage = (userId, partialPath) => {
  return `/user/static/${userId}/${partialPath}`;
};
export const getAccountPath = (userId, partialPath) => {
  return `/account/${userId}/${partialPath}`;
};
