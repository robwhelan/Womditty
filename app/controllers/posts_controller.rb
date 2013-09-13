class PostsController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource


  # GET /posts
  # GET /posts.json
  def index

    if params[:code]
      @all_posts = Post.all
    end

    @search = Post.search(params[:q])
    @posts_from_body_search = @search.result
    
    if params[:q]
      @posts_from_tag_search = Post.tagged_with(params[:q][:body_cont])
      myArray = (@posts_from_body_search + @posts_from_tag_search).uniq.sort{|a, b| b[:created_at] <=> a[:created_at]}
    else
      myArray = @posts_from_body_search
    end
   
   @posts = Kaminari.paginate_array(myArray).page params[:page]
   
   # .sort{|a, b| b[:created_at] <=> a[:created_at]}
   
    # combine the array of posts whose body contains the search field, with
    # the array of posts whose tags contain the search field,
    # then only grab the unique ones, then order them in ascending order
    #@posts = Post.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @all_posts.to_json(:include => :user) }
    end
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    @post = Post.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @post }
    end
  end

  # GET /posts/new
  # GET /posts/new.json
  def new
    @post = Post.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @post }
    end
  end

  # GET /posts/1/edit
  def edit
    @post = Post.find(params[:id])
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(params[:post])

    respond_to do |format|
      if @post.save
        @post.create_activity :create, owner: current_user
        if @post.tag_list
          format.html { redirect_to posts_path('q[body_cont]' => @post.tag_list.first), notice: 'Post was successfully created.' }
        else
          format.html { redirect_to posts_path, notice: 'Post was successfully created.' }
        end
        format.json { render json: @post, status: :created, location: @post }
      else
        format.html { render action: "new" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /posts/1
  # PUT /posts/1.json
  def update
    @post = Post.find(params[:id])

    respond_to do |format|
      if @post.update_attributes(params[:post])
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post = Post.find(params[:id])
    @post.destroy

    respond_to do |format|
      format.html { redirect_to posts_url }
      format.json { head :no_content }
    end
  end

  def vote_up
    begin
      @vote = current_user.vote_for(@post = Post.find(params[:id]))
      @vote.create_activity :create, owner: current_user
      
      respond_to do |format|
        format.js
      end
      #render :nothing => true, :status => 200
    rescue ActiveRecord::RecordInvalid
      render :nothing => true, :status => 404
    end
  end

  def vote_down
    begin
      @vote = current_user.vote_against(@post = Post.find(params[:id]))
      @vote.create_activity :destroy, owner: current_user

      respond_to do |format|
        format.js
      end
      #render :nothing => true, :status => 200
    rescue ActiveRecord::RecordInvalid
      render :nothing => true, :status => 404
    end
  end

  def hide_answers
    @post = Post.find(params[:id])
    respond_to do |format|
      format.js
    end
  end

end
