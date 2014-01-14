require 'google_analytics_api'

class NeighborhoodThoughtsController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource
  # GET /neighborhood_thoughts
  # GET /neighborhood_thoughts.json
  def index
    @neighborhood_thoughts = NeighborhoodThought.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @neighborhood_thoughts }
    end
  end

  # GET /neighborhood_thoughts/1
  # GET /neighborhood_thoughts/1.json
  def show
    @neighborhood_thought = NeighborhoodThought.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @neighborhood_thought }
    end
  end

  # GET /neighborhood_thoughts/new
  # GET /neighborhood_thoughts/new.json
  def new
    @neighborhood_thought = NeighborhoodThought.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @neighborhood_thought }
    end
  end

  # GET /neighborhood_thoughts/1/edit
  def edit
    @neighborhood_thought = NeighborhoodThought.find(params[:id])
  end

  # POST /neighborhood_thoughts
  # POST /neighborhood_thoughts.json
  def create
    @neighborhood_thought = NeighborhoodThought.new(params[:neighborhood_thought])
    
    @neighborhood_thought.process_posts(current_user.id)
    GoogleAnalyticsApi.new.pageview('/host/create', cookies[:clientId])

    respond_to do |format|
      if @neighborhood_thought.save
        format.html { redirect_to neighborhood_path(@neighborhood_thought.neighborhood), notice: 'Neighborhood thought was successfully created.' }
        format.json { render json: @neighborhood_thought, status: :created, location: @neighborhood_thought }
      else
        format.html { render action: "new" }
        format.json { render json: @neighborhood_thought.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /neighborhood_thoughts/1
  # PUT /neighborhood_thoughts/1.json
  def update
    @neighborhood_thought = NeighborhoodThought.find(params[:id])

    respond_to do |format|
      if @neighborhood_thought.update_attributes(params[:neighborhood_thought])
        format.html { redirect_to @neighborhood_thought, notice: 'Neighborhood thought was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @neighborhood_thought.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /neighborhood_thoughts/1
  # DELETE /neighborhood_thoughts/1.json
  def destroy
    @neighborhood_thought = NeighborhoodThought.find(params[:id])
    @neighborhood_thought.destroy

    respond_to do |format|
      format.html { redirect_to neighborhood_thoughts_url }
      format.json { head :no_content }
    end
  end
end
