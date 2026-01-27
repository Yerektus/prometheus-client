import { ErrorCode } from "../constants/error-code";
import { toast } from "sonner";

const messages = {
  [ErrorCode.InternalServerError]: "internal_server_error",
  [ErrorCode.UserAlreadyExist]: "user_already_exist",
  [ErrorCode.RoleAlreadyExist]: "role_already_exist",
  [ErrorCode.LocationAlreadyExist]: "location_already_exist",
  [ErrorCode.LocationNotFound]: "location_not_found",
  [ErrorCode.UserNotFound]: "user_not_found",
  [ErrorCode.OwnerNotFound]: "owner_not_found",
  [ErrorCode.RoleNotFound]: "role_not_found",
  [ErrorCode.CredentialsAreInvalid]: "credentials_are_invalid",
};

export const buildHttpHandler = (error: unknown) => {
  const { response } = error as {
    response: { data: { error_code: ErrorCode } };
  };

  const errorCode = response.data.error_code;

  toast.error(messages[errorCode] || "Unkown error occurred.");
};
