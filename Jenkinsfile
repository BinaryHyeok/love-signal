pipeline {
    agent any

    tools {
        jdk 'JDK 17'
    }

    stages {

        stage('Copy files') {
            steps {
                sshagent([credentials: ['SSH_CREDENTIAL']]) {
                    sh """
                        ssh ubuntu@k8b309.p.ssafy.io "
                            rm -rf /home/ubuntu/be_auth
                        "
                        scp -r ${WORKSPACE} ubuntu@k8b309.p.ssafy.io:/home/ubuntu
                    """
                }
            }
        }

        stage('discoveryservice Build') {
            steps {
                script {
                    dir('discoveryservice') {
                        sh 'chmod +x ./gradlew'
                        sh './gradlew clean build'
                    }
                }
            }
        }

        stage('apigateway Build') {
            steps {
                script {
                    dir('apigateway') {
                        sh 'chmod +x ./gradlew'
                        sh './gradlew clean build -x test'
                    }
                }
            }
        }

        stage('config Build') {
            steps {
                script {
                    dir('config') {
                        sh 'chmod +x ./gradlew'
                        sh './gradlew clean build'
                    }
                }
            }
        }


        stage('auth-service Build') {
            steps {
                script {
                    dir('AuthService') {
                        sh 'chmod +x ./gradlew'
                        sh './gradlew clean build -x test -Pprod'
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube Server') {
                    script {
                        dir('AuthService') {
                            sh './gradlew -d sonar'
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent([credentials: ['SSH_CREDENTIAL']]) {
                    sh """
                        ssh ubuntu@k8b309.p.ssafy.io "
                            cd /home/ubuntu/be_auth
                            docker compose -f docker-compose.yml stop mysql redis discoveryservice apigateway config sonarqube postgres auth-service
                            docker compose -f docker-compose.yml rm -f mysql redis discoveryservice apigateway config sonarqube postgres auth-service
                            docker compose -f docker-compose.yml build mysql redis discoveryservice apigateway config sonarqube postgres auth-service
                            docker compose -f docker-compose.yml up -d mysql redis discoveryservice apigateway config sonarqube postgres auth-service

                        "
                    """
                }
            }
        }
    }
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
