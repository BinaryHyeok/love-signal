<h1 align="center"> 러브시그널 </h1> <br>
<p align="center">
  <a href="https://gitpoint.co/">
    <img alt="GitPoint" title="GitPoint" src="https://drive.google.com/uc?export=view&id=1cg-8xpGyEph9klCrNqhDRd6ic3dTxnyo" width="450">
  </a>
</p>

<p align="center">
  <strong>SSAFY 자율프로젝트 2023.04.10 ~ 2023.05.16 (6주)</strong>
</p>

## 미리보기

<p align="center">
<img src="https://drive.google.com/uc?export=view&id=1ncA3Xe2n2fIeUTjcvmn_JvdV4swvTF7L" alt="icon" width="160" height="320" />
<img src="https://drive.google.com/uc?export=view&id=11SKjRyd6bntSmUXlTePh7f06mof4_3zh" alt="icon" width="160" height="320" /></p>
<br/>
<br/>

## 프로젝트 기획

현재 많은 소개팅 어플은 1:1 매칭입니다. 여기서 저희는 처음으로 유명한 프로그램인 하트시그널처럼 다대다로 서로 마음에 드는 사람들을 선택해 매칭을 하는 서비스가 있으면 좋겠다 싶었고, 혼자서는 이성과 대화하기를 불편해 하는 사람들, 과팅과 같은 다대다 미팅을 하고싶은 사람들등 다대다 서비스가 더 좋은 사람들이 있을것 같아 이 서비스를 기획해 제작하게 되었습니다.

## 프로젝트 설계

### 와이어프레임

![Wireframe](https://drive.google.com/uc?export=view&id=1QV2OQGmdIiNCQqwD0DZb5vPl6Tsws6tL)
![Wireframe](https://drive.google.com/uc?export=view&id=1DDO_CWQuGifbHJDgXXp0zvHBYLfKu2Ki)

### ERD

![ERD](https://drive.google.com/uc?export=view&id=1JPobwiIluhft2LpnGi9Ryuz1h6gbjHYo)

### API

![API 명세서](https://drive.google.com/uc?export=view&id=1jGJ_SSX3FKFUjskIUecsPU55TGDveKQZ)

## 주요 기능

<img src="https://drive.google.com/uc?export=view&id=1Uf2cO28ZKpFoH55-8zY_CyR2ahcwyRq5" alt="icon" width="160" height="320" />
<img src="https://drive.google.com/uc?export=view&id=10tRWSgXN6D5zIrbBOmSXb7x41XKveF_T" alt="icon" width="160" height="320" />
<img src="https://drive.google.com/uc?export=view&id=1xMXIYc6H_JVOThl-7quyFvF0Mf1wE_ZC" alt="icon" width="160" height="320" />

<img src="https://drive.google.com/uc?export=view&id=1RXYLRDN8EHiVRfZWyxopjM1mvzOUVGUA" alt="icon" width="160" height="320" />
<img src="https://drive.google.com/uc?export=view&id=1stx-pYrmoUoghjxY1zw-QxdvDr-_5-iM" alt="icon" width="160" height="320" />

### 동성 팀 매칭

- 동성팀은 빠른 매칭 및 팀코드로 들어갈 수 있습니다.
- 동성팀 생성시 채팅방에 동성팀 채팅방 생성.

### 이성팀과의 미팅 성사

- 이성팀에게 받은 신청 또는 보낸 신청이 수락될 시 미팅이 성사됩니다.
- 이때 혼성팀 채팅방이 생성되며 우리팀과 상대팀과 채팅이 가능합니다.

### 선택의 시간(1)

- 이성팀과의 미팅 성사시에 일정 시간에 공지채팅방으로 이성팀의 멤버를 지목하는 선택의 시간이 오게됩니다.
- 이때 선택의 시간에서 지목한 사람, 지목받은 사람은 일정시간 살아있는 익명 채팅방을 얻게됩니다.

### 선택의 시간(2)

- 첫번째 선택의 시간이 끝난 후 하는 선택의 시간이고, 이때 선택의 시간에서 서로를 지목한 사람들만 기간이 정해져있지 않은 무기한 채팅방을 얻게 됩니다.

## 기능 차별점

### PWA(Progressive Web App)환경 구축

- 서비스 워커를 통해 앱의 기능을 오프라인에서도 사용 가능
- 서비스 워커와 캐싱을 사용하여 로딩시간 단축 및 전반적인 성능 향상
- 플랫폼에 종속되지 않고 Android / IOS 및 웹 브라우저 등 다양한 환경에서 동일하게 작동

### Spring Cloud를 활용한 MSA 구축

- Spring Cloud Config 서버 활용
  - 여러 마이크로서비스에서 사용되는 설정파일을 중앙 집중적 관리
  - 설정파일의 데이터 변경을 동적으로 갱신
  - 설정 파일의 암호화
- 각각의 마이크로서비스가 독립적으로 실행된다는 특성을 활용한 장애 격리
- 각각의 마이크로서비스에 대하여 독립적인 CI/CD를 구축

### SonarQube를 활용한 정적 코드분석

- 정적 코드 분석을 통한 코드 품질 개선
- 유지보수 및 확장에 용이한 코드베이스 유지

### Firebase Cloud Messaging을 이용한 푸시 알림

- 대상을 세분화하여 토큰을 활용한 푸시 알림 대상 지정
- PWA 환경에서의 오프라인 푸시 알림 제공

## 개발환경

<div style="display: flex; align-items: flex-start;"></div>

<div style="display: flex; align-items: center;">
  <span style="font-size: 32px;"><strong>FrontEnd&nbsp;</strong></span>
  <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="30" height="30" style="display: inline;" />
  <img src="https://techstack-generator.vercel.app/ts-icon.svg" alt="icon" width="30" height="30" style="display: inline;" />
  <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="30" height="30" style="display: inline;"" />
  <img src="https://techstack-generator.vercel.app/sass-icon.svg" alt="icon" width="30" height="30" style="display: inline;" />
</div>

- Node.js 16.4.0
- React.js 18.2.0
- TypeScript 4.9.5
- Recoil 0.7.7
- Stomp.js 7.0.0
- Sock.js 1.6.1
- Three.js 0.152.2
- Axios 1.3.6

<div style="display: flex; align-items: center;">
  <span style="font-size: 32px;"><strong>BackEnd&nbsp;</strong></span>
  <img src="https://techstack-generator.vercel.app/restapi-icon.svg" alt="icon" width="45" height="45" />
</div>

- Java 17 (openjdk:17)
- Spring Boot 2.7.11
- Gradle 7.6.1
- Spring Cloud 2021.0.6
- Spring Security
- JPA
- Hibernate

<div style="display: flex; align-items: center;">
  <span style="font-size: 32px;"><strong>Database&nbsp;</strong></span>
  <img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="45" height="45" />
</div>

- MySQL 8.0.33
- Redis 7.0.11
- PostgreSQL 15.2

<div style="display: flex; align-items: center;">
  <span style="font-size: 32px;"><strong>Infra&nbsp;</strong></span>
  <img src="https://techstack-generator.vercel.app/aws-icon.svg" alt="icon" width="30" height="30" /><img src="https://techstack-generator.vercel.app/nginx-icon.svg" alt="icon" width="30" height="30" /><img src="https://techstack-generator.vercel.app/docker-icon.svg" alt="icon" width="30" height="30" />
</div>

- AWS EC2 (Ubuntu 20.04 LTS)
- AWS S3 Bucket
- Nginx 1.18.0
- Jenkins 2.402
- Docker 23.0.6
- Docker Compose 2.17.3
- SonarQube 10.0.0.68432

<div style="display: flex; align-items: center;">
  <span style="font-size: 32px;"><strong>Colaboration &nbsp;</strong></span>
 <img src="https://techstack-generator.vercel.app/github-icon.svg" alt="icon" width="30" height="30" />
</div>

- Gitlab
- Jira
- Notion
- MatterMost

<div style="display: flex; align-items: center;">
  <span style="font-size: 32px;"><strong>External tools&nbsp;</strong></span>
</div>

- Kakao Login API
- Firebase Cloud Messaging

## 아키텍처

![Architecture](https://drive.google.com/uc?export=view&id=1ti5GaHwwF7igG-2X8By06JJ5jzwrUhnl)

<br/>
<br/>
<br/>

## 팀원

<img src="https://drive.google.com/uc?export=view&id=1ricWs8Rra3xcrWpPfmz-rYb6cgUdWEx2" alt="icon" width="480" height="360" />

|              FrontEnd               |                FrontEnd                 |               FrontEnd               |                BackEnd                |                 BackEnd                  |                Infra                 |
| :---------------------------------: | :-------------------------------------: | :----------------------------------: | :-----------------------------------: | :--------------------------------------: | :----------------------------------: |
| [김이슬](https://github.com/2sseul) | [손종효](https://github.com/sonjonghyo) | [이정현](https://github.com/PakaOxO) | [유도열](https://github.com/doyeolKR) | [이진혁](https://github.com/BinaryHyeok) | [권오영](https://github.com/kwnoyng) |

😀 클릭 시 깃허브로 이동합니다.
