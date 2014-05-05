class AddTennisToSurveys < ActiveRecord::Migration
  def change
    add_column :surveys, :contact_tennis, :string
    add_column :surveys, :contact_golf, :string
    add_column :surveys, :contact_boyscouts, :string
    add_column :surveys, :contact_girlscouts, :string
    add_column :surveys, :contact_language, :string
  end
end
