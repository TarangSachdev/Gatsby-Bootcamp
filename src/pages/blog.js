import React from "react"
import Layout from "../components/layout"

import { graphql, useStaticQuery, Link } from "gatsby"
import blogStyles from "./blog.module.scss"
import Head from "../components/head"

// goal : link to blog post

// 1. fetch the slug for posts
// 2. use slug to generate a link to the post
// 3. test

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  //   console.log(data)

  return (
    <div>
      <Layout>
        <Head title="Blog" />
        <h1>My Blog</h1>
        <ol className={blogStyles.posts}>
          {data.allMarkdownRemark.edges.map((edge, index) => {
            return (
              <li key={index} className={blogStyles.post}>
                <Link to={`/blog/${edge.node.fields.slug}`}>
                  <h1>{edge.node.frontmatter.title}</h1>
                  <p>{edge.node.frontmatter.date}</p>
                </Link>
              </li>
              // <li key={index}>
              //   <Link to={`/blog/${edge.node.fields.slug}`}>
              //     <h1>{edge.node.frontmatter.title}</h1>
              //     <p>{edge.node.frontmatter.date}</p>
              //   </Link>
              // </li>
            )
          })}
        </ol>
        {/* <p>Posts will show up here later on.</p> */}
      </Layout>
    </div>
  )
}

export default BlogPage
