class CareerSpecialtiesController < ApplicationController

  before_filter :authenticate_user!
  load_and_authorize_resource

  # GET /career_specialties
  # GET /career_specialties.json
  def index
    @career_specialties = CareerSpecialty.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @career_specialties }
    end
  end

  # GET /career_specialties/1
  # GET /career_specialties/1.json
  def show
    @career_specialty = CareerSpecialty.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @career_specialty }
    end
  end

  # GET /career_specialties/new
  # GET /career_specialties/new.json
  def new
    @career_specialty = CareerSpecialty.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @career_specialty }
    end
  end

  # GET /career_specialties/1/edit
  def edit
    @career_specialty = CareerSpecialty.find(params[:id])
  end

  # POST /career_specialties
  # POST /career_specialties.json
  def create
    @career_specialty = CareerSpecialty.new(params[:career_specialty])

    respond_to do |format|
      if @career_specialty.save
        format.html { redirect_to @career_specialty, notice: 'Career specialty was successfully created.' }
        format.json { render json: @career_specialty, status: :created, location: @career_specialty }
      else
        format.html { render action: "new" }
        format.json { render json: @career_specialty.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /career_specialties/1
  # PUT /career_specialties/1.json
  def update
    @career_specialty = CareerSpecialty.find(params[:id])

    respond_to do |format|
      if @career_specialty.update_attributes(params[:career_specialty])
        format.html { redirect_to @career_specialty, notice: 'Career specialty was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @career_specialty.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /career_specialties/1
  # DELETE /career_specialties/1.json
  def destroy
    @career_specialty = CareerSpecialty.find(params[:id])
    @career_specialty.destroy

    respond_to do |format|
      format.html { redirect_to career_specialties_url }
      format.json { head :no_content }
    end
  end
end
