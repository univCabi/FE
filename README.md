
# UnivCabi
<p align="center">
  <img width="500" alt="image" src="https://github.com/user-attachments/assets/2734e40d-6ada-4aec-982d-9ed8a27dfc46" />
</p>

## 목차
- [📝 프로젝트 소개](#introduction)
- [🛠️ 기술 스택](#tech)
- [🌟 주요 기능](#function)
- [🧑🏻‍💻 프로젝트 멤버](#member)

## <span id="introduction">📝 프로젝트 소개</span>
- **프로젝트 기간** : 2024.09 ~ 2025.04
- **목적**
  - 기존 부경대학교 내 사물함은 각 학과에서 SNS를 통해 선착순으로 대여하고, 이를 수기로 관리하고 있습니다. 
  - 이러한 수기 관리의 불편함을 해소하고자 사물함을 전산화하고, 학생들의 사물함 대여와 반납의 편의성을 위해 사물함 대여 서비스를 개발하였습니다.

- **기대 효과**
  - 학과 : 사물함 대여 현황 및 상태를 손쉽게 관리할 수 있어 효율성이 증대됩니다.
  - 학생 : 현재 대여 가능한 사물함 목록을 한 눈에 볼 수 있으며, 클릭 한 번으로 편리하게 사물함 대여 및 반납이 가능합니다.

## <span id="tech">🛠️ 기술 스택</span>
<table>
  <thead>
    <tr>
      <th>분류</th>
      <th>기술 스택</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>프론트엔드</td>
      <td>
        <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white"/>
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/>
        <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/>
        <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white"/>
        <img src="https://img.shields.io/badge/redux-764ABC?style=flat&logo=redux&logoColor=white">
      </td>
    </tr>
    <tr>
      <td>백엔드</td>
      <td>
        <img src="https://img.shields.io/badge/django-092E20?style=flat&logo=django&logoColor=white">
        <img src="https://img.shields.io/badge/spring-6DB33F?style=flat&logo=spring&logoColor=white">
        <img src="https://img.shields.io/badge/python-3776AB?style=flat&logo=python&logoColor=white"> 
      </td>
    </tr>
    <tr>
      <td>데이터베이스</td>
      <td>
        <img src="https://img.shields.io/badge/sqlite3-003B57?style=flat&logo=sqlite&logoColor=white">
      </td>
    </tr>
    <tr>
      <td>인프라</td>
      <td>
         <img src="https://img.shields.io/badge/docker-2496ED?style=flat&logo=docker&logoColor=white">
        <img src="https://img.shields.io/badge/netlify-00C7B7?style=flat&logo=netlify&logoColor=white">
      </td>
    </tr>
  </tbody>
</table>

## <span id="function">🌟 주요 기능</span>
### 유저 페이지
- **로그인**
  
  ![2025-05-0614 45 05-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/c95572b4-4ab2-4c92-8633-4c2a4485ce70)

  
- **메인 페이지**
  - **사물함 대여, 반납 기능** : 이용하고자 하는 사물함을 선택하여, 대여 또는 반납을 할 수 있습니다.
 ![2025-05-0418 53 42-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/8ff13d5c-f254-4bda-8f1e-36f9da229779)

  - **사물함 즐겨찾기 기능** : 본인이 원하는 사물함을 즐겨찾기에 추가할 수 있습니다.
![2025-05-0616 11 31-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/b5a825e4-bf8f-49cc-985e-776e622f12bf)

  
- **사용 가능한 사물함 대여 페이지**
  - **사용 가능한 사물함을 선착순으로 대여하는 기능** : 매일 오후 1시에 본인이 사용 가능한 사물함의 잠금이 해제됩니다.
  
- **검색 페이지**
  - **사물함 검색 기능** : 찾고자 하는 사물함의 번호를 입력하면, 해당 번호가 있는 건물과 층에 대한 결과가 나타납니다.
  ![2025-05-1515 47 57-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/596a8ced-e38e-4245-8712-ddfe04c960b8)

- **프로필 페이지**
  - **프로필 기능** : 본인의 기본 정보와 대여 정보를 확인할 수 있고, 이름 공개 여부를 선택할 수 있습니다.
![2025-05-1515 51 05-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/4aee89d7-fe82-4e0b-bdd7-58eec76ce06b)

- **히스토리 페이지**
  - **사물함 대여, 반납에 대한 히스토리 기능** : 본인이 대여, 반납한 사물함의 히스토리를 확인할 수 있습니다.
  - **히스토리 선택 시 해당 사물함 정보로 이동 기능** : 각 히스토리를 선택하면, 해당 사물함의 위치로 이동할 수 있습니다.
![화면 기록 2025-05-04 20 13 08 (2)](https://github.com/user-attachments/assets/7eb30c39-f144-44e9-b6b5-f7e366647ed2)


### 관리자 페이지
- **통계**
  - **건물별 사물함 사용 현황** : 건물별로 현재 사물함의 상태를 그래프로 한 눈에 파악할 수 있습니다.
  - **연체, 고장 사물함 리스트** : 현재 연체중이거나 고장인 사물함의 리스트를 확인할 수 있고, 각 항목을 선택하면 해당 사물함의 위치로 이동합니다.
![2025-05-0616 24 47-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/451f2188-caba-4e06-844e-2b4ce9de4247)


- **사물함 상태 관리 (사용 가능, 사용 불가, 반납, 대여 처리)** : 각 사물함의 상태를 관리할 수 있습니다. '복수 선택 기능'을 사용하면 한 번에 여러 사물함의 상태를 변경(사용 가능, 사용 불가)할 수 있습니다.

  ![2025-05-1515 57 03-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/cde2c0d5-f460-4b56-a58b-500b2d4cecd7)

## <span id="member">🧑🏻‍💻 프로젝트 멤버</span>

| 이름 | 역할 |
| :---------: | :------------------- |
| [민영재](https://github.com/yeomin4242) | 팀장, BE, PM |
| [민웅기](https://github.com/minwoonggi) | FE, BE |
| [김주희](https://github.com/joooii) | FE |
