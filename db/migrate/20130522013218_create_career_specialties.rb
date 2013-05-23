class CreateCareerSpecialties < ActiveRecord::Migration
  def change
    create_table :career_specialties do |t|
      t.string :name
      t.belongs_to :military_branch

      t.timestamps
    end
    add_index :career_specialties, :military_branch_id
  end
end
