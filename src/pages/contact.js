import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"

const ContactPage = () => {
  return (
    <div>
      <Layout>
        <Head title="Contact" />

        <h1>Contact</h1>
        <p>
          The best way to react me is via @tarang on Twitter
          <a href="https://www.google.com" target="_blanks">
            Google
          </a>
        </p>
      </Layout>
    </div>
  )
}

export default ContactPage
