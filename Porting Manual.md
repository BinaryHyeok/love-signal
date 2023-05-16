# Love Signal

Love Signal 프로젝트는 Docker, Docker Compose, 그리고 Jenkins Pipeline을 활용한 CI/CD 자동화 환경을 구성하고 있습니다.

Gitlab의 Webhook 설정으로 인해 Push 또는 Merge 이벤트 발생 시, Jenkins Pipeline을 통해 자동 빌드와 배포가 이루어집니다.

프론트엔드 부분은 Dockerfile을 실행하여 npm 환경에서 빌드하고, Node 이미지를 생성하여 컨테이너로 실행하고 배포하는 방식을 사용합니다.

백엔드는 Gradle을 사용하여 빌드하며, MSA 환경을 구축하여 Docker Compose를 통해 모든 컨테이너를 관리하고 배포합니다.

또한, 모든 부분에서 SonarQube Analysis로 자동 정적 분석을 진행하며, 빌드와 배포의 성공 혹은 실패 여부는 MatterMost Notification을 통해 알 수 있습니다.

## Nginx Port forwarding

| Port   | Content             |
| ------ | ------------------- |
| 22     | SSH                 |
| 80     | HTTP                |
| 443    | HTTPS               |
| 3306   | MySQL               |
| 5432   | PostgreSQL          |
| 6379   | Redis               |
| 8000   | API Gateway         |
| 8080   | Jenkins             |
| 8761   | Eureka Server       |
| 8888   | Spring Cloud Config |
| 9000   | Sonarqube           |
| 9999   | Auth Service        |
| RANDOM | Member Service      |
| RANDOM | Team Service        |
| RANDOM | Chatting Service    |
| RANDOM | File Service        |
| RANDOM | FCM Service         |

## Docker And Docker Compose Install

https://docs.docker.com/engine/install/ubuntu/

## Nginx Install

```sh
# Nginx 설치
$ sudo apt update
$ sudo apt install nginx

# Nginx 시작
$ sudo service nginx start
```

## SSL/TSL Install / Apply

```sh
# certbot 설치
$ sudo apt update
$ sudo apt install certbot python3-certbot-nginx

# SSL 인증서 발급 및 Nginx 적용
$ sudo certbot --nginx -d k8b309.p.ssafy.io -d www.love-signal.kr
```

## Nginx Config

```sh
# HTTP를 HTTPS로 Redirect
server {
        listen 80;
        server_name k8b309.p.ssafy.io www.love-signal.kr;
        return 301 https://$host$request_uri;
}

# HTTPS 접속
server {

        listen 443 ssl;
        server_name www.love-signal.kr;

        # SSL인증
        ssl_certificate /etc/letsencrypt/live/k8b309.p.ssafy.io/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/k8b309.p.ssafy.io/privkey.pem;

        # https://{도메인} : 홈페이지
        location / {
                root /var/www/app;
                index index.html;
                try_files $uri $uri/ /index.html;
        }

        # https://{도메인}/jenkins : Jenkins 페이지
        location /jenkins {
                proxy_pass              http://k8b309.p.ssafy.io:8080;
                proxy_set_header        Host $host:$server_port;
                proxy_set_header        X-Real-IP $remote_addr;
                proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header        X-Forwarded-Proto $scheme;
                proxy_read_timeout      90;
                proxy_redirect          http://k8b309.p.ssafy.io:8080 https://$host/jenkins;
        }

        # https://{도메인}/auth : auth-service
        location /auth {
                proxy_pass http://k8b309.p.ssafy.io:9999;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }

         # https://{도메인}/api : API Gateway
         # CORS 설정
        location /api {

                if ($request_method = 'OPTIONS') {
                        add_header 'Access-Control-Allow-Origin' '*';
                        add_header 'Access-Control-Allow-Methods' 'GET, POST, DELETE, PUT, OPTIONS';
                        add_header 'Access-Control-Allow-Headers' 'Access-Control-Allow-Credentials, Access-Control-Allow-Origin, Content-Type, X-Auth_Token, X-Auth_ID';
                        add_header 'Access-Control-Max-Age' 86400;
                        return 204;
                }
                proxy_pass http://k8b309.p.ssafy.io:8000;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;

        }

        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
```

## Environment Variables

### Frontend

```sh
# .env
REACT_APP_ASSETS_DIR=/assets
REACT_APP_API_AUTH=https://k8b309.p.ssafy.io
REACT_APP_API=https://k8b309.p.ssafy.io/api

# PWA PUSH FCM
REACT_APP_PUSH_VAPID=AIzaSyCN9e2KjmzUMXa_A7GcS3D51xbSOHPHfWk
REACT_APP_PUSH_DOMAIN=love-signal-a91bc.firebaseapp.com
REACT_APP_PUSH_PROJECT_ID=love-signal-a91bc
REACT_APP_PUSH_PROCESS_BUCKET=love-signal-a91bc.appspot.com
REACT_APP_PUSH_SENDER_ID=719224189451
REACT_APP_PUSH_APP_ID=1:719224189451:web:22868b6e8ecab60effcd0e
REACT_APP_PUSH_MEASUREMENT=G-SC755QEGW3

REACT_APP_PUSH_APP_KEY=BPTeQxfUDeHB0uAcayjDbFtXT8We2xPo1olzkVwMYpvlKgubpMRHB_ZF0hGuJSOoeYE7kPc3tkf_ibejUcy3PUk

HTTPS=true
```

### Backend

```sh
# Github Repository

# mysql-config.yml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://13.125.99.25:3306/love?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Seoul&zeroDateTimeBehavior=convertToNull&rewriteBatchedStatements=true
    username: lovesignal
    password: lovesignal

# redis-config.yml
spring:
  cache:
    type: redis
  redis:
    host: 13.125.99.25
    port: 6379
    password: lovesignal

# s3-config.yml
cloud:
  aws:
    credentials:
      accessKey: AKIA4VGHNPMWWMP3DJPX
      secretKey: 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
    s3:
      bucket: love-signal
      profile-path: profile/
      chatfile-path: chatfile/
    region:
      static: ap-northeast-2
    stack:
      auto: false

# 기타 Backend 설정파일은 각 서비스의 application-prod.yml파일에 존재
```

## Docker : Dockerfile

### Jenkins

```sh
docker run -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e JENKINS_OPTS="--prefix=/jenkins" \
  -e TZ=Asia/Seoul \
  --name jenkins \
  jenkins/jenkins:latest


# 1. p 8080:8080: Jenkins 웹 인터페이스에 접근할 수 있도록 호스트의 8080 포트를 컨테이너의 8080 포트에 바인딩
# 2. p 50000:50000: Jenkins 슬레이브 노드와 통신할 수 있도록 호스트의 50000 포트를 컨테이너의 50000 포트에 바인딩
# 3. v jenkins_home:/var/jenkins_home: Jenkins 데이터를 호스트에 보존하기 위해 명명된 볼륨 jenkins_home을 컨테이너의 /var/jenkins_home에 마운트
# 4. v /var/run/docker.sock:/var/run/docker.sock: Jenkins가 호스트의 Docker 데몬을 사용할 수 있도록 Docker 소켓을 마운트
# 5. e JENKINS_OPTS="--prefix=/jenkins": Jenkins 웹 인터페이스의 URL 접두사를 /jenkins로 설정
# 6. e TZ=Asia/Seoul: Jenkins 컨테이너의 시간대를 Asia/Seoul로 설정
# 7. -name jenkins: 컨테이너의 이름을 "jenkins"로 설정
#8. jenkins/jenkins:latest: 사용할 Docker 이미지를 지정, Jenkins의 최신 버전을 사용
```

### Frontend

```Sh
FROM node:16.4 AS build

WORKDIR /app

COPY package*.json /app

RUN ["npm", "install"]

COPY . /app

RUN ["npm", "run", "build"]
```

### Backend

```sh
FROM openjdk:17

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "/app.jar"]
```

## Docker Compose : docker-compose.yml

### Frontend

```sh
version: "3"

services:
  frontend:
    build:
      context: ./love-signal-pwa
      dockerfile: Dockerfile
    volumes:
      - build:/app/build
    command: "npm run start"
    working_dir: /app

volumes:
  build:

```

### Backend

```sh
version: "3"

services:

  # Eureka Server
  discoveryservice:
    image: discoveryservice:latest
    container_name: discoveryservice
    build:
      context: ./cloud/discoveryservice
      dockerfile: Dockerfile
    environment:
      - TZ=Asia/Seoul
    ports:
      - "8761:8761"
    restart: always
    networks:
      - backend

  # API Gateway
  apigateway:
    image: apigateway:latest
    container_name: apigateway
    build:
      context: ./cloud/apigateway
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - TZ=Asia/Seoul
    depends_on:
      - discoveryservice
    restart: always
    networks:
      - backend

  # Spring Cloud Config
  config:
    image: config:latest
    container_name: config
    build:
      context: ./cloud/config
      dockerfile: Dockerfile
    ports:
      - "8888:8888"
    environment:
      - TZ=Asia/Seoul
    depends_on:
      - discoveryservice
    restart: always
    networks:
      - backend

  # Microservices
  member-service:
    image: member-service:latest
    container_name: member-service
    build:
      context: ./member-service
      dockerfile: Dockerfile
    environment:
      - TZ=Asia/Seoul
    restart: always
    networks:
      - backend

  team-service:
    image: team-service:latest
    container_name: team-service
    build:
      context: ./team-service
      dockerfile: Dockerfile
    environment:
      - TZ=Asia/Seoul
    restart: always
    networks:
      - backend

  chatting-service:
    image: chatting-service:latest
    container_name: chatting-service
    build:
      context: ./chatting-service
      dockerfile: Dockerfile
    environment:
      - TZ=Asia/Seoul
    restart: always
    networks:
      - backend

  file-service:
    image: file-service:latest
    container_name: file-service
    build:
      context: ./file-service
      dockerfile: Dockerfile
    environment:
      - TZ=Asia/Seoul
    restart: always
    networks:
      - backend

  auth-service:
    image: auth-service:latest
    container_name: auth-service
    build:
      context: ./auth-service
      dockerfile: Dockerfile
    environment:
      - TZ=Asia/Seoul
    ports:
      - "9999:9999"
    restart: always
    networks:
      - backend

  fcm-service:
    image: fcm-service:latest
    container_name: fcm-service
    build:
      context: ./fcm-service
      dockerfile: Dockerfile
    environment:
      - TZ=Asia/Seoul
    restart: always
    networks:
      - backend

  # SonarQube & PostgreSQL
  sonarqube:
    image: sonarqube:latest
    container_name: sonarqube
    environment:
      - SONARQUBE_JDBC_URL=jdbc:postgresql://postgres:5432/sonar
      - SONARQUBE_JDBC_USERNAME=sonar
      - SONARQUBE_JDBC_PASSWORD=sonar
      - TZ=Asia/Seoul
    ports:
      - "9000:9000"
    depends_on:
      - postgres
    restart: always
    volumes:
      - sonarqube_data:/opt/sonarqube/data
      - sonarqube_extensions:/opt/sonarqube/extensions
      - sonarqube_logs:/opt/sonarqube/logs
    networks:
      - sonarnet

  postgres:
    image: postgres:latest
    container_name: postgres
    environment:
      - POSTGRES_USER=sonar
      - POSTGRES_PASSWORD=sonar
      - POSTGRES_DB=sonar
      - TZ=Asia/Seoul
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - sonarnet

volumes:
  mysql-data:
    name: mysql-data
  redis-data:
    name: redis-data
  sonarqube_data:
    name: sonarqube_data
  sonarqube_extensions:
    name: sonarqube_extensions
  sonarqube_logs:
    name: sonarqube_logs
  postgres_data:
    name: postgres_data

networks:
  backend:
    external:
      name: backend
  sonarnet:
    external:
      name: sonarnet

```

## Jenkins

### Jenkins Job

![젠킨스 Job](https://ifh.cc/g/PhDjT4.png)

### Jenkins file

#### Frontend

```sh
pipeline {
    agent any

    stages {

        # SonarQube Analysis
        stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv('SonarQube Server') {
                    dir('frontend/love-signal-pwa') {
                        sh 'sonar-scanner'
                    }
                }
            }
        }

        # 전체 프로젝트 원격서버로 복사
        stage('Copy files') {
            steps {
                sshagent([credentials: ['SSH_CREDENTIAL']]) {
                    sh """
                        ssh ubuntu@k8b309.p.ssafy.io "
                            rm -rf /home/ubuntu/fe_develop
                        "
                        scp -r ${WORKSPACE} ubuntu@k8b309.p.ssafy.io:/home/ubuntu
                    """
                }
            }
        }

        # Docker & Docker Compose를 활용한 빌드 및 배포
        stage('Build') {
            steps {
                sshagent([credentials: ['SSH_CREDENTIAL']]) {
                    sh """
                        ssh ubuntu@k8b309.p.ssafy.io "
                            cd /home/ubuntu/fe_develop/frontend
                            docker compose -f docker-compose.yml down
                            sudo docker volume rm frontend_build
                            sudo docker volume create frontend_build
                            docker compose -f docker-compose.yml build
                            docker compose -f docker-compose.yml up -d
                        "
                    """
                }
            }
        }

        # 빌드파일 경로 설정 및 Nginx 재시작
        stage('Deploy') {
            steps {
                sshagent([credentials: ['SSH_CREDENTIAL']]) {
                    sh '''
                        ssh ubuntu@k8b309.p.ssafy.io "
                            sudo rm -rf /var/www/app
                            sudo mkdir /var/www/app
                            sudo cp -r /var/lib/docker/volumes/frontend_build/_data/. /var/www/app/
                            sudo service nginx restart
                        "
                    '''
                }
            }
        }
    }

    # MatterMost Notification
    post {
        success {
            mattermostSend(
                color: 'good',
                message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})",
                channel: 'jenkins-bot',
                endpoint: 'https://meeting.ssafy.com/hooks/pzxo89wfpt8c9pzqnymyes9gwc'
            )
        }
        failure {
            mattermostSend(
                color: 'danger',
                message: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})",
                channel: 'jenkins-bot',
                endpoint: 'https://meeting.ssafy.com/hooks/pzxo89wfpt8c9pzqnymyes9gwc'
            )
        }
    }
}
```

### Backend

```sh
pipeline {
    agent any

    tools {
        jdk 'JDK 17'
    }

    stages {
        # 마이크로서비스 빌드
        stage('member-service Build') {
            steps {
                script {
                    dir('MemberService') {
                        sh 'chmod +x ./gradlew'
                        sh './gradlew clean build -x test -Pprod'
                    }
                }
            }
        }

        # 빌드된 JAR files 원격 서버로 복사
        stage('Copy new JAR file') {
            steps {
                sshagent([credentials: ['SSH_CREDENTIAL']]) {
                    sh """
                        scp MemberService/build/libs/*.jar ubuntu@k8b309.p.ssafy.io:/home/ubuntu/be_develop/member-service/build/libs
                    """
                }
            }
        }

        # SonarQube Analysis
        stage('SonarQube Analysis') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    withSonarQubeEnv('SonarQube Server') {
                        script {
                            dir('MemberService') {
                                sh './gradlew -d sonar'
                            }
                        }
                    }
                }
            }
        }

        # Docker & Docker Compose를 활용한 배포
        stage('Deploy') {
            steps {
                sshagent([credentials: ['SSH_CREDENTIAL']]) {
                    sh """
                        ssh ubuntu@k8b309.p.ssafy.io "
                            cd /home/ubuntu/be_develop
                            docker compose -f docker-compose.yml stop member-service
                            docker compose -f docker-compose.yml rm -f member-service
                            docker compose -f docker-compose.yml build member-service
                            docker compose -f docker-compose.yml up -d member-service
                        "
                    """
                }
            }
        }
    }

    # MatterMost Notification
    post {
        success {
            script{
            Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
            Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
            mattermostSend(
                color: "#00f514",
                icon: "https://jenkins.io/images/logos/jenkins/jenkins.png",
                message: "Build SUCCESS : ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)",
                channel: "jenkins-bot",
                endpoint: 'https://meeting.ssafy.com/hooks/pzxo89wfpt8c9pzqnymyes9gwc')
            }
        }
        failure  {
            script{
            Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
            Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
            mattermostSend(
                color: "#e00707",
                icon: "https://jenkins.io/images/logos/jenkins/jenkins.png",
                message: "Build FAILED : ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)",
                channel: "jenkins-bot",
                endpoint: 'https://meeting.ssafy.com/hooks/pzxo89wfpt8c9pzqnymyes9gwc')
            }
        }
    }
}
```

## SonarQube

Frontend 프로젝트 (1)
Backend Microservices 프로젝트 (6)
총 7개의 SonarQube 프로젝트 생성 및 정적 코드분석 완료

### Member Service 코드 분석 예시

![image](https://ifh.cc/g/PXnyjN.png)
