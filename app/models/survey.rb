class Survey < ActiveRecord::Base

belongs_to :city
belongs_to :user
#before_save :create_city_from_name
before_save :trim_place_names

def create_city_from_name
  create_city(:name => new_city_name) unless new_city_name.blank?
end

attr_accessible :date_restaurant_1, :date_restaurant_2, :date_restaurant_3, :lunch_restaurant_1, :lunch_restaurant_2, :lunch_restaurant_3, :date_night_1, :date_night_2, :date_night_3, :public_place_1, :public_place_2, :public_place_3, :do_for_fun_1, :do_for_fun_2, :do_for_fun_3, :cultural_things_1, :cultural_things_2, :cultural_things_3, :doctor_obgyn, :doctor_pediatrician, :doctor_general, :doctor_chiropractor, :doctor_earnosethroat, :doctor_vet, :doctor_other, :deliver_baby_1, :deliver_baby_2, :deliver_baby_3, :childcare_1, :childcare_2, :childcare_3, :babysitter_pay, :family_restaurant_1, :family_restaurant_2, :family_restaurant_3, :family_restaurant_4, :family_restaurant_5, :kid_activity_1, :kid_activity_2, :kid_activity_3, :kid_activity_4, :kid_activity_5, :good_school_1, :good_school_2, :good_school_3, :bad_school_1, :bad_school_2, :bad_school_3, :contact_gymnastics, :contact_dance, :contact_karate, :contact_ballet, :contact_baseball, :contact_basketball, :contact_soccer, :contact_football, :contact_lacrosse, :contact_music, :contact_art, :contact_swimming, :contact_any_other_kid_stuff, :gym_1, :gym_2, :gym_3, :religious_1, :religious_2, :religious_3, :bad_area_1, :bad_area_2, :bad_area_3, :good_area_1, :good_area_2, :good_area_3, :bad_traffic_1, :bad_traffic_2, :bad_traffic_3, :good_commute_1, :good_commute_2, :good_commute_3, :apt_complex_1, :apt_complex_2, :apt_complex_3, :cost_of_living, :employers_military_1, :employers_military_2, :employers_military_3, :schools_military_1, :schools_military_2, :schools_military_3, :involved_strollers, :involved_mops, :involved_volunteering, :involved_breastfeeding, :involved_cooking_class, :involved_group_fitness, :involved_political, :involved_base_or_command, :grocery_store_1, :grocery_store_2, :grocery_store_3, :drug_store_1, :drug_store_2, :drug_store_3, :walmart_1, :walmart_2, :walmart_3, :hairdresser_1, :hairdresser_2, :hairdresser_3, :spa_1, :spa_2, :spa_3, :nail_place_1, :nail_place_2, :nail_place_3, :coffee, :dry_cleaner, :fast_food, :hardware, :craft, :office, :clothing, :shoe, :pet, :handyman, :cell_phone_provider, :cable_provider, :monthly_cable_bill, :electric_company, :monthly_electrical_bill, :gas_company, :monthly_gas_bill, :hows_the_traffic, :hows_the_drivers, :weather_winter, :weather_spring, :weather_summer, :weather_fall, :city_id, :neighborhood, :zipcode, :education_level, :gender, :self_military_employment, :self_branch, :self_command, :self_commute, :self_rank, :self_marital_status, :spouse_military_employment, :spouse_branch, :spouse_command, :spouse_commute, :spouse_rank, :annual_household_income, :kid_status, :kid_number, :own_or_rent, :square_feet_rental, :square_feet_house, :mothly_rent, :recommend_rent_or_buy, :nearby_home_value, :age_of_homes, :yard_size, :is_there_POA, :POA_behavior, :subdivision, :car_gas_expense, :survey_start_at, :survey_complete_at, :survey_duration, :self_rank_class, :spouse_rank_class, :whats_missing_fun, :whats_missing_family, :whats_missing_community, :whats_missing_practical, 
:whats_missing_demographics, :user_id, :new_city_name, :cell_phone_reception, :email, :first_name, :last_name, :doctor_eye_care, :car_care, :good_bar_1, :good_bar_2, :good_bar_3, :contact_tennis, :contact_golf, :contact_boyscouts, :contact_girlscouts, :contact_language


def self.rank_responses(surveys, action_1, action_2=nil, action_3=nil, action_4=nil, action_5=nil)
  counts = Hash.new 0
  places = []

  surveys.each do |survey|
    places << survey.send(action_1)
    places << survey.send(action_2) unless action_2.nil?
    places << survey.send(action_3) unless action_3.nil?
    places << survey.send(action_4) unless action_4.nil?
    places << survey.send(action_5) unless action_5.nil?
  end

  places.each do |place|
    counts[place] += 1
  end
  
  counts = counts.sort_by{|k,v| v}.reverse
  
  return counts
end

def self.average_responses(surveys, action)
  array = []
  surveys.each do |survey|
    array << survey.send(action)
  end
  
  number = array.inject(:+).to_f / array.size #calculate average
  return number
end
    

def trim_place_names

  self.contact_gymnastics = self.contact_gymnastics.partition(',').first
  self.contact_dance = self.contact_dance.partition(',').first
  self.contact_karate = self.contact_karate.partition(',').first
  self.contact_ballet = self.contact_ballet.partition(',').first
  self.contact_baseball = self.contact_baseball.partition(',').first
  self.contact_basketball = self.contact_basketball.partition(',').first
  self.contact_soccer = self.contact_soccer.partition(',').first
  self.contact_football = self.contact_football.partition(',').first
  self.contact_lacrosse = self.contact_lacrosse.partition(',').first
  self.contact_music = self.contact_music.partition(',').first
  self.contact_art = self.contact_art.partition(',').first
  self.contact_swimming = self.contact_swimming.partition(',').first
  self.contact_any_other_kid_stuff = self.contact_any_other_kid_stuff.partition(',').first
  self.contact_tennis = self.contact_tennis.partition(',').first
  self.contact_golf = self.contact_golf.partition(',').first
  self.contact_boyscouts = self.contact_boyscouts.partition(',').first
  self.contact_girlscouts = self.contact_girlscouts.partition(',').first
  self.contact_language = self.contact_language.partition(',').first

end

end
