class AddNameFieldsToSurvey < ActiveRecord::Migration
  def change
    add_column :surveys, :email, :string
    add_column :surveys, :first_name, :string
    add_column :surveys, :last_name, :string
  end
end
