class CenterCoordinatesController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource
  # GET /center_coordinates
  # GET /center_coordinates.json
  def index
    @center_coordinates = CenterCoordinate.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @center_coordinates }
    end
  end

  # GET /center_coordinates/1
  # GET /center_coordinates/1.json
  def show
    @center_coordinate = CenterCoordinate.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @center_coordinate }
    end
  end

  # GET /center_coordinates/new
  # GET /center_coordinates/new.json
  def new
    @center_coordinate = CenterCoordinate.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @center_coordinate }
    end
  end

  # GET /center_coordinates/1/edit
  def edit
    @center_coordinate = CenterCoordinate.find(params[:id])
  end

  # POST /center_coordinates
  # POST /center_coordinates.json
  def create
    @center_coordinate = CenterCoordinate.new(params[:center_coordinate])

    respond_to do |format|
      if @center_coordinate.save
        format.html { redirect_to @center_coordinate, notice: 'Center coordinate was successfully created.' }
        format.json { render json: @center_coordinate, status: :created, location: @center_coordinate }
      else
        format.html { render action: "new" }
        format.json { render json: @center_coordinate.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /center_coordinates/1
  # PUT /center_coordinates/1.json
  def update
    @center_coordinate = CenterCoordinate.find(params[:id])

    respond_to do |format|
      if @center_coordinate.update_attributes(params[:center_coordinate])
        format.html { redirect_to @center_coordinate, notice: 'Center coordinate was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @center_coordinate.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /center_coordinates/1
  # DELETE /center_coordinates/1.json
  def destroy
    @center_coordinate = CenterCoordinate.find(params[:id])
    @center_coordinate.destroy

    respond_to do |format|
      format.html { redirect_to center_coordinates_url }
      format.json { head :no_content }
    end
  end
end
