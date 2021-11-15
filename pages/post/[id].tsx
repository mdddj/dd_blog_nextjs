import {blogApi} from "../../util/req";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown.css'
import {Container, Heading} from "@chakra-ui/react";
import React from "react";
import {BlogData} from "dd_server_api_web/apis/model/result/BlogPushNewResultData";
import {GetServerSideProps, GetServerSidePropsContext, PreviewData} from "next";
import {ParsedUrlQuery} from "querystring";
import Highlight from 'react-highlight'


const Blog: React.FC<{ blog: BlogData }> = ({blog}) => {
    return <Container maxW={'container.md'}>
        <article className={'blog-article'}>
            
            
            {/*博客标题*/}
            <Heading className={'blog-title'}>{blog.title}</Heading>
            
            
            {/*博客元数据，显示作者信息和发布日期，博客分类和返回的按钮*/}
            <div className={'blog-meta'}>
                <div className={'mate'}>
                    {blog.author},<time>{blog.dateString}</time> • <span className={'tag'}>{blog.category.name}</span>
                </div>
                <a>返回</a>
            </div>
            
            {/*博客正文内容*/}
            <div className={'markdown-body'}>
                {/* eslint-disable-next-line react/no-children-prop */}
                <ReactMarkdown children={blog.content} remarkPlugins={[remarkGfm]} components={{
                    code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                       return <div>
                           <Highlight language={match ? match : [1]}>
                               {String(children).replace(/\n$/, '')}
                           </Highlight>
                       </div>
                    }
                }} />
            </div>
        </article>
    </Container>
}

// 页面启动加载服务器数据
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    const params = context.params ?? {}
    const id = params.id as any;
    const result = await blogApi().getBlogDetailById(id);
    return {
        props: {
            blog: result.data
        }
    }
}

export default Blog
