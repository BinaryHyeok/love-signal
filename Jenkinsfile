pipeline {
    agent any

    tools {
        jdk 'JDK 17'
    }

    stages {

        stage('chatting-service Build') {
            steps {
                script {
                    dir('chatting-service') {
                        sh 'chmod +x ./gradlew'
                        sh './gradlew clean build -x test -Pprod'
                    }
                }
            }
        }

        stage('Copy new JAR file') {
            steps {
                sshagent([credentials: ['SSH_CREDENTIAL']]) {
                    sh """
                        scp chatting-service/build/libs/*.jar ubuntu@k8b309.p.ssafy.io:/home/ubuntu/be_develop/chatting-service/build/libs
                    """
                }
            }
        }

        stage('SonarQube Analysis') {
            catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                steps {
                    withSonarQubeEnv('SonarQube Server') {
                        script {
                            dir('chatting-service') {
                                sh './gradlew -d sonar'
                            }
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
                            cd /home/ubuntu/be_develop
                            docker compose -f docker-compose.yml stop chatting-service
                            docker compose -f docker-compose.yml rm -f chatting-service
                            docker compose -f docker-compose.yml build chatting-service
                            docker compose -f docker-compose.yml up -d chatting-service
                        "
                    """
                }
            }
        }
    }

    // MatterMost Norification
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