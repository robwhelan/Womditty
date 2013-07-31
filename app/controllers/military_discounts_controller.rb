class MilitaryDiscountsController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource
  # GET /military_discounts
  # GET /military_discounts.json
  def index

    if user_signed_in?
      if current_user.neighborhood.nil? or current_user.duty_station.nil? or current_user.drive_time.nil? or current_user.member_rank.nil?
        @profile_incomplete = true
      end
      
      @military_discounts = MilitaryDiscount.all
      @user = current_user
    else
      @military_discounts = MilitaryDiscount.limit(5)
    end
    
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @military_discounts }
    end
  end

  # GET /military_discounts/1
  # GET /military_discounts/1.json
  def show
    @military_discount = MilitaryDiscount.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @military_discount }
    end
  end

  # GET /military_discounts/new
  # GET /military_discounts/new.json
  def new
    if params[:place]
      @place = Place.find(params[:place])
    end

    @military_discount = MilitaryDiscount.new
    
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @military_discount }
    end
  end

  # GET /military_discounts/1/edit
  def edit
    if params[:place]
      @place = Place.find(params[:place])
    else 
      @place = Place
    end
    @military_discount = MilitaryDiscount.find(params[:id])
  end

  # POST /military_discounts
  # POST /military_discounts.json
  def create
    @military_discount = MilitaryDiscount.new(params[:military_discount])

    respond_to do |format|
      if @military_discount.save
        format.html { redirect_to @military_discount, notice: 'Military discount was successfully created.' }
        format.json { render json: @military_discount, status: :created, location: @military_discount }
      else
        format.html { render action: "new" }
        format.json { render json: @military_discount.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /military_discounts/1
  # PUT /military_discounts/1.json
  def update
    @military_discount = MilitaryDiscount.find(params[:id])

    respond_to do |format|
      if @military_discount.update_attributes(params[:military_discount])
        format.html { redirect_to @military_discount, notice: 'Military discount was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @military_discount.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /military_discounts/1
  # DELETE /military_discounts/1.json
  def destroy
    @military_discount = MilitaryDiscount.find(params[:id])
    @military_discount.destroy

    respond_to do |format|
      format.html { redirect_to military_discounts_url }
      format.json { head :no_content }
    end
  end

  def vote_up
    begin
      @vote = current_user.vote_for(@military_discount = MilitaryDiscount.find(params[:id]))
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
      @vote = current_user.vote_against(@military_discount = MilitaryDiscount.find(params[:id]))
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