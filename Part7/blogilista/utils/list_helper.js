const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    return blogs.length === 0 ? 0 : blogs
        .map(blog => blog.likes)
        .reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const reducer = (prev, curr) => {
        return (prev.likes > curr.likes) ? prev : curr
    }
    const favourite = blogs.length === 0 ? {} : blogs
        .reduce(reducer, {})
    return favourite
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}