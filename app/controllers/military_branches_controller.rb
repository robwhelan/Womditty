class MilitaryBranchesController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource
  # GET /military_branches
  # GET /military_branches.json
  def index
    @military_branches = MilitaryBranch.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @military_branches }
    end
  end

  # GET /military_branches/1
  # GET /military_branches/1.json
  def show
    @military_branch = MilitaryBranch.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @military_branch }
    end
  end

  # GET /military_branches/new
  # GET /military_branches/new.json
  def new
    @military_branch = MilitaryBranch.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @military_branch }
    end
  end

  # GET /military_branches/1/edit
  def edit
    @military_branch = MilitaryBranch.find(params[:id])
  end

  # POST /military_branches
  # POST /military_branches.json
  def create
    @military_branch = MilitaryBranch.new(params[:military_branch])

    respond_to do |format|
      if @military_branch.save
        format.html { redirect_to @military_branch, notice: 'Military branch was successfully created.' }
        format.json { render json: @military_branch, status: :created, location: @military_branch }
      else
        format.html { render action: "new" }
        format.json { render json: @military_branch.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /military_branches/1
  # PUT /military_branches/1.json
  def update
    @military_branch = MilitaryBranch.find(params[:id])

    respond_to do |format|
      if @military_branch.update_attributes(params[:military_branch])
        format.html { redirect_to @military_branch, notice: 'Military branch was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @military_branch.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /military_branches/1
  # DELETE /military_branches/1.json
  def destroy
    @military_branch = MilitaryBranch.find(params[:id])
    @military_branch.destroy

    respond_to do |format|
      format.html { redirect_to military_branches_url }
      format.json { head :no_content }
    end
  end
end
