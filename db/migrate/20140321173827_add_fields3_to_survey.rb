class AddFields3ToSurvey < ActiveRecord::Migration
  def change
    add_column :surveys, :whats_missing_fun, :text
    add_column :surveys, :whats_missing_family, :text
    add_column :surveys, :whats_missing_community, :text
    add_column :surveys, :whats_missing_practical, :text
    add_column :surveys, :whats_missing_demographics, :text
  end
end
