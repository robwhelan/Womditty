class NeighborhoodTopicsController < ApplicationController
  # GET /neighborhood_topics
  # GET /neighborhood_topics.json
  def index
    @neighborhood_topics = NeighborhoodTopic.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @neighborhood_topics }
    end
  end

  # GET /neighborhood_topics/1
  # GET /neighborhood_topics/1.json
  def show
    @neighborhood_topic = NeighborhoodTopic.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @neighborhood_topic }
    end
  end

  # GET /neighborhood_topics/new
  # GET /neighborhood_topics/new.json
  def new
    @neighborhood_topic = NeighborhoodTopic.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @neighborhood_topic }
    end
  end

  # GET /neighborhood_topics/1/edit
  def edit
    @neighborhood_topic = NeighborhoodTopic.find(params[:id])
  end

  # POST /neighborhood_topics
  # POST /neighborhood_topics.json
  def create
    @neighborhood_topic = NeighborhoodTopic.new(params[:neighborhood_topic])

    respond_to do |format|
      if @neighborhood_topic.save
        format.html { redirect_to @neighborhood_topic, notice: 'Neighborhood topic was successfully created.' }
        format.json { render json: @neighborhood_topic, status: :created, location: @neighborhood_topic }
      else
        format.html { render action: "new" }
        format.json { render json: @neighborhood_topic.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /neighborhood_topics/1
  # PUT /neighborhood_topics/1.json
  def update
    @neighborhood_topic = NeighborhoodTopic.find(params[:id])

    respond_to do |format|
      if @neighborhood_topic.update_attributes(params[:neighborhood_topic])
        format.html { redirect_to @neighborhood_topic, notice: 'Neighborhood topic was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @neighborhood_topic.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /neighborhood_topics/1
  # DELETE /neighborhood_topics/1.json
  def destroy
    @neighborhood_topic = NeighborhoodTopic.find(params[:id])
    @neighborhood_topic.destroy

    respond_to do |format|
      format.html { redirect_to neighborhood_topics_url }
      format.json { head :no_content }
    end
  end
end
