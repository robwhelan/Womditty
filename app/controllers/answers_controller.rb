class AnswersController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource
  # GET /answers
  # GET /answers.json
  def index
    @post = Post.find(params[:post])
    @answers = @post.answers

    respond_to do |format|
      format.js
    end
  end

  # GET /answers/1
  # GET /answers/1.json
  def show
    @answer = Answer.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @answer }
    end
  end

  # GET /answers/new
  # GET /answers/new.json
  def new
    @answer = Answer.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @answer }
    end
  end

  # GET /answers/1/edit
  def edit
    @answer = Answer.find(params[:id])
  end

  # POST /answers
  # POST /answers.json
  def create
    @answer = Answer.new(params[:answer])
    @post = Post.find(params[:answer][:post_id])

    respond_to do |format|
      if @answer.save
        @answer.create_activity :create, owner: current_user
        #format.html
        format.js
#        format.html { redirect_to @answer, notice: 'Answer was successfully created.' }
#        format.json { render json: @answer, status: :created, location: @answer }
      else
        format.html { render action: "new" }
        format.json { render json: @answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /answers/1
  # PUT /answers/1.json
  def update
    @answer = Answer.find(params[:id])

    respond_to do |format|
      if @answer.update_attributes(params[:answer])
        format.html { redirect_to @answer, notice: 'Answer was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /answers/1
  # DELETE /answers/1.json
  def destroy
    @answer = Answer.find(params[:id])
    @answer.destroy

    respond_to do |format|
      format.html { redirect_to answers_url }
      format.json { head :no_content }
    end
  end
  
  def vote_up
    begin
      @vote = current_user.vote_for(@answer = Answer.find(params[:id]))
      @vote.create_activity :create, owner: current_user

      @post = @answer.post
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
      @vote = current_user.vote_against(@answer = Answer.find(params[:id]))
      @vote.create_activity :destroy, owner: current_user
    
      @post = @answer.post
      respond_to do |format|
        format.js
      end
      #render :nothing => true, :status => 200
    rescue ActiveRecord::RecordInvalid
      render :nothing => true, :status => 404
    end
  end
  
end
