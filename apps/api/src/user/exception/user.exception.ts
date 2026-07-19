import { CustomException } from "@src/common/exception/CustomException";

export const UserNotFoundException = () => {
  return new CustomException(404, "U001", "User Not Found");
};

export const UserCreationException = () => {
  return new CustomException(404, "U002", "User Can't add");
};

export const UserUpdateException = () => {
  return new CustomException(404, "U003", "User Can't update");
};

export const UserDeleteException = () => {
  return new CustomException(405, "U003", "User Can't delete");
};
