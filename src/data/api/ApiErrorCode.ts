export const ApiErrorCodeType = {
  '400': '400',
  '401': '401',
  '403': '403',
  '404': '404',
  '405': '405',
  '409': '409',
  '413': '413',
  '500': '500',
  '503': '503',
};
export type ApiErrorCodeType = keyof typeof ApiErrorCodeType;

export const ApiErrorCode: Record<
  ApiErrorCodeType,
  {
    code: ApiErrorCodeType;
    message: { name: string; text: string }[];
  }
> = {
  /**
   * 400 UNAUTHORIZED
   */
  '400': {
    code: '400',
    message: [
      { name: 'FIELD_REQUIRED', text: '모든 필수 정보를 입력해주세요.' },
      { name: 'POSITION_UNSELECTED', text: '본인의 포지션을 먼저 선택해주세요.' },
      {
        name: 'POSITION_UNSELECTED',
        text: '오픈채팅 링크는 25~100자만 가능합니다.',
      },
    ],
  },
  /**
   * 401 UNAUTHORIZED
   */
  '401': {
    code: '401',
    message: [
      {
        name: 'TOKEN_AUTHENTICATION_FAIL',
        text: '토큰 인증에 실패했습니다. 다시 로그인한 후 이용해주세요.',
      },
      { name: 'TOKEN_REQUIRED_FAIL', text: '헤더에 토큰이 없습니다.' },
      { name: 'LOGIN_FAIL', text: '로그인에 실패했습니다.' },
      {
        name: 'USERNAME_EMAIL_NO_MATCH',
        text: '아이디와 이메일 정보가 일치하지 않습니다.',
      },
      {
        name: 'PASSWORD_AUTHENTICATION_FAIL',
        text: '비밀번호가 틀렸습니다.',
      },
    ],
  },
  /**
   * 403 FORBIDDEN
   */
  '403': {
    code: '403',
    message: [
      { name: 'ROLE_NOT_ALLOWED', text: '권한이 없습니다.' },
      {
        name: 'TOKEN_NOT_ALLOWED',
        text: '권한이 없는 토큰입니다. 다시 로그인한 후 이용해주세요.',
      },
    ],
  },
  /**
   * 404 NOT_FOUND
   */
  '404': {
    code: '404',
    message: [
      { name: 'USER_NOT_FOUND', text: '존재하지 않는 사용자입니다.' },
      { name: 'EMAIL_NOT_FOUND', text: '존재하지 않는 이메일입니다.' },
      { name: 'EDUCATION_NOT_FOUND', text: '존재하지 않는 학력입니다.' },
      { name: 'WORK_NOT_FOUND', text: '존재하지 않는 경력입니다.' },
      { name: 'SKILL_NOT_FOUND', text: '존재하지 않은 기술입니다.' },
      { name: 'PORTFOLIO_NOT_FOUND', text: '존재하지 않은 포트폴리오입니다.' },
    ],
  },
  /**
   * 405 METHOD_NOT_ALLOWED
   */
  '405': {
    code: '405',
    message: [{ name: 'METHOD_NOT_ALLOWED', text: '사용할 수 없는 메소드 입니다.' }],
  },
  /**
   * 409 CONFLICT
   */
  '409': {
    code: '409',
    message: [],
  },
  /**
   * 413 PAYLOAD_TOO_LARGE
   */
  '413': {
    code: '413',
    message: [
      { name: 'FILE_SIZE_EXCEED', text: '파일 용량이 초과되었습니다' },
      { name: 'FILE_COUNT_EXCEED', text: '파일 개수가 초과되었습니다' },
    ],
  },
  /**
   * 500 INTERNAL_SERVER_ERROR
   */
  '500': {
    code: '500',
    message: [
      {
        name: 'SERVER_ERROR',
        text: '서버 에러가 발생했습니다. 최대한 빠른 시일내 수정하겠습니다.',
      },
      {
        name: 'MAIL_SENDING_ERROR',
        text: '이메일 발송 중 에러가 발생했습니다. 최대한 빠른 시일내 수정하겠습니다.',
      },
    ],
  },

  '503': {
    code: '503',
    message: [
      {
        name: 'ONGOING_INSPECTION',
        text: '서버 점검중입니다. 이용에 불편을 드려 죄송합니다.',
      },
    ],
  },
};
