"use client";

function Post() {
  return (
    //title
    //images
    //description
    //user
    //price
    //difficulty
    //categories
    //maybe category and tag should be seperated
    //posted date
    // likes
    //comments

    <div>
      <div>Title</div>
      <div className="h-64">Image Rotation</div>
      <p>Posted by: User</p>
      <p>Price: $0.00</p>
      <p>Difficulty: Easy</p>

      <p>Categories: Category</p>
      {/* probably ony show a couple  */}
      <p>Posted Date: 2022-01-01</p>
      <p>Comments: 0</p>
      <p>Likes: 0</p>
    </div>
  );
}

export default Post;
