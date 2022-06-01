pipeline {
    agent any
    tools { nodejs 'Node16.15.0' }
    stages {
        stage('Check') {
            steps {
                sh '''
                    npm --version
                    node --version
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
                withCredentials([
                    string(credentialsId: 'ts-notes-server-ip', variable: 'SERVER_IP_ADDRESS'),
                    string(credentialsId: 'ts-notes-server-password', variable: 'SERVER_PASSWORD'),
                ]) {
                    sh "cd ${WORKSPACE}"
                    sh 'sudo rsync -avr -e "ssh -l jmismail" --exclude="client" . jmismail@${SERVER_IP_ADDRESS}:/home/jmismail/ts-notes-app'
                    sh 'sudo rsync -avz --stats --rsync-path="echo ${SERVER_PASSWORD} | sudo -Sv && sudo rsync" ${WORKSPACE}/client/dist/ jmismail@${SERVER_IP_ADDRESS}:/usr/share/nginx/ts-notes-app'
                }
            }
        }
    }
}


 /usr/share/nginx/ts-notes-app