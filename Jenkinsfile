/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    tools { nodejs 'NodeJs' }
    stages {
        stage('Test Npm') {
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
                /* groovylint-disable-next-line LineLength */
                sh "sudo rsync -avr -e 'ssh -l jmismail' --exclude='client' . jmismail@192.168.2.126:/home/jmismail/ts-notes-app"
                /* groovylint-disable-next-line LineLength */
                sh "sudo rsync -avz --stats --rsync-path='echo toor | sudo -Sv && sudo rsync' ${WORKSPACE}/client/dist/ jmismail@192.168.2.126:/var/www/ts-notes-app/"
            }
        }
    }
}
