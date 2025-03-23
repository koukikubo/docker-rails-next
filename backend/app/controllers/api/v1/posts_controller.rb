class Api::V1::PostsController < ApplicationController
  def index
    @posts = Post.all.order(created_at: :desc)
    render json: @posts.as_json(include: [:image_attachment, :movie_attachment])
  end

  def create
    @post = Post.new(post_params)
  
    if @post.save
      render json: @post.as_json(include: [:image_attachment, :movie_attachment]), status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])
    post.update(post_params)
  end

  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  private
  def post_params
    params.require(:post).permit(:title, :content, :image, :movie)
  end
  

end
