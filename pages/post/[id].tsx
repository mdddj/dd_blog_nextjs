import {blogApi} from "../../util/req";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown.css'
export default  function Blog({blog}){
    
    
    
    return <div className={'markdown-body'}>
    
        <ReactMarkdown children={blog.content} remarkPlugins={[remarkGfm]}  />
    </div>
}

export async function getServerSideProps({ params }) {
    console.log(params.id)
    const result = await blogApi().getBlogDetailById(params.id);
    return {
        props: {
            blog: result.data
        }
    }
}
