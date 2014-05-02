class EngagementsController < ApplicationController
  #before_filter :authenticate_vendor!, :only => [:index, :show]
  # GET /engagements
  # GET /engagements.json
  def index
    @engagements = Engagement.where(:vendor_id => 1)

    @bio_views = @engagements.where(:engagement_type => 'view' ).count
    @emails = @engagements.where(:engagement_type => 'email' ).count
    @chats = @engagements.where(:engagement_type => 'chat' ).count
    @phone_calls = @engagements.where(:engagement_type => 'phone' ).count
    @coupons = @engagements.where(:engagement_type => 'coupon' ).count
    @site_visits = @engagements.where(:engagement_type => 'site' ).count
    @map_visits = @engagements.where(:engagement_type => 'map' ).count

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @engagements }
    end
  end

  # GET /engagements/1
  # GET /engagements/1.json
  def show
    @engagement = Engagement.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @engagement }
    end
  end

  # GET /engagements/new
  # GET /engagements/new.json
  def new
    @engagement = Engagement.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @engagement }
    end
  end

  # GET /engagements/1/edit
  def edit
    @engagement = Engagement.find(params[:id])
  end

  # POST /engagements
  # POST /engagements.json
  def create
    @engagement = Engagement.new(:engagement_type => params[:engagement_type], :vendor_id => params[:vendor_id])
    @engagement.save
    render :nothing => true
  end

  # PUT /engagements/1
  # PUT /engagements/1.json
  def update
    @engagement = Engagement.find(params[:id])

    respond_to do |format|
      if @engagement.update_attributes(params[:engagement])
        format.html { redirect_to @engagement, notice: 'Engagement was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @engagement.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /engagements/1
  # DELETE /engagements/1.json
  def destroy
    @engagement = Engagement.find(params[:id])
    @engagement.destroy

    respond_to do |format|
      format.html { redirect_to engagements_url }
      format.json { head :no_content }
    end
  end
end
