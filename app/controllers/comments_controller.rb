class CommentsController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource
  # GET /comments
  # GET /comments.json
  def index

    if params[:place]
      # find the place with those params or create one
      @place = Place.find_by_google_place_id(params[:place])
      @comments = @place.comments.reverse
    else
      @comments = Comment.all
    end

    respond_to do |format|
      format.html # index.html.erb
   	  format.json { render json: @comments.to_json(:include => [:user, :place] ) }
    end
  end

  # GET /comments/1
  # GET /comments/1.json
  def show
    @comment = Comment.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @comment }
    end
  end

  # GET /comments/new
  # GET /comments/new.json
  def new
    @comment = Comment.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @comment }
    end
  end

  # GET /comments/1/edit
  def edit
    @comment = Comment.find(params[:id])
  end

  # POST /comments
  # POST /comments.json
  def create
    @comment = Comment.new(params[:comment])

    respond_to do |format|
      if @comment.save
        #format.html { redirect_to @comment, notice: 'Comment was successfully created.' }
        @comment.create_activity :create, owner: current_user
        format.js
      else
        format.html { render action: "new" }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /comments/1
  # PUT /comments/1.json
  def update
    @comment = Comment.find(params[:id])

    respond_to do |format|
      if @comment.update_attributes(params[:comment])
        format.html { redirect_to @comment, notice: 'Comment was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy

    respond_to do |format|
      format.html { redirect_to comments_url }
      format.json { head :no_content }
    end
  end
  
  def vote_up
    begin
      @vote = current_user.vote_for(@comment = Comment.find(params[:id]))
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
      @vote = current_user.vote_against(@comment = Comment.find(params[:id]))
      @vote.create_activity :destroy, owner: current_user
      
      respond_to do |format|
        format.js
      end
      #render :nothing => true, :status => 200
    rescue ActiveRecord::RecordInvalid
      render :nothing => true, :status => 404
    end
  end
  
  
  
end
