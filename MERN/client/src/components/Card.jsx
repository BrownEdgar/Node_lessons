import { Link } from "react-router-dom";

const Card = ({ post }) => {
  function toBase64(arr = '') {
    //arr = new Uint8Array(arr) 
    // return btoa(
    //   new Buffer.from(arr).reduce((data, byte) => data + String.fromCharCode(byte), '')
    // );
    return new Buffer.from(arr).toString('base64')
  }
  return (
    <div className="card">
      <Link className="link" to={`/post/${post._id}`}>
        <h4 className="title">{post.title}</h4>
        <img src={`data:${post?.img.contentType};base64,${toBase64(post.img?.data)}`} alt="" className="img" />

        <div className="card__content">
          <p className="desc">{post.desc}</p>
          <button className="cardButton">Read More</button>
        </div>
      </Link>
    </div>
  );
};

export default Card;
