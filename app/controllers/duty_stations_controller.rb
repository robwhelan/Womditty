class DutyStationsController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource
  # GET /duty_stations
  # GET /duty_stations.json
  def index
    @duty_stations = DutyStation.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @duty_stations }
    end
  end

  # GET /duty_stations/1
  # GET /duty_stations/1.json
  def show
    @duty_station = DutyStation.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @duty_station }
    end
  end

  # GET /duty_stations/new
  # GET /duty_stations/new.json
  def new
    @duty_station = DutyStation.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @duty_station }
    end
  end

  # GET /duty_stations/1/edit
  def edit
    @duty_station = DutyStation.find(params[:id])
  end

  # POST /duty_stations
  # POST /duty_stations.json
  def create
    @duty_station = DutyStation.new(params[:duty_station])

    respond_to do |format|
      if @duty_station.save
        format.html { redirect_to @duty_station, notice: 'Duty station was successfully created.' }
        format.json { render json: @duty_station, status: :created, location: @duty_station }
      else
        format.html { render action: "new" }
        format.json { render json: @duty_station.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /duty_stations/1
  # PUT /duty_stations/1.json
  def update
    @duty_station = DutyStation.find(params[:id])

    respond_to do |format|
      if @duty_station.update_attributes(params[:duty_station])
        format.html { redirect_to @duty_station, notice: 'Duty station was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @duty_station.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /duty_stations/1
  # DELETE /duty_stations/1.json
  def destroy
    @duty_station = DutyStation.find(params[:id])
    @duty_station.destroy

    respond_to do |format|
      format.html { redirect_to duty_stations_url }
      format.json { head :no_content }
    end
  end
end
