const path = require("path")

// on careteNode is use to generate slugs for our post -> but in contentful we set the fields slug so no need for that now :-)
// so we can remove this method
// to generate slug

// you can renomve onCreateNode methods if you only want to generate blog fron the contentful

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  // console.log("node", node.internal.type , node.absolutePath)
  // debugger;
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
  const blogTemplate = path.resolve("./src/templates/blog.js") // resolve funciton create absolute path from the root of the harddrive
  const blogContentfullTemplate = path.resolve(
    "./src/templates/blog_contentfull.js"
  ) // resolve funciton create absolute path from the root of the harddrive

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
    const slug = edge.node.fields.slug
    createPage({
      component: blogTemplate,
      path: `/blog/${slug}`,
      context: { slug },
    })
  })

  const response_c = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  response_c.data.allContentfulBlogPost.edges.forEach(edge => {
    const slug = edge.node.slug
    createPage({
      component: blogContentfullTemplate,
      path: `/blog-contentfull/${slug}`,
      context: { slug },
    })
  })

  // 3.create new pages
}

// graphql here is a bit different from we used in react component (importing from gatsby)
