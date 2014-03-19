class DestroyVariousTablesAgain < ActiveRecord::Migration
  def up
    drop_table :surveys
    drop_table :survey_sections
    drop_table :questions
    drop_table :question_groups
    drop_table :answers
    drop_table :response_sets
    drop_table :responses
    drop_table :dependencies
    drop_table :dependency_conditions
    drop_table :validations
    drop_table :validation_conditions
  end

  def down
  end
end
