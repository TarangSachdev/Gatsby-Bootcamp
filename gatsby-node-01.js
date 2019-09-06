const path = require("path")
const path = require("path")


// to generate slug 
module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  //   console.log(node)
  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(node.fileAbsolutePath, ".md")
    // adding a slug on markdown nodes
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
    // adding a slug on markdown nodes done
  }
}

// 2. genearate the blog past page template -> template/blog

// 3.generate pages for each post

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // current location in the gatsby-bootcamp folder to the destination which is blog.js
  // 1.get path to template
  const blogTemplate = path.resolve("./src/templates/blog.js") // resolve funciton create absolute path from the root of the harddrive

  // 2.get markdown data
  const response = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  response.data.allMarkdownRemark.edges.forEach(edge => {
    const slug = edge.node.fields.slug;
    createPage({
      component: blogTemplate,
      path: `/blog/${slug}`,
      context: { slug },
    })
  })

  // 3.create new pages
}

// graphql here is a bit different from we used in react component (importing from gatsby)
