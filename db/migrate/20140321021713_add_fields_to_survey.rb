class AddFieldsToSurvey < ActiveRecord::Migration
  def change
    add_column :surveys, :car_gas_expense, :string
    add_column :surveys, :survey_start_at, :datetime
    add_column :surveys, :survey_complete_at, :datetime
    add_column :surveys, :survey_duration, :time
  end
end
