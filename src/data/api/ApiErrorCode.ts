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

export const ApiErrorCode = {
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
    TOKEN_UNAUTHENTICATED: {
      name: 'TOKEN_UNAUTHENTICATED',
      text: '승인되지 않은 요청입니다. 로그인 후에 다시 시도 해주세요.',
    },
    message: [
      {
        name: 'LOGIN_UNAUTHENTICATED',
        text: '아이디 또는 비밀번호가 틀렸습니다.',
      },
      {
        name: 'PASSWORD_UNAUTHENTICATED',
        text: '비밀번호가 틀렸습니다.',
      },
    ],
  },
  /**
   * 403 FORBIDDEN
   */
  '403': {
    code: '403',
    TOKEN_UNAUTHORIZED: {
      name: 'TOKEN_UNAUTHORIZED',
      text: '권한이 없는 요청입니다. 로그인 후에 다시 시도 해주세요.',
    },

    message: [
      {
        name: 'REQUEST_FORBIDDEN',
        text: '권한이 없는 요청입니다.',
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
