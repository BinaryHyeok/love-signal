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
                            rm -rf /home/ubuntu/be_member
                        "
                        scp -r ${WORKSPACE} ubuntu@k8b309.p.ssafy.io:/home/ubuntu
                    """
                }
            }
        }

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

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube Server') {
                    script {
                        dir('MemberService') {
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
                            cd /home/ubuntu/be_member
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
