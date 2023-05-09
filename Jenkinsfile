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
                            rm -rf /home/ubuntu/be_cloud
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

        stage('Deploy') {
            steps {
                sshagent([credentials: ['SSH_CREDENTIAL']]) {
                    sh """
                        ssh ubuntu@k8b309.p.ssafy.io "
                            cd /home/ubuntu/be_cloud
                            docker compose -f docker-compose.yml stop discoveryservice apigateway config sonarqube postgres
                            docker compose -f docker-compose.yml rm -f discoveryservice apigateway config sonarqube postgres
                            docker compose -f docker-compose.yml build discoveryservice apigateway config sonarqube postgres
                            docker compose -f docker-compose.yml up -d discoveryservice apigateway config sonarqube postgres
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
