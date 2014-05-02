# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140502003904) do

  create_table "activities", :force => true do |t|
    t.integer  "trackable_id"
    t.string   "trackable_type"
    t.integer  "owner_id"
    t.string   "owner_type"
    t.string   "key"
    t.text     "parameters"
    t.integer  "recipient_id"
    t.string   "recipient_type"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  add_index "activities", ["owner_id", "owner_type"], :name => "index_activities_on_owner_id_and_owner_type"
  add_index "activities", ["recipient_id", "recipient_type"], :name => "index_activities_on_recipient_id_and_recipient_type"
  add_index "activities", ["trackable_id", "trackable_type"], :name => "index_activities_on_trackable_id_and_trackable_type"

  create_table "career_specialties", :force => true do |t|
    t.string   "name"
    t.integer  "military_branch_id"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  add_index "career_specialties", ["military_branch_id"], :name => "index_career_specialties_on_military_branch_id"

  create_table "center_coordinates", :force => true do |t|
    t.float    "lat"
    t.float    "lng"
    t.integer  "neighborhood_id"
    t.integer  "place_id"
    t.integer  "city_id"
    t.integer  "duty_station_id"
    t.integer  "photo_id"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "center_coordinates", ["city_id"], :name => "index_center_coordinates_on_city_id"
  add_index "center_coordinates", ["duty_station_id"], :name => "index_center_coordinates_on_duty_station_id"
  add_index "center_coordinates", ["neighborhood_id"], :name => "index_center_coordinates_on_neighborhood_id"
  add_index "center_coordinates", ["photo_id"], :name => "index_center_coordinates_on_photo_id"
  add_index "center_coordinates", ["place_id"], :name => "index_center_coordinates_on_place_id"

  create_table "cities", :force => true do |t|
    t.string   "name"
    t.string   "state"
    t.string   "country"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "comments", :force => true do |t|
    t.text     "body"
    t.integer  "place_id"
    t.integer  "review_id"
    t.integer  "photo_id"
    t.integer  "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "comments", ["photo_id"], :name => "index_comments_on_photo_id"
  add_index "comments", ["place_id"], :name => "index_comments_on_place_id"
  add_index "comments", ["review_id"], :name => "index_comments_on_review_id"
  add_index "comments", ["user_id"], :name => "index_comments_on_user_id"

  create_table "coordinates", :force => true do |t|
    t.integer  "neighborhood_id"
    t.integer  "city_id"
    t.integer  "place_id"
    t.integer  "duty_station_id"
    t.integer  "coordinate_number"
    t.float    "lat"
    t.float    "lng"
    t.float    "lat_center"
    t.float    "lng_center"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

  add_index "coordinates", ["city_id"], :name => "index_coordinates_on_city_id"
  add_index "coordinates", ["duty_station_id"], :name => "index_coordinates_on_duty_station_id"
  add_index "coordinates", ["neighborhood_id"], :name => "index_coordinates_on_neighborhood_id"
  add_index "coordinates", ["place_id"], :name => "index_coordinates_on_place_id"

  create_table "duty_stations", :force => true do |t|
    t.string   "name"
    t.integer  "city_id"
    t.integer  "military_branch_id"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  add_index "duty_stations", ["city_id"], :name => "index_duty_stations_on_city_id"
  add_index "duty_stations", ["military_branch_id"], :name => "index_duty_stations_on_military_branch_id"

  create_table "email_signups", :force => true do |t|
    t.string   "email"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "engagements", :force => true do |t|
    t.integer  "vendor_id"
    t.string   "engagement_type"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "engagements", ["vendor_id"], :name => "index_engagements_on_vendor_id"

  create_table "follows", :force => true do |t|
    t.integer  "followable_id",                      :null => false
    t.string   "followable_type",                    :null => false
    t.integer  "follower_id",                        :null => false
    t.string   "follower_type",                      :null => false
    t.boolean  "blocked",         :default => false, :null => false
    t.datetime "created_at",                         :null => false
    t.datetime "updated_at",                         :null => false
  end

  add_index "follows", ["followable_id", "followable_type"], :name => "fk_followables"
  add_index "follows", ["follower_id", "follower_type"], :name => "fk_follows"

  create_table "forums", :force => true do |t|
    t.string   "name"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
    t.string   "unique_identifier"
  end

  create_table "group_memberships", :force => true do |t|
    t.integer  "user_id"
    t.integer  "group_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "group_memberships", ["group_id"], :name => "index_group_memberships_on_group_id"
  add_index "group_memberships", ["user_id"], :name => "index_group_memberships_on_user_id"

  create_table "groups", :force => true do |t|
    t.string   "name"
    t.integer  "forum_id"
    t.datetime "created_at",                           :null => false
    t.datetime "updated_at",                           :null => false
    t.string   "unique_identifier"
    t.boolean  "private_group",     :default => false
  end

  add_index "groups", ["forum_id"], :name => "index_groups_on_forum_id"

  create_table "hosts", :force => true do |t|
    t.integer  "user_id"
    t.integer  "neighborhood_id"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "hosts", ["neighborhood_id"], :name => "index_hosts_on_neighborhood_id"
  add_index "hosts", ["user_id"], :name => "index_hosts_on_user_id"

  create_table "inquiries", :force => true do |t|
    t.string   "rank"
    t.string   "command"
    t.integer  "number_of_people"
    t.integer  "number_of_bedrooms"
    t.date     "move_date"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "phone_number"
    t.integer  "user_id"
    t.integer  "vendor_id"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  add_index "inquiries", ["user_id"], :name => "index_inquiries_on_user_id"
  add_index "inquiries", ["vendor_id"], :name => "index_inquiries_on_vendor_id"

  create_table "military_branches", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "military_discounts", :force => true do |t|
    t.string   "description"
    t.integer  "place_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "military_discounts", ["place_id"], :name => "index_military_discounts_on_place_id"

  create_table "neighborhood_thoughts", :force => true do |t|
    t.integer  "user_id"
    t.integer  "neighborhood_id"
    t.string   "community_amenities", :default => ""
    t.string   "cost_of_living",      :default => ""
    t.string   "crime",               :default => ""
    t.string   "grocery_stores",      :default => ""
    t.string   "lifestyle",           :default => ""
    t.string   "night_life",          :default => ""
    t.string   "noise",               :default => ""
    t.string   "pets",                :default => ""
    t.string   "shopping",            :default => ""
    t.string   "kids",                :default => ""
    t.string   "traffic",             :default => ""
    t.string   "walkability",         :default => ""
    t.string   "not_love",            :default => ""
    t.string   "love",                :default => ""
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
    t.string   "schools",             :default => ""
    t.string   "housing",             :default => ""
    t.string   "restaurants",         :default => ""
  end

  add_index "neighborhood_thoughts", ["neighborhood_id"], :name => "index_neighborhood_thoughts_on_neighborhood_id"
  add_index "neighborhood_thoughts", ["user_id"], :name => "index_neighborhood_thoughts_on_user_id"

  create_table "neighborhood_topics", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "neighborhoods", :force => true do |t|
    t.string   "name"
    t.integer  "city_id"
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
    t.integer  "review_id"
    t.string   "community_amenities_file_name"
    t.string   "community_amenities_content_type"
    t.integer  "community_amenities_file_size"
    t.datetime "community_amenities_updated_at"
    t.string   "grocery_stores_file_name"
    t.string   "grocery_stores_content_type"
    t.integer  "grocery_stores_file_size"
    t.datetime "grocery_stores_updated_at"
    t.string   "kids_file_name"
    t.string   "kids_content_type"
    t.integer  "kids_file_size"
    t.datetime "kids_updated_at"
    t.string   "lifestyle_file_name"
    t.string   "lifestyle_content_type"
    t.integer  "lifestyle_file_size"
    t.datetime "lifestyle_updated_at"
    t.string   "love_file_name"
    t.string   "love_content_type"
    t.integer  "love_file_size"
    t.datetime "love_updated_at"
    t.string   "noise_file_name"
    t.string   "noise_content_type"
    t.integer  "noise_file_size"
    t.datetime "noise_updated_at"
    t.string   "pets_file_name"
    t.string   "pets_content_type"
    t.integer  "pets_file_size"
    t.datetime "pets_updated_at"
    t.string   "schools_file_name"
    t.string   "schools_content_type"
    t.integer  "schools_file_size"
    t.datetime "schools_updated_at"
    t.string   "shopping_file_name"
    t.string   "shopping_content_type"
    t.integer  "shopping_file_size"
    t.datetime "shopping_updated_at"
    t.string   "traffic_file_name"
    t.string   "traffic_content_type"
    t.integer  "traffic_file_size"
    t.datetime "traffic_updated_at"
    t.string   "walkability_file_name"
    t.string   "walkability_content_type"
    t.integer  "walkability_file_size"
    t.datetime "walkability_updated_at"
    t.string   "housing_file_name"
    t.string   "housing_content_type"
    t.integer  "housing_file_size"
    t.datetime "housing_updated_at"
    t.string   "restaurants_file_name"
    t.string   "restaurants_content_type"
    t.integer  "restaurants_file_size"
    t.datetime "restaurants_updated_at"
    t.string   "population_density"
    t.string   "household_income"
    t.string   "education_level"
    t.string   "drive_time"
    t.string   "consumer_price"
    t.string   "house_value"
  end

  add_index "neighborhoods", ["city_id"], :name => "index_neighborhoods_on_city_id"

  create_table "photos", :force => true do |t|
    t.string   "image_url"
    t.integer  "place_id"
    t.integer  "neighborhood_id"
    t.integer  "user_id"
    t.integer  "city_id"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "post_id"
    t.integer  "answer_id"
  end

  add_index "photos", ["answer_id"], :name => "index_photos_on_answer_id"
  add_index "photos", ["city_id"], :name => "index_photos_on_city_id"
  add_index "photos", ["neighborhood_id"], :name => "index_photos_on_neighborhood_id"
  add_index "photos", ["place_id"], :name => "index_photos_on_place_id"
  add_index "photos", ["post_id"], :name => "index_photos_on_post_id"
  add_index "photos", ["user_id"], :name => "index_photos_on_user_id"

  create_table "places", :force => true do |t|
    t.string   "name"
    t.string   "address_line1"
    t.string   "address_line2"
    t.integer  "neighborhood_id"
    t.integer  "city_id"
    t.integer  "zip_code"
    t.float    "xgps"
    t.float    "ygps"
    t.string   "place_type"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.string   "google_place_id"
  end

  add_index "places", ["city_id"], :name => "index_places_on_city_id"
  add_index "places", ["neighborhood_id"], :name => "index_places_on_neighborhood_id"

  create_table "posts", :force => true do |t|
    t.string   "title"
    t.text     "body"
    t.integer  "likes",           :default => 0
    t.integer  "user_id"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
    t.integer  "place_id"
    t.integer  "neighborhood_id", :default => 0
    t.integer  "group_id"
    t.string   "post_type",       :default => ""
    t.text     "place_reference", :default => ""
  end

  add_index "posts", ["group_id"], :name => "index_posts_on_group_id"
  add_index "posts", ["neighborhood_id"], :name => "index_posts_on_neighborhood_id"
  add_index "posts", ["place_id"], :name => "index_posts_on_place_id"
  add_index "posts", ["user_id"], :name => "index_posts_on_user_id"

  create_table "pre_emails", :force => true do |t|
    t.string   "email"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "read_marks", :force => true do |t|
    t.integer  "readable_id"
    t.integer  "user_id",                     :null => false
    t.string   "readable_type", :limit => 20, :null => false
    t.datetime "timestamp"
  end

  add_index "read_marks", ["user_id", "readable_type", "readable_id"], :name => "index_read_marks_on_user_id_and_readable_type_and_readable_id"

  create_table "reviews", :force => true do |t|
    t.text     "body"
    t.integer  "rating"
    t.integer  "place_id"
    t.integer  "user_id"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.integer  "neighborhood_id"
  end

  add_index "reviews", ["neighborhood_id"], :name => "index_reviews_on_neighborhood_id"
  add_index "reviews", ["place_id"], :name => "index_reviews_on_place_id"
  add_index "reviews", ["user_id"], :name => "index_reviews_on_user_id"

  create_table "survey_translations", :force => true do |t|
    t.integer  "survey_id"
    t.string   "locale"
    t.text     "translation"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "surveys", :force => true do |t|
    t.integer  "user_id"
    t.string   "date_restaurant_1"
    t.string   "date_restaurant_2"
    t.string   "date_restaurant_3"
    t.string   "lunch_restaurant_1"
    t.string   "lunch_restaurant_2"
    t.string   "lunch_restaurant_3"
    t.string   "date_night_1"
    t.string   "date_night_2"
    t.string   "date_night_3"
    t.string   "public_place_1"
    t.string   "public_place_2"
    t.string   "public_place_3"
    t.string   "do_for_fun_1"
    t.string   "do_for_fun_2"
    t.string   "do_for_fun_3"
    t.string   "cultural_things_1"
    t.string   "cultural_things_2"
    t.string   "cultural_things_3"
    t.string   "doctor_obgyn"
    t.string   "doctor_pediatrician"
    t.string   "doctor_general"
    t.string   "doctor_chiropractor"
    t.string   "doctor_earnosethroat"
    t.string   "doctor_vet"
    t.string   "doctor_other"
    t.string   "deliver_baby_1"
    t.string   "deliver_baby_2"
    t.string   "deliver_baby_3"
    t.string   "childcare_1"
    t.string   "childcare_2"
    t.string   "childcare_3"
    t.string   "babysitter_pay"
    t.string   "family_restaurant_1"
    t.string   "family_restaurant_2"
    t.string   "family_restaurant_3"
    t.string   "family_restaurant_4"
    t.string   "family_restaurant_5"
    t.string   "kid_activity_1"
    t.string   "kid_activity_2"
    t.string   "kid_activity_3"
    t.string   "kid_activity_4"
    t.string   "kid_activity_5"
    t.string   "good_school_1"
    t.string   "good_school_2"
    t.string   "good_school_3"
    t.string   "bad_school_1"
    t.string   "bad_school_2"
    t.string   "bad_school_3"
    t.string   "contact_gymnastics"
    t.string   "contact_dance"
    t.string   "contact_karate"
    t.string   "contact_ballet"
    t.string   "contact_baseball"
    t.string   "contact_basketball"
    t.string   "contact_soccer"
    t.string   "contact_football"
    t.string   "contact_lacrosse"
    t.string   "contact_music"
    t.string   "contact_art"
    t.string   "contact_swimming"
    t.string   "contact_any_other_kid_stuff"
    t.string   "gym_1"
    t.string   "gym_2"
    t.string   "gym_3"
    t.string   "religious_1"
    t.string   "religious_2"
    t.string   "religious_3"
    t.string   "bad_area_1"
    t.string   "bad_area_2"
    t.string   "bad_area_3"
    t.string   "good_area_1"
    t.string   "good_area_2"
    t.string   "good_area_3"
    t.string   "bad_traffic_1"
    t.string   "bad_traffic_2"
    t.string   "bad_traffic_3"
    t.string   "good_commute_1"
    t.string   "good_commute_2"
    t.string   "good_commute_3"
    t.string   "apt_complex_1"
    t.string   "apt_complex_2"
    t.string   "apt_complex_3"
    t.string   "cost_of_living"
    t.string   "employers_military_1"
    t.string   "employers_military_2"
    t.string   "employers_military_3"
    t.string   "schools_military_1"
    t.string   "schools_military_2"
    t.string   "schools_military_3"
    t.string   "involved_strollers"
    t.string   "involved_mops"
    t.string   "involved_volunteering"
    t.string   "involved_breastfeeding"
    t.string   "involved_cooking_class"
    t.string   "involved_group_fitness"
    t.string   "involved_political"
    t.string   "involved_base_or_command"
    t.string   "grocery_store_1"
    t.string   "grocery_store_2"
    t.string   "grocery_store_3"
    t.string   "drug_store_1"
    t.string   "drug_store_2"
    t.string   "drug_store_3"
    t.string   "walmart_1"
    t.string   "walmart_2"
    t.string   "walmart_3"
    t.string   "hairdresser_1"
    t.string   "hairdresser_2"
    t.string   "hairdresser_3"
    t.string   "spa_1"
    t.string   "spa_2"
    t.string   "spa_3"
    t.string   "nail_place_1"
    t.string   "nail_place_2"
    t.string   "nail_place_3"
    t.string   "coffee"
    t.string   "dry_cleaner"
    t.string   "fast_food"
    t.string   "hardware"
    t.string   "craft"
    t.string   "office"
    t.string   "clothing"
    t.string   "shoe"
    t.string   "pet"
    t.string   "handyman"
    t.string   "cell_phone_provider"
    t.string   "cable_provider"
    t.integer  "monthly_cable_bill"
    t.string   "electric_company"
    t.integer  "monthly_electrical_bill"
    t.string   "gas_company"
    t.integer  "monthly_gas_bill"
    t.string   "hows_the_traffic"
    t.string   "hows_the_drivers"
    t.string   "weather_winter"
    t.string   "weather_spring"
    t.string   "weather_summer"
    t.string   "weather_fall"
    t.integer  "city_id"
    t.string   "neighborhood"
    t.integer  "zipcode"
    t.string   "education_level"
    t.string   "gender"
    t.string   "self_military_employment"
    t.string   "self_branch"
    t.string   "self_command"
    t.integer  "self_commute"
    t.string   "self_rank"
    t.boolean  "self_marital_status"
    t.string   "spouse_military_employment"
    t.string   "spouse_branch"
    t.string   "spouse_command"
    t.integer  "spouse_commute"
    t.string   "spouse_rank"
    t.string   "annual_household_income"
    t.boolean  "kid_status"
    t.integer  "kid_number"
    t.string   "own_or_rent"
    t.integer  "square_feet_rental"
    t.integer  "square_feet_house"
    t.integer  "mothly_rent"
    t.string   "recommend_rent_or_buy"
    t.string   "nearby_home_value"
    t.string   "age_of_homes"
    t.string   "yard_size"
    t.boolean  "is_there_POA"
    t.string   "POA_behavior"
    t.string   "subdivision"
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
    t.string   "car_gas_expense"
    t.datetime "survey_start_at"
    t.datetime "survey_complete_at"
    t.time     "survey_duration"
    t.string   "self_rank_class"
    t.string   "spouse_rank_class"
    t.text     "whats_missing_fun"
    t.text     "whats_missing_family"
    t.text     "whats_missing_community"
    t.text     "whats_missing_practical"
    t.text     "whats_missing_demographics"
    t.string   "new_city_name"
    t.string   "cell_phone_reception"
    t.string   "email"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "doctor_eye_care"
    t.string   "car_care"
    t.string   "good_bar_1"
    t.string   "good_bar_2"
    t.string   "good_bar_3"
  end

  add_index "surveys", ["city_id"], :name => "index_surveys_on_city_id"
  add_index "surveys", ["user_id"], :name => "index_surveys_on_user_id"

  create_table "taggings", :force => true do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.integer  "tagger_id"
    t.string   "tagger_type"
    t.string   "context",       :limit => 128
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id"], :name => "index_taggings_on_tag_id"
  add_index "taggings", ["taggable_id", "taggable_type", "context"], :name => "index_taggings_on_taggable_id_and_taggable_type_and_context"

  create_table "tags", :force => true do |t|
    t.string "name"
  end

  create_table "users", :force => true do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.string   "member_rank"
    t.integer  "number_of_invites"
    t.boolean  "has_kids"
    t.integer  "invited_by_user_id"
    t.string   "role"
    t.string   "profile_image_url"
    t.integer  "city_id"
    t.integer  "career_specialty_id"
    t.integer  "duty_station_id"
    t.integer  "military_branch_id"
    t.integer  "neighborhood_id"
    t.datetime "created_at",                                                                                               :null => false
    t.datetime "updated_at",                                                                                               :null => false
    t.string   "email",                         :default => "",                                                            :null => false
    t.string   "encrypted_password",            :default => "",                                                            :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                 :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "provider"
    t.string   "uid"
    t.string   "name",                          :default => ""
    t.string   "location"
    t.date     "birthday"
    t.string   "profile_image",                 :default => "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
    t.string   "gender"
    t.integer  "drive_time"
    t.integer  "reputation",                    :default => 0
    t.text     "biography",                     :default => ""
    t.string   "airbnb_link",                   :default => ""
    t.boolean  "move_status"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "price_range",                   :default => ""
    t.string   "address_line_1",                :default => ""
    t.string   "address_line_2",                :default => ""
    t.string   "zip_code",                      :default => ""
    t.string   "vendor_type",                   :default => ""
    t.string   "special_photo_01_file_name"
    t.string   "special_photo_01_content_type"
    t.integer  "special_photo_01_file_size"
    t.datetime "special_photo_01_updated_at"
    t.string   "special_photo_02_file_name"
    t.string   "special_photo_02_content_type"
    t.integer  "special_photo_02_file_size"
    t.datetime "special_photo_02_updated_at"
    t.string   "special_photo_03_file_name"
    t.string   "special_photo_03_content_type"
    t.integer  "special_photo_03_file_size"
    t.datetime "special_photo_03_updated_at"
    t.string   "special_photo_04_file_name"
    t.string   "special_photo_04_content_type"
    t.integer  "special_photo_04_file_size"
    t.datetime "special_photo_04_updated_at"
    t.string   "special_photo_05_file_name"
    t.string   "special_photo_05_content_type"
    t.integer  "special_photo_05_file_size"
    t.datetime "special_photo_05_updated_at"
    t.string   "special_photo_06_file_name"
    t.string   "special_photo_06_content_type"
    t.integer  "special_photo_06_file_size"
    t.datetime "special_photo_06_updated_at"
    t.string   "special_photo_07_file_name"
    t.string   "special_photo_07_content_type"
    t.integer  "special_photo_07_file_size"
    t.datetime "special_photo_07_updated_at"
    t.string   "special_photo_08_file_name"
    t.string   "special_photo_08_content_type"
    t.integer  "special_photo_08_file_size"
    t.datetime "special_photo_08_updated_at"
    t.string   "special_photo_09_file_name"
    t.string   "special_photo_09_content_type"
    t.integer  "special_photo_09_file_size"
    t.datetime "special_photo_09_updated_at"
    t.string   "special_photo_10_file_name"
    t.string   "special_photo_10_content_type"
    t.integer  "special_photo_10_file_size"
    t.datetime "special_photo_10_updated_at"
  end

  add_index "users", ["career_specialty_id"], :name => "index_users_on_career_specialty_id"
  add_index "users", ["city_id"], :name => "index_users_on_city_id"
  add_index "users", ["duty_station_id"], :name => "index_users_on_duty_station_id"
  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["military_branch_id"], :name => "index_users_on_military_branch_id"
  add_index "users", ["neighborhood_id"], :name => "index_users_on_neighborhood_id"
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

  create_table "vendors", :force => true do |t|
    t.string   "email",                        :default => "", :null => false
    t.string   "encrypted_password",           :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                                   :null => false
    t.datetime "updated_at",                                   :null => false
    t.string   "first_name",                   :default => ""
    t.string   "last_name",                    :default => ""
    t.string   "profession",                   :default => ""
    t.string   "company",                      :default => ""
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "business_name"
    t.string   "address_line_1"
    t.string   "address_line_2"
    t.string   "zip_code"
    t.string   "phone_number"
    t.integer  "city_id"
    t.string   "contact_email"
    t.string   "site_url"
    t.text     "biography"
    t.string   "main_image_file_name"
    t.string   "main_image_content_type"
    t.integer  "main_image_file_size"
    t.datetime "main_image_updated_at"
    t.string   "promotion_image_file_name"
    t.string   "promotion_image_content_type"
    t.integer  "promotion_image_file_size"
    t.datetime "promotion_image_updated_at"
    t.string   "extra_image_1_file_name"
    t.string   "extra_image_1_content_type"
    t.integer  "extra_image_1_file_size"
    t.datetime "extra_image_1_updated_at"
    t.string   "extra_image_2_file_name"
    t.string   "extra_image_2_content_type"
    t.integer  "extra_image_2_file_size"
    t.datetime "extra_image_2_updated_at"
    t.string   "extra_image_3_file_name"
    t.string   "extra_image_3_content_type"
    t.integer  "extra_image_3_file_size"
    t.datetime "extra_image_3_updated_at"
    t.string   "logo_image_file_name"
    t.string   "logo_image_content_type"
    t.integer  "logo_image_file_size"
    t.datetime "logo_image_updated_at"
  end

  add_index "vendors", ["email"], :name => "index_vendors_on_email", :unique => true
  add_index "vendors", ["reset_password_token"], :name => "index_vendors_on_reset_password_token", :unique => true

  create_table "votes", :force => true do |t|
    t.boolean  "vote",          :default => false, :null => false
    t.integer  "voteable_id",                      :null => false
    t.string   "voteable_type",                    :null => false
    t.integer  "voter_id"
    t.string   "voter_type"
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
  end

  add_index "votes", ["voteable_id", "voteable_type"], :name => "index_votes_on_voteable_id_and_voteable_type"
  add_index "votes", ["voter_id", "voter_type"], :name => "index_votes_on_voter_id_and_voter_type"

  create_table "wait_lists", :force => true do |t|
    t.string   "email"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
