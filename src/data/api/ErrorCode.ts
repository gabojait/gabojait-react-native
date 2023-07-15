export default {
  // @Size
  USERNAME_LENGTH_INVALID: {name: 'USERNAME_LENGTH_INVALID', text: '아이디는 5~15자만 가능합니다.'},
  PASSWORD_LENGTH_INVALID: {
    name: 'PASSWORD_LENGTH_INVALID',
    text: '비밀번호는 8~30자만 가능합니다.',
  },
  LEGALNAME_LENGTH_INVALID: {name: 'LEGALNAME_LENGTH_INVALID', text: '실명은 2~5자만 가능합니다.'},
  NICKNAME_LENGTH_INVALID: {name: 'NICKNAME_LENGTH_INVALID', text: '닉네임은 2~8자만 가능합니다.'},
  INISTITUTIONNAME_LENGTH_INVALID: {
    name: 'INISTITUTIONNAME_LENGTH_INVALID',
    text: '학교명은 3~20자만 가능합니다.',
  },
  CORPORTATIONNAME_LENGTH_INVALID: {
    name: 'CORPORTATIONNAME_LENGTH_INVALID',
    text: '기관명은 1~20자만 가능합니다.',
  },
  PORTFOLIONAME_LENGTH_INVALID: {
    name: 'PORTFOLIONAME_LENGTH_INVALID',
    text: '포트폴리오명은 1~10자만 가능합니다.',
  },
  URL_LENGTH_INVALID: {name: 'URL_LENGTH_INVALID', text: 'URL은 1~1000자만 가능합니다'},
  SKILLNAME_LENGTH_INVALID: {
    name: 'SKILLNAME_LENGTH_INVALID',
    text: '기술명은 1~20자만 가능합니다.',
  },

  // @Email @Pattern
  EMAIL_FORMAT_INVALID: {name: 'EMAIL_FORMAT_INVALID', text: '올바른 이메일 형식이 아닙니다.'},
  USERNAME_FORMAT_INVALID: {
    name: 'USERNAME_FORMAT_INVALID',
    text: '아이디는 영문과 숫자의 형식만 가능합니다.',
  },
  NICKNAME_FORMAT_INVALID: {
    name: 'NICKNAME_FORMAT_INVALID',
    text: '닉네임은 한글 형식만 가능합니다.',
  },
  PASSWORD_FORMAT_INVALID: {
    name: 'PASSWORD_FORMAT_INVALID',
    text: '비밀번호는 영문, 숫자, 특수문자(#$@!%&*?)의 조합의 형식만 가능합니다.',
  },
  LEGALNAME_FORMAT_INVALID: {
    name: 'LEGALNAME_FORMAT_INVALID',
    text: '실명은 한글 형식만 가능합니다.',
  },

  // Custom
  EMAIL_VERIFICATION_INVALID: {
    name: 'EMAIL_VERIFICATION_INVALID',
    text: '이메일 인증을 먼저 해주세요.',
  },
  VERIFICATIONCODE_INVALID: {name: 'VERIFICATIONCODE_INVALID', text: '인증번호가 틀렸습니다.'},
  GENDER_FORMAT_INVALID: {
    name: 'GENDER_FORMAT_INVALID',
    text: '성별은 male, female 중 하나입니다.',
  },
  PASSWORD_MATCH_INVALID: {
    name: 'PASSWORD_MATCH_INVALID',
    text: '비밀번호와 비밀번호 재입력이 동일하지 않습니다.',
  },
  LEVEL_FORMAT_INVALID: {
    name: 'LEVEL_FORMAT_INVALID',
    text: '레벨은 low, mid, high 중 하나입니다.',
  },
  PORTFOLIOTYPE_FORMAT_INVALID: {
    name: 'PORTFOLIOTYPE_FORMAT_INVALID',
    text: '포트폴리오 타입은 file, link 중 하나입니다.',
  },
  POSITION_FORMAT_INVALID: {
    name: 'POSITION_FORMAT_INVALID',
    text: '포지션은 designer, backend, frontend, manager 중 하나입니다.',
  },
  /**
   * 400 UNAUTHORIZED
   */
  FIELD_REQUIRED: {name: 'FIELD_REQUIRED', text: '모든 필수 정보를 입력해주세요.'},
  POSITION_UNSELECTED: {name: 'POSITION_UNSELECTED', text: '본인의 포지션을 먼저 선택해주세요.'},
  OPENCHATURL_FORMAT_INVALID: {
    name: 'POSITION_UNSELECTED',
    text: '오픈채팅 링크는 25~100자만 가능합니다.',
  },
  /**
   * 401 UNAUTHORIZED
   */
  TOKEN_AUTHENTICATION_FAIL: {
    name: 'TOKEN_AUTHENTICATION_FAIL',
    text: '토큰 인증에 실패했습니다. 다시 로그인한 후 이용해주세요.',
  },
  TOKEN_REQUIRED_FAIL: {name: 'TOKEN_REQUIRED_FAIL', text: '헤더에 토큰이 없습니다.'},
  LOGIN_FAIL: {name: 'LOGIN_FAIL', text: '로그인에 실패했습니다.'},
  USERNAME_EMAIL_NO_MATCH: {
    name: 'USERNAME_EMAIL_NO_MATCH',
    text: '아이디와 이메일 정보가 일치하지 않습니다.',
  },
  PASSWORD_AUTHENTICATION_FAIL: {
    name: 'PASSWORD_AUTHENTICATION_FAIL',
    text: '비밀번호가 틀렸습니다.',
  },

  /**
   * 403 FORBIDDEN
   */
  ROLE_NOT_ALLOWED: {name: 'ROLE_NOT_ALLOWED', text: '권한이 없습니다.'},
  TOKEN_NOT_ALLOWED: {
    name: 'TOKEN_NOT_ALLOWED',
    text: '권한이 없는 토큰입니다. 다시 로그인한 후 이용해주세요.',
  },

  /**
   * 404 NOT_FOUND
   */
  404: {
    code: '404',
    message: {
      USER_NOT_FOUND: {name: 'USER_NOT_FOUND', text: '존재하지 않는 사용자입니다.'},
      EMAIL_NOT_FOUND: {name: 'EMAIL_NOT_FOUND', text: '존재하지 않는 이메일입니다.'},
      EDUCATION_NOT_FOUND: {name: 'EDUCATION_NOT_FOUND', text: '존재하지 않는 학력입니다.'},
      WORK_NOT_FOUND: {name: 'WORK_NOT_FOUND', text: '존재하지 않는 경력입니다.'},
      SKILL_NOT_FOUND: {name: 'SKILL_NOT_FOUND', text: '존재하지 않은 기술입니다.'},
      PORTFOLIO_NOT_FOUND: {name: 'PORTFOLIO_NOT_FOUND', text: '존재하지 않은 포트폴리오입니다.'},
    },
  },

  /**
   * 405 METHOD_NOT_ALLOWED
   */
  METHOD_NOT_ALLOWED: {name: 'METHOD_NOT_ALLOWED', text: '사용할 수 없는 메소드 입니다.'},

  /**
   * 409 CONFLICT
   */
  EXISTING_EMAIL: {name: 'EXISTING_EMAIL', text: '이미 사용중인 이메일입니다.'},
  EXISTING_USERNAME: {name: 'EXISTING_USERNAME', text: '이미 사용중인 아이디입니다.'},
  EXISTING_NICKNAME: {name: 'EXISTING_NICKNAME', text: '이미 사용중인 닉네임입니다.'},

  /**
   * 413 PAYLOAD_TOO_LARGE
   */
  FILE_SIZE_EXCEED: {name: 'FILE_SIZE_EXCEED', text: '파일 용량이 초과되었습니다'},
  FILE_COUNT_EXCEED: {name: 'FILE_COUNT_EXCEED', text: '파일 개수가 초과되었습니다'},

  /**
   * 500 INTERNAL_SERVER_ERROR
   */
  500: {
    code: '500',
    message: {
      SERVER_ERROR: {
        name: 'SERVER_ERROR',
        text: '서버 에러가 발생했습니다. 최대한 빠른 시일내 수정하겠습니다.',
      },
      MAIL_SENDING_ERROR: {
        name: 'MAIL_SENDING_ERROR',
        text: '이메일 발송 중 에러가 발생했습니다. 최대한 빠른 시일내 수정하겠습니다.',
      },
    },
  },

  503: {
    code: '503',
    message: {
      ONGOING_INSPECTION: {
        name: 'ONGOING_INSPECTION',
        text: '서버 점검중입니다. 이용에 불편을 드려 죄송합니다.',
      },
    },
  },
}
