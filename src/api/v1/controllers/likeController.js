const { likeServices } = require('../services')
const { Like,Post,User} = require('../models')

exports.like = async (req, res) => {
  const postId = req.params.id
  const userId = req.user.id

  try {
    // const like = await Like.find({userId:userId})
    const like = await Like.findOne({$and:[{userId:userId},{postId:postId}]})
    console.log(like)
    // console.log(`userId: `+userId)
    // console.log(`postId: `+postId)
    if(like == null){
      const result = await likeServices.create(userId,postId)
  
      res.status(201).json({
        success: true,
        message: 'Successfully like post!',
        data: result,
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
      res.status(201).json({
        success: true,
        message: 'Successfully like post!',
      })
    }

  } catch (err) {
    console.log('Errors: ', err)
    const errorMessage = postServices.handleRegistrationErrors(err)

    return res.status(500).json({
      success: false,
      message: 'Failed to create post!',
      errors: errorMessage,
    })
  }

}

exports.dislike = async (req, res) => {
  const postId = req.params.id
  const userId = req.user.id

  try {
    // const like = await Like.find({'like.userId':userId})
    const like = await Like.findOne({$and:[{'like.userId':userId},{'like.postId':postId}]})
    // console.log(like.status)
    if(like.status == true){
      like.status=false
      like.save()

      res.status(201).json({
        success: true,
        message: 'Dislike post berhasil',
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

