import { Review } from "../../../Data-Models/ReviewsDataModel";
import { makeReview } from "./makeReview";


function submitReview(event){
    event.preventDefault();
    let reviewData=event.target;
    let reviewerId=JSON.parse(sessionStorage.getItem("currentUser"));
    let review=new Review(reviewerId,reviewData.review.value,"",[]);
    makeReview(review);

}

let reviewForm=document.getElementById("Review-Submit");
    reviewForm.addEventListener("submit",submitReview)