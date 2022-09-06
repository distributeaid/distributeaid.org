/*
Page Tree Traversal Helpers
------------------------------------------------------------
NOTE: In JS so it can be used by `/.js` too.
*/

function BFS(root, handlePage, filterChildren = null) {
  if (filterChildren === null) {
    filterChildren = (page) => true
  }

  let queue = [root]
  while (queue.length > 0) {
    page = queue.shift()
    handlePage(page)

    next = page.leadsTo.filter(filterChildren)
    queue = queue.concat(next)
  }
}

function preorderDFS(root, handlePage, filterChildren = null) {
  if (filterChildren === null) {
    filterChildren = (page) => page
  }

  handlePage(root)
  root.leadsTo.filter(filterChildren).forEach((childPage) => {
    preorderDFS(childPage, handlePage, filterChildren)
  })
}

function postorderDFS(root, handlePage, filterChildren = null) {
  if (filterChildren === null) {
    filterChildren = (page) => page
  }

  root.leadsTo.filter(filterChildren).forEach((childPage) => {
    PageTreeTraversal.postorderDFS(childPage, handlePage, filterChildren)
  })
  handlePage(root)
}

module.exports = { BFS, preorderDFS, postorderDFS }
