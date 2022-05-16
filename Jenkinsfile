pipeline {
    agent any
    tools { nodejs 'NodeJs' }
    stages {
        stage('Check') {
            steps {
                sh '''
                    npm --version
                '''
            }
        }
        stage('Build') {
            steps {
                sh '''
                   npm install
                   npm run build
                   cd client/
                   npm install --force
                   npm run build
                '''
            }
        }
        stage('Deploy') {
            steps {
                sh "cd ${WORKSPACE}"
                withCredentials([string(credentialsId: 'server-ip-address', variable: 'SERVER_IP_ADDRESS')]) {             
                sh 'sudo rsync -avr -e "ssh -l jmismail" --exclude="client" . jmismail@${SERVER_IP_ADDRESS}:/home/jmismail/ts-notes-app'
                }
                sh 'sudo rsync -avz --stats --rsync-path="echo toor | sudo -Sv && sudo rsync" ${WORKSPACE}/client/dist/ jmismail@${SERVER_IP_ADDRESS}:/var/www/ts-notes-app/'
            }
        }
    }
}
