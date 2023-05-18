pipeline {
    agent any

    tools {
        jdk 'JDK 17'
    }

    stages {

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

        stage('Copy new JAR file for discoveryservice') {
            steps {
                sshagent([credentials: ['SSH_CREDENTIAL']]) {
                    sh """
                        scp discoveryservice/build/libs/*.jar ubuntu@k8b309.p.ssafy.io:/home/ubuntu/be_develop/cloud/discoveryservice/build/libs
                    """
                }
            }
        }

        stage('apigateway Build') {
            steps {
                script {
                    dir('apigateway') {
                        sh 'chmod +x ./gradlew'
                        sh './gradlew clean build'
                    }
                }
            }
        }

        stage('Copy new JAR file for apigateway') {
            steps {
                sshagent([credentials: ['SSH_CREDENTIAL']]) {
                    sh """
                        scp apigateway/build/libs/*.jar ubuntu@k8b309.p.ssafy.io:/home/ubuntu/be_develop/cloud/apigateway/build/libs
                    """
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

        stage('Copy new JAR file for config') {
            steps {
                sshagent([credentials: ['SSH_CREDENTIAL']]) {
                    sh """
                        scp config/build/libs/*.jar ubuntu@k8b309.p.ssafy.io:/home/ubuntu/be_develop/cloud/config/build/libs
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent([credentials: ['SSH_CREDENTIAL']]) {
                    sh """
                        ssh ubuntu@k8b309.p.ssafy.io "
                            cd /home/ubuntu/be_develop
                            docker compose -f docker-compose.yml stop discoveryservice apigateway config sonarqube postres
                            docker compose -f docker-compose.yml rm -f discoveryservice apigateway config sonarqube postres
                            docker compose -f docker-compose.yml build discoveryservice apigateway config sonarqube postres
                            docker compose -f docker-compose.yml up -d discoveryservice apigateway config sonarqube postres
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
