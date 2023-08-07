export default {
  // @Size
  USERNAME_LENGTH_INVALID: {
    name: 'USERNAME_LENGTH_INVALID',
    text: '아이디는 5~15자만 가능합니다.',
  },
  PASSWORD_LENGTH_INVALID: {
    name: 'PASSWORD_LENGTH_INVALID',
    text: '비밀번호는 8~30자만 가능합니다.',
  },
  LEGALNAME_LENGTH_INVALID: {
    name: 'LEGALNAME_LENGTH_INVALID',
    text: '실명은 2~5자만 가능합니다.',
  },
  NICKNAME_LENGTH_INVALID: {
    name: 'NICKNAME_LENGTH_INVALID',
    text: '닉네임은 2~8자만 가능합니다.',
  },
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
  URL_LENGTH_INVALID: { name: 'URL_LENGTH_INVALID', text: 'URL은 1~1000자만 가능합니다' },
  SKILLNAME_LENGTH_INVALID: {
    name: 'SKILLNAME_LENGTH_INVALID',
    text: '기술명은 1~20자만 가능합니다.',
  },

  // @Email @Pattern
  EMAIL_FORMAT_INVALID: { name: 'EMAIL_FORMAT_INVALID', text: '올바른 이메일 형식이 아닙니다.' },
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
  VERIFICATIONCODE_INVALID: { name: 'VERIFICATIONCODE_INVALID', text: '인증번호가 틀렸습니다.' },
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
};
