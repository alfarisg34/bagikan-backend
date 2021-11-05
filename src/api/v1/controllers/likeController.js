const { likeServices } = require('../services')
const { Like,Post,User} = require('../models')
const { post } = require('../routes/authRoutes')

exports.getLike = async (req, res) => {
  const postId = req.params.id
  const userId = req.user.id
  const like = await Like.findOne({$and:[{userId:userId},{postId:postId}]})

  try {
    if(like){
      res.status(201).json({
        success: true,
        message: 'Get Like Status Success',
        data:{
          postId:postId,
          userId:userId,
          statusLike:like.status,
          
        }
      })
    }
    else{
  
      res.status(201).json({
        success: true,
        message: 'Get Like Status Success(not created)',
        data:{
          postId:postId,
          userId:userId,
          statusLike:false,
          
        }
      })
    }
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Failed to like!',
      errors: error,
    })
  }
  

  
}
exports.like = async (req, res) => {
  const postId = req.params.id
  const userId = req.user.id

  try {
    // const like = await Like.find({userId:userId})
    const like = await Like.findOne({$and:[{userId:userId},{postId:postId}]})
    // console.log(like)
    // console.log(`userId: `+userId)
    // console.log(`postId: `+postId)
    const post = await Post.findOne({_id:postId})
    if(like == null){
      const result = await likeServices.create(userId,postId)
      
      post.like +=1
      post.save()
      // console.log(post)
      
      res.status(201).json({
        success: true,
        message: 'Successfully like post!',
        data:{
          postId:postId,
          like:post.like,
        }
      })
    }
    if(like.status == 1){
      res.status(201).json({
        success: false,
        message: 'Post Sudah dilike',
      })
    }
    else if(like.status == 0 ||like.status == false){
      
      like.status=true
      like.save()
      post.like +=1
      post.save()
      res.status(201).json({
        success: true,
        message: 'Successfully like post!',
        data:{
          postId:postId,
          like:post.like,
        }
      })
    }

  } catch (err) {
    console.log('Errors: ', err)
    const errorMessage = likeServices.handleRegistrationErrors(err)

    return res.status(500).json({
      success: false,
      message: 'Failed to create like!',
      errors: errorMessage,
    })
  }

}

exports.dislike = async (req, res) => {
  const postId = req.params.id
  const userId = req.user.id
  const post = await Post.findOne({_id:postId})
  try {
    // const like = await Like.find({'like.userId':userId})
    const like = await Like.findOne({$and:[{userId:userId},{postId:postId}]})
    // console.log(like.status)
    if(like.status == true){
      like.status=false
      like.save()
      post.like -=1
      post.save()
      res.status(201).json({
        success: true,
        message: 'Dislike post berhasil',
        data:{
          postId:postId,
          like:post.like,
        }
      })
    }
    else if(like.status == false){
  
      res.status(201).json({
        success: true,
        message: 'Post sudah di dislike',
      })
    }
  } catch (err) {
    console.log('Errors: ', err)
    const errorMessage = postServices.handleRegistrationErrors(err)

    return res.status(500).json({
      success: false,
      message: 'Failed to like!',
      errors: errorMessage,
    })
  }
}

