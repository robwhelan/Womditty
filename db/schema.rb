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

ActiveRecord::Schema.define(:version => 20130627025726) do

  create_table "answers", :force => true do |t|
    t.integer  "post_id"
    t.integer  "user_id"
    t.text     "body"
    t.integer  "likes",      :default => 0
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  add_index "answers", ["post_id"], :name => "index_answers_on_post_id"
  add_index "answers", ["user_id"], :name => "index_answers_on_user_id"

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

  create_table "neighborhoods", :force => true do |t|
    t.string   "name"
    t.integer  "city_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "review_id"
  end

  add_index "neighborhoods", ["city_id"], :name => "index_neighborhoods_on_city_id"

  create_table "photos", :force => true do |t|
    t.string   "image_url"
    t.integer  "place_id"
    t.integer  "neighborhood_id"
    t.integer  "user_id"
    t.integer  "city_id"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "photos", ["city_id"], :name => "index_photos_on_city_id"
  add_index "photos", ["neighborhood_id"], :name => "index_photos_on_neighborhood_id"
  add_index "photos", ["place_id"], :name => "index_photos_on_place_id"
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
  end

  add_index "places", ["city_id"], :name => "index_places_on_city_id"
  add_index "places", ["neighborhood_id"], :name => "index_places_on_neighborhood_id"

  create_table "posts", :force => true do |t|
    t.string   "title"
    t.text     "body"
    t.integer  "likes",      :default => 0
    t.integer  "user_id"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  add_index "posts", ["user_id"], :name => "index_posts_on_user_id"

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
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "location"
    t.date     "birthday"
    t.string   "profile_image"
    t.string   "gender"
    t.integer  "drive_time"
    t.integer  "reputation",             :default => 0
  end

  add_index "users", ["career_specialty_id"], :name => "index_users_on_career_specialty_id"
  add_index "users", ["city_id"], :name => "index_users_on_city_id"
  add_index "users", ["duty_station_id"], :name => "index_users_on_duty_station_id"
  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["military_branch_id"], :name => "index_users_on_military_branch_id"
  add_index "users", ["neighborhood_id"], :name => "index_users_on_neighborhood_id"
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
