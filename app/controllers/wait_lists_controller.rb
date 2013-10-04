class WaitListsController < ApplicationController
  before_filter :authenticate_user!, :except => :create

  # GET /wait_lists
  # GET /wait_lists.json
  def index
    load_and_authorize_resource
    @wait_lists = WaitList.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @wait_lists }
    end
  end

  # GET /wait_lists/1
  # GET /wait_lists/1.json
  def show
    @wait_list = WaitList.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @wait_list }
    end
  end

  # GET /wait_lists/new
  # GET /wait_lists/new.json
  def new
    @wait_list = WaitList.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @wait_list }
    end
  end

  # GET /wait_lists/1/edit
  def edit
    @wait_list = WaitList.find(params[:id])
  end

  # POST /wait_lists
  # POST /wait_lists.json
  def create
    @wait_list = WaitList.new(params[:wait_list])

    respond_to do |format|
      if @wait_list.save
        #format.html { redirect_to @wait_list, notice: 'Wait list was successfully created.' }
        format.js
      else
        format.html { render action: "new" }
        format.json { render json: @wait_list.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /wait_lists/1
  # PUT /wait_lists/1.json
  def update
    @wait_list = WaitList.find(params[:id])

    respond_to do |format|
      if @wait_list.update_attributes(params[:wait_list])
        format.html { redirect_to @wait_list, notice: 'Wait list was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @wait_list.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /wait_lists/1
  # DELETE /wait_lists/1.json
  def destroy
    @wait_list = WaitList.find(params[:id])
    @wait_list.destroy

    respond_to do |format|
      format.html { redirect_to wait_lists_url }
      format.json { head :no_content }
    end
  end
end
