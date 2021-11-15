import {blogApi} from "../../util/req";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown.css'
import {Heading} from "@chakra-ui/react";
import React from "react";
import {BlogData} from "dd_server_api_web/apis/model/result/BlogPushNewResultData";
import {GetServerSideProps, GetServerSidePropsContext, PreviewData} from "next";
import {ParsedUrlQuery} from "querystring";


const Blog: React.FC<{ blog: BlogData }> = ({blog}) => {
    return <div>
        <Heading>{blog.title}</Heading>
        <div className={'markdown-body'}>
            {/* eslint-disable-next-line react/no-children-prop */}
            <ReactMarkdown children={blog.content} remarkPlugins={[remarkGfm]}/>
        </div>
    </div>
}

class CustomParsedUrlQuery implements ParsedUrlQuery {
    [key: string]: string | string[] | undefined;
}

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
