import {format} from 'date-fns';
import { Link } from 'react-router-dom';

export default function Post({_id, title, summary, cover, content, createdAt, author}) {
    return(
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
<<<<<<< HEAD
                    <img src={'https://blogosphere-blog-app-omb2.vercel.app/'+cover} alt="" />
=======
                    <img src={'https://blogosphere-blog-app.onrender.com/'+cover} alt="" />
>>>>>>> 85136fdfcd3dc52559381e7a13bb598a7f79d78d
                </Link>
            </div>
            
            <div className="texts">
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                <a className="author">{author.username}</a>
                <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    );
};
