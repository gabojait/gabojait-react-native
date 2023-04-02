import ProfileViewDto from "./model/Profile/ProfileViewDto"

export const testTeamArray = [
    {
      teamId: "64119484e16b5970ec20921d",
      leaderUserId: "6411855fe16b5970ec20920b",
      projectName: "21시 게시물",
      projectDescription: "개인도 쉽게 크라우드 펀딩을 운영할 수 있게 하는 앱",
      designerTotalRecruitCnt: 2,
      backendTotalRecruitCnt: 1,
      frontendTotalRecruitCnt: 1,
      projectManagerTotalRecruitCnt: 1,
      openChatUrl: "https://open.kakao.com/o/test",
      expectation: "수익성도 바라보고 있으니 오래 컨택할 수 있는 사람",
      designers: [
        {
          userId: "6411855fe16b5970ec20920b",
          nickname: "테스트4",
          position: "DESIGNER",
          reviewCnt: 0,
          rating: 0,
          schemaVersion: "1.0"
        }
      ],
      backends: [],
      frontends: [],
      projectManagers: []
    },
    {
        teamId: "64119484e16b5970ec20921d",
        leaderUserId: "6411855fe16b5970ec20920b",
        projectName: "20시 게시물",
        projectDescription: "개인도 쉽게 크라우드 펀딩을 운영할 수 있게 하는 앱",
        designerTotalRecruitCnt: 2,
        backendTotalRecruitCnt: 1,
        frontendTotalRecruitCnt: 1,
        projectManagerTotalRecruitCnt: 1,
        openChatUrl: "https://open.kakao.com/o/test",
        expectation: "수익성도 바라보고 있으니 오래 컨택할 수 있는 사람",
        designers: [
          {
            userId: "6411855fe16b5970ec20920b",
            nickname: "테스트4",
            position: "DESIGNER",
            reviewCnt: 0,
            rating: 0,
            schemaVersion: "1.0"
          }
        ],
        backends: [],
        frontends: [],
        projectManagers: []
      },
      {
        teamId: "64119484e16b5970ec20921d",
        leaderUserId: "6411855fe16b5970ec20920b",
        projectName: "19시 게시물",
        projectDescription: "개인도 쉽게 크라우드 펀딩을 운영할 수 있게 하는 앱",
        designerTotalRecruitCnt: 2,
        backendTotalRecruitCnt: 1,
        frontendTotalRecruitCnt: 1,
        projectManagerTotalRecruitCnt: 1,
        openChatUrl: "https://open.kakao.com/o/test",
        expectation: "수익성도 바라보고 있으니 오래 컨택할 수 있는 사람",
        designers: [
          {
            userId: "6411855fe16b5970ec20920b",
            nickname: "테스트4",
            position: "DESIGNER",
            reviewCnt: 0,
            rating: 0,
            schemaVersion: "1.0"
          }
        ],
        backends: [],
        frontends: [],
        projectManagers: []
      },
      {
        teamId: "64119484e16b5970ec20921d",
        leaderUserId: "6411855fe16b5970ec20920b",
        projectName: "18시 게시물",
        projectDescription: "개인도 쉽게 크라우드 펀딩을 운영할 수 있게 하는 앱",
        designerTotalRecruitCnt: 2,
        backendTotalRecruitCnt: 1,
        frontendTotalRecruitCnt: 1,
        projectManagerTotalRecruitCnt: 1,
        openChatUrl: "https://open.kakao.com/o/test",
        expectation: "수익성도 바라보고 있으니 오래 컨택할 수 있는 사람",
        designers: [
          {
            userId: "6411855fe16b5970ec20920b",
            nickname: "테스트4",
            position: "DESIGNER",
            reviewCnt: 0,
            rating: 0,
            schemaVersion: "1.0"
          }
        ],
        backends: [],
        frontends: [],
        projectManagers: []
      },
      {
        teamId: "64119484e16b5970ec20921d",
        leaderUserId: "6411855fe16b5970ec20920b",
        projectName: "17시 게시물",
        projectDescription: "개인도 쉽게 크라우드 펀딩을 운영할 수 있게 하는 앱",
        designerTotalRecruitCnt: 2,
        backendTotalRecruitCnt: 1,
        frontendTotalRecruitCnt: 1,
        projectManagerTotalRecruitCnt: 1,
        openChatUrl: "https://open.kakao.com/o/test",
        expectation: "수익성도 바라보고 있으니 오래 컨택할 수 있는 사람",
        designers: [
          {
            userId: "6411855fe16b5970ec20920b",
            nickname: "테스트4",
            position: "DESIGNER",
            reviewCnt: 0,
            rating: 0,
            schemaVersion: "1.0"
          }
        ],
        backends: [],
        frontends: [],
        projectManagers: []
      }
  ]

  export const testProfileData:ProfileViewDto = {
    completedTeams: [],
    currentTeamId: "641d733787c7a0060e9001cc", 
    description: "", 
    educations: [{
      educationId: "641d733787c7a0060e9001c8", 
      endedDate: "2021-12-20", 
      institutionName: "학교명", 
      isCurrent: false, 
      schemaVersion: "1.0", 
      startedDate: "2020-03-01"
    }], 
    imageUrl: "",
    isPublic: false,
    nickname: "테스트1", 
    portfolios: [
    ], 
    position: "PM", 
    rating: 0, 
    reviews: [
      {
        nickname: '이용인',
        rating: 4.5,
        content:
          '후면 카메라는 센서 시프트 OIS가 적용된 F/1.5 1,200만 화소 센서의 광각 카메라, F/2.4 1,200만 화소 초광각 카메라로 듀얼 렌즈를 이룬다. 광각 카메라는 기술을 활용한 위상차 검출 AF를 지원하며 망원 카메라도 위상차 검출 AF를 지원한다. 전면 카메라는 F/1.9 1,200만 화소의 TrueDepth 카메라로 탑재하고 별도로 TrueDepth 카메라를 포함해서 하드웨어 및 소프트웨어 시스템을 통해서 인식하는 방식의 얼굴인식 기술이 탑재되어 있으며 전면 상단에 위치한 TrueDepth 카메라 시스템을 이용하여 사용자의 얼굴을 스캔한다.',
        addedAt:''
        },
      {
        nickname: '안검성',
        rating: 4.5,
        content:
          '후면 카메라는 센서 시프트 OIS가 적용된 F/1.5 1,200만 화소 센서의 광각 카메라, F/2.4 1,200만 화소 초광각 카메라로 듀얼 렌즈를 이룬다. 광각 카메라는 기술을 활용한 위상차 검출 AF를 지원하며 망원 카메라도 위상차 검출 AF를 지원한다. 전면 카메라는 F/1.9 1,200만 화소의 TrueDepth 카메라로 탑재하고 별도로 TrueDepth 카메라를 포함해서 하드웨어 및 소프트웨어 시스템을 통해서 인식하는 방식의 얼굴인식 기술이 탑재되어 있으며 전면 상단에 위치한 TrueDepth 카메라 시스템을 이용하여 사용자의 얼굴을 스캔한다.',
        addedAt:''
        },
      {
        nickname: '박소현',
        rating: 4.5,
        content:
          '후면 카메라는 센서 시프트 OIS가 적용된 F/1.5 1,200만 화소 센서의 광각 카메라, F/2.4 1,200만 화소 초광각 카메라로 듀얼 렌즈를 이룬다. 광각 카메라는 기술을 활용한 위상차 검출 AF를 지원하며 망원 카메라도 위상차 검출 AF를 지원한다. 전면 카메라는 F/1.9 1,200만 화소의 TrueDepth 카메라로 탑재하고 별도로 TrueDepth 카메라를 포함해서 하드웨어 및 소프트웨어 시스템을 통해서 인식하는 방식의 얼굴인식 기술이 탑재되어 있으며 전면 상단에 위치한 TrueDepth 카메라 시스템을 이용하여 사용자의 얼굴을 스캔한다.',
        addedAt:''
      },
      {
        nickname: '최경민',
        rating: 4.5,
        content:
          '후면 카메라는 센서 시프트 OIS가 적용된 F/1.5 1,200만 화소 센서의 광각 카메라, F/2.4 1,200만 화소 초광각 카메라로 듀얼 렌즈를 이룬다. 광각 카메라는 기술을 활용한 위상차 검출 AF를 지원하며 망원 카메라도 위상차 검출 AF를 지원한다. 전면 카메라는 F/1.9 1,200만 화소의 TrueDepth 카메라로 탑재하고 별도로 TrueDepth 카메라를 포함해서 하드웨어 및 소프트웨어 시스템을 통해서 인식하는 방식의 얼굴인식 기술이 탑재되어 있으며 전면 상단에 위치한 TrueDepth 카메라 시스템을 이용하여 사용자의 얼굴을 스캔한다.',
        addedAt:''
      },
      {
        nickname: '이용인',
        rating: 4.5,
        content:
          '후면 카메라는 센서 시프트 OIS가 적용된 F/1.5 1,200만 화소 센서의 광각 카메라, F/2.4 1,200만 화소 초광각 카메라로 듀얼 렌즈를 이룬다. 광각 카메라는 기술을 활용한 위상차 검출 AF를 지원하며 망원 카메라도 위상차 검출 AF를 지원한다. 전면 카메라는 F/1.9 1,200만 화소의 TrueDepth 카메라로 탑재하고 별도로 TrueDepth 카메라를 포함해서 하드웨어 및 소프트웨어 시스템을 통해서 인식하는 방식의 얼굴인식 기술이 탑재되어 있으며 전면 상단에 위치한 TrueDepth 카메라 시스템을 이용하여 사용자의 얼굴을 스캔한다.',
        addedAt:''
      },
    ], 
    schemaVersion: "1.0", 
    skills: [{"isExperienced": true, "level": "LOW", "schemaVersion": "1.0", "skillId": "641d733787c7a0060e9001c7", "skillName": "기술명"}], 
    teamMemberStatus: "LEADER", 
    userId: "641d733687c7a0060e9001b4", 
    works: [{
    corporationName: "기관명", 
    description: "설명", 
    endedDate: "2021-12-20", 
    isCurrent: false, 
    schemaVersion: "1.0", 
    startedDate: "2020-03-01", 
    workId: "641d733787c7a0060e9001c9"
    }]
  }