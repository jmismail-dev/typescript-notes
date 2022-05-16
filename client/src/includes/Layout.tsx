import React from 'react';
import { Container } from 'react-bootstrap'

type Props = {
    children: React.ReactNode
}

import Header from './Header'

const Layout = (props: Props) => {
    return (
        <div>
            <Header />
            <Container className='my-4'>
                {props.children}
            </Container>
        </div>
    )
}

export default Layout;