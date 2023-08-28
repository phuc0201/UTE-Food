import React, {useState}from "react";
import StarRatings from 'react-star-ratings';
import products from '../../assets/fake-data/products.js'
import { LiaStarSolid } from "react-icons/lia";
import { useParams } from "react-router-dom";
import './review.scss'
const comments=[1,1,1,1,11,1,111,1,1,1,1,1,1]
const comment = {
    username:'Phuc',
    useravatar:'https://secure.gravatar.com/avatar/58339abbf7950af484818a32567a68b2?s=60&d=mm&r=g',
    starRating:5,
    content: ''
};

export default function Review(){
    const [rating, setRating] = useState(0)
    const [starHover, setStarHover] = useState(0)
    const MyStarRating = ()=>{
        return(
            <div className="my-starrating">
                {
                    [...Array(5)].map((star, index) =>{
                        const currRating = index+1;
                        return(
                            <LiaStarSolid size={50}
                                onClick={()=>{setRating(currRating)}}
                                color={currRating <= (rating || starHover)? "#f7c942" : "e4e5e9"}
                                onMouseEnter={()=>{setStarHover(currRating)}}         
                                onMouseLeave={()=>{setStarHover(0)}}
                                style={{cursor:'pointer'}}/>
                        )
                    })
                }
            </div>
        )
    }
    const { id } = useParams();
    return (
    <div id="review">
        <div id="my-review">
            <img className="user-avatar" src={comment.useravatar} alt="user-avatar" height={60} width={60}
                        style={{
                            borderRadius:'50%',
                            marginRight:'10px'
                        }}/>
            <div>
                <MyStarRating/>
                <input type="text" placeholder="your review"/>
                <button className="comment--button" onClick={
                    ()=>{
                        setRating(0);
                        setStarHover(0);
                        document.querySelector("#review input").value = ''
                    }
                }>
                    Comment
                </button>
            </div>
        </div>
        <div id="comments">
            {
                comments.map((item)=>(
                    <div className="comment">
                    <img className="user-avatar" src={comment.useravatar} alt="user-avatar" height={60} width={60}
                        style={{
                            borderRadius:'50%'
                        }}/>
                    <div>
                        <span className="username">{comment.username}</span>
                        <div className="star-rating">
                        <StarRatings
                            rating={comment.starRating}
                            starRatedColor="#f7c942"
                            numberOfStars={5}
                            starDimension="15px"
                            starSpacing="1px"/>
                        </div>
                        <div className="content">
                           
                        </div>
                    </div>
                </div>
                ))
            }
        </div>
    </div>
    );
}