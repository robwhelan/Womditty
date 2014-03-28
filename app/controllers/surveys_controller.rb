class SurveysController < ApplicationController

  before_filter :authenticate_user!, :except => [:new, :create, :show]  

  # GET /surveys
  # GET /surveys.json
  def index
    @surveys = Survey.all

    #fun
    @date_restaurants = Survey.rank_responses(@surveys, "date_restaurant_1", "date_restaurant_2", "date_restaurant_3")
    @lunch_restaurants = Survey.rank_responses(@surveys, "lunch_restaurant_1", "lunch_restaurant_2", "lunch_restaurant_3")
    @date_nights = Survey.rank_responses(@surveys, "date_night_1", "date_night_2", "date_night_3")
    @public_places = Survey.rank_responses(@surveys, "public_place_1", "public_place_2", "public_place_3")
    @do_for_funs = Survey.rank_responses(@surveys, "do_for_fun_1", "do_for_fun_2", "do_for_fun_3")
    @cultural_things = Survey.rank_responses(@surveys, "cultural_things_1", "cultural_things_2", "cultural_things_3")

    #family
    @doctor_obgyns = Survey.rank_responses(@surveys, "doctor_obgyn")
    @doctor_pediatricians = Survey.rank_responses(@surveys, "doctor_pediatrician")
    @doctor_generals = Survey.rank_responses(@surveys, "doctor_general")
    @doctor_chiropractors = Survey.rank_responses(@surveys, "doctor_chiropractor")
    @doctor_earnosethroats = Survey.rank_responses(@surveys, "doctor_earnosethroat")
    @doctor_vets = Survey.rank_responses(@surveys, "doctor_vet")
    @doctor_others = Survey.rank_responses(@surveys, "doctor_other")

    @deliver_babies = Survey.rank_responses(@surveys, "deliver_baby_1", "deliver_baby_2", "deliver_baby_3")
    @childcares = Survey.rank_responses(@surveys, "childcare_1", "childcare_2", "childcare_3")
    @babysitter_pays = Survey.rank_responses(@surveys, "babysitter_pay")
    
    @family_restaurants = Survey.rank_responses(@surveys, "family_restaurant_1", "family_restaurant_2", "family_restaurant_3", "family_restaurant_4", "family_restaurant_5")
    @kid_activities = Survey.rank_responses(@surveys, "kid_activity_1", "kid_activity_2", "kid_activity_3", "kid_activity_4", "kid_activity_5")
    @good_schools = Survey.rank_responses(@surveys, "good_school_1", "good_school_2", "good_school_3")
    @bad_schools = Survey.rank_responses(@surveys, "bad_school_1", "bad_school_2", "bad_school_3")
    
    @contact_gymnastics = Survey.rank_responses(@surveys, "contact_gymnastics")
    @contact_dance = Survey.rank_responses(@surveys, "contact_dance")
    @contact_karate = Survey.rank_responses(@surveys, "contact_karate")
    @contact_ballet = Survey.rank_responses(@surveys, "contact_ballet")
    @contact_baseball = Survey.rank_responses(@surveys, "contact_baseball")
    @contact_basketball = Survey.rank_responses(@surveys, "contact_basketball")
    @contact_soccer = Survey.rank_responses(@surveys, "contact_soccer")
    @contact_football = Survey.rank_responses(@surveys, "contact_football")
    @contact_lacrosse = Survey.rank_responses(@surveys, "contact_lacrosse")
    @contact_music = Survey.rank_responses(@surveys, "contact_music")
    @contact_art = Survey.rank_responses(@surveys, "contact_art")
    @contact_swimming = Survey.rank_responses(@surveys, "contact_swimming")
    @contact_any_other_kid_stuff = Survey.rank_responses(@surveys, "contact_any_other_kid_stuff")

    #community
    @gyms = Survey.rank_responses(@surveys, "gym_1", "gym_2", "gym_3")
    @religious = Survey.rank_responses(@surveys, "religious_1", "religious_2", "religious_3")
    @good_areas = Survey.rank_responses(@surveys, "good_area_1", "good_area_2", "good_area_3")
    @bad_areas = Survey.rank_responses(@surveys, "bad_area_1", "bad_area_2", "bad_area_3")
    @bad_traffic = Survey.rank_responses(@surveys, "bad_traffic_1", "bad_traffic_2", "bad_traffic_3")
    @good_commutes = Survey.rank_responses(@surveys, "good_commute_1", "good_commute_2", "good_commute_3")
    @apt_complexes = Survey.rank_responses(@surveys, "apt_complex_1", "apt_complex_2", "apt_complex_3")
    @cost_of_livings = Survey.rank_responses(@surveys, "cost_of_living")
    @employers_military = Survey.rank_responses(@surveys, "employers_military_1", "employers_military_2", "employers_military_3")
    @schools_military = Survey.rank_responses(@surveys, "schools_military_1", "schools_military_2", "schools_military_3")
    @involved_strollers = Survey.rank_responses(@surveys, "involved_strollers")
    @involved_mops = Survey.rank_responses(@surveys, "involved_mops")
    @involved_volunteering = Survey.rank_responses(@surveys, "involved_volunteering")
    @involved_breastfeeding = Survey.rank_responses(@surveys, "involved_breastfeeding")
    @involved_cooking_class = Survey.rank_responses(@surveys, "involved_cooking_class")
    @involved_group_fitness = Survey.rank_responses(@surveys, "involved_group_fitness")
    @involved_political = Survey.rank_responses(@surveys, "involved_political")
    @involved_base_or_command = Survey.rank_responses(@surveys, "involved_base_or_command")

    #practical
    @grocery_stores = Survey.rank_responses(@surveys, "grocery_store_1", "grocery_store_2", "grocery_store_3")
    @drug_stores = Survey.rank_responses(@surveys, "drug_store_1", "drug_store_2", "drug_store_3")
    @walmarts = Survey.rank_responses(@surveys, "walmart_1", "walmart_2", "walmart_3")
    @hairdressers = Survey.rank_responses(@surveys, "hairdresser_1", "hairdresser_2", "hairdresser_3")
    @spas = Survey.rank_responses(@surveys, "spa_1", "spa_2", "spa_3")
    @nail_places = Survey.rank_responses(@surveys, "nail_place_1", "nail_place_2", "nail_place_3")

    @coffee = Survey.rank_responses(@surveys, "coffee")
    @fast_food = Survey.rank_responses(@surveys, "fast_food")
    @dry_cleaner = Survey.rank_responses(@surveys, "dry_cleaner")
    @hardware = Survey.rank_responses(@surveys, "hardware")
    @handyman = Survey.rank_responses(@surveys, "handyman")
    @craft = Survey.rank_responses(@surveys, "craft")
    @office = Survey.rank_responses(@surveys, "office")
    @clothing = Survey.rank_responses(@surveys, "clothing")
    @shoe = Survey.rank_responses(@surveys, "shoe")
    @pet = Survey.rank_responses(@surveys, "pet")

    @cable_provider = Survey.rank_responses(@surveys, "cable_provider")
    @cable_bill = Survey.average("monthly_cable_bill")
    @electric_company = Survey.rank_responses(@surveys, "electric_company")
    @electric_bill = Survey.average("monthly_electrical_bill")
    @gas_company = Survey.rank_responses(@surveys, "gas_company")
    @gas_bill = Survey.average("monthly_gas_bill")
    @cell_phone_provider = Survey.rank_responses(@surveys, "cell_phone_provider")
    @cell_phone_reception = Survey.rank_responses(@surveys, "cell_phone_reception")
    
    @hows_the_traffic = Survey.rank_responses(@surveys, "hows_the_traffic")
    @hows_the_drivers = Survey.rank_responses(@surveys, "hows_the_drivers")
    @weather_winter = Survey.rank_responses(@surveys, "weather_winter")
    @weather_spring = Survey.rank_responses(@surveys, "weather_spring")
    @weather_summer = Survey.rank_responses(@surveys, "weather_summer")
    @weather_fall = Survey.rank_responses(@surveys, "weather_fall")
    
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @surveys }
    end
  end

  # GET /surveys/1
  # GET /surveys/1.json
  def show
    @survey = Survey.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @survey }
    end
  end

  # GET /surveys/new
  # GET /surveys/new.json
  def new
    @survey = Survey.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @survey }
    end
  end

  # GET /surveys/1/edit
  def edit
    @survey = Survey.find(params[:id])
  end

  # POST /surveys
  # POST /surveys.json
  def create
    @survey = Survey.new(params[:survey])

    respond_to do |format|
      if @survey.save
        format.html { redirect_to @survey, notice: 'Survey was successfully created.' }
        format.json { render json: @survey, status: :created, location: @survey }
      else
        format.html { render action: "new" }
        format.json { render json: @survey.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /surveys/1
  # PUT /surveys/1.json
  def update
    @survey = Survey.find(params[:id])

    respond_to do |format|
      if @survey.update_attributes(params[:survey])
        format.html { redirect_to @survey, notice: 'Survey was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @survey.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /surveys/1
  # DELETE /surveys/1.json
  def destroy
    @survey = Survey.find(params[:id])
    @survey.destroy

    respond_to do |format|
      format.html { redirect_to surveys_url }
      format.json { head :no_content }
    end
  end
  
  def pre_save_email
    PreEmail.create(:email => params[:email])
    render :nothing => true
  end
  
end
