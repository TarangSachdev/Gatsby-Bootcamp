import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

const AboutPage = ()=>{
    return (
        <div>
            <Layout>
                <h1>About Me</h1>
                <p>I am a software developer<Link to="/contact">Contact me.</Link></p>
            </Layout>
        </div>

    )
}

export default AboutPage;