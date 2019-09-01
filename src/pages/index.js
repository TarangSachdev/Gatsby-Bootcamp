// import React from "react"

// export default () => <div>The great gatsby bootcamp!</div>

import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

const IndexPage = () => {
    return (
        <div>
            <Layout>
                <h1>Hello</h1>
                <h2>I'm Tarang, a full-stack developer living in beautiful Gandhinagar</h2>
                <p>Need a developer? <Link to="/contact">Contact me.</Link></p>
            </Layout>
        </div>
    )
}

export default IndexPage
