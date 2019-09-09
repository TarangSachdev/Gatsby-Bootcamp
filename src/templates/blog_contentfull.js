import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Head from "../components/head"

// useStaticQuery; not used here
// $slug will come from the context we set up when we creart a page
// then it's goting to take response all of the post data and it's going to provide that as a props

// for contentful

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedOn(formatString: "MMMM Do, YYYY")
      body {
        json
      }
    }
  }
`

const Blog = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        console.log(node)
        if(node.data.target && node.data.target.fields){
          const alt = node.data.target.fields.title["en-US"]
          const url = node.data.target.fields.file["en-US"].url
          return <img alt={alt} src={url} />   
        }
        return ''
      },
    },
  }

  // return <Layout>{JSON.stringify(props.data)}</Layout>
  return (
    <Layout>
      <Head title={props.data.contentfulBlogPost.title} />
      
      <h1>{props.data.contentfulBlogPost.title}</h1>
      <p>{props.data.contentfulBlogPost.publishedOn}</p>
        {documentToReactComponents(
        props.data.contentfulBlogPost.body.json,
        options
      )}
    </Layout>
  )
}

export default Blog
