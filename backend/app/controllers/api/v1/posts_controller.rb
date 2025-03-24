class Api::V1::PostsController < ApplicationController
  def index
    @posts = Post.all.order(created_at: :desc)
    render json: @posts.map { |post| serialize_post(post) }
  end
  
  def show
    @post = Post.find(params[:id])
    render json: serialize_post(@post)
  end
  
  def create
    @post = Post.new(post_params)
    if @post.save
      render json: serialize_post(@post), status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end
  
  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: serialize_post(@post)
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end
  
  private
  
  def serialize_post(post)
    {
      id: post.id,
      title: post.title,
      content: post.content,
      user_id: post.user_id,
      created_at: post.created_at,
      updated_at: post.updated_at,
      image_url: post.image.attached? ? url_for(post.image) : nil,
      movie_url: post.movie.attached? ? url_for(post.movie) : nil,
    }
  end
  
  def post_params
    params.require(:post).permit(:user_id, :title, :content, :image, :movie)
  end
  
end
