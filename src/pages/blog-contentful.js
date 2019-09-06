import React from "react"
import Layout from "../components/layout"

import { graphql, useStaticQuery, Link } from "gatsby"
import blogStyles from "./blog.module.scss"

// goal : link to blog post

// 1. swap out the md query wth the contentful query
// 2. update the componnt to render the new date
//     - don't worry if the links to a non-existant page
// 3. test

const BlogContentFullPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort : { fields : publishedOn, order:DESC}){
        edges{
          node{
            title
            slug
            publishedOn(formatString:"MMMM Do, YYYY")
          }
        }
      }
    }
  `) 
  //   console.log(data)

  return (
    <div>
      <Layout>
        <h1>My Blog</h1>
        <ol className={blogStyles.posts}>
          {data.allContentfulBlogPost.edges.map((edge, index) => {
            return (
              <li key={index} className={blogStyles.post}>
                <Link to={`/blog/${edge.node.slug}`}>
                  <h1>{edge.node.title}</h1>
                  <p>{edge.node.publishedOn}</p>
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

export default BlogContentFullPage
