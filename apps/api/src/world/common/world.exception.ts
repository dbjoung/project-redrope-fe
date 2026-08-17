import { CustomException } from "@src/common/exception/CustomException";

export const WorldNotFoundException = () => {
  return new CustomException(409, "W001", "해당 id의 world가 없습니다.");
};

export const WorldJoinConflictException = () => {
  return new CustomException(409, "W002", "이미 가입된 사용자입니다.");
};

export const WorldDeleteForbiddenException = () => {
  return new CustomException(403, "W003", "세계 삭제 권한이 없습니다.");
};
