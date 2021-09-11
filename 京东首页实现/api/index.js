// 推荐关键词
Mock.mock('/recommend',{
    "recommend" : '@cword(5)'
})

// 热门关键词
Mock.mock('/hotWords',{
    "data|6-8" : [
        {
            'text' : "@cword(3,5)",
            'url' : "@url(http)"
        }
    ]
})