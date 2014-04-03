class AddFields6ToSurvey < ActiveRecord::Migration
  def change
    add_column :surveys, :doctor_eye_care, :string
    add_column :surveys, :car_care, :string
    add_column :surveys, :good_bar_1, :string
    add_column :surveys, :good_bar_2, :string
    add_column :surveys, :good_bar_3, :string
  end
end
